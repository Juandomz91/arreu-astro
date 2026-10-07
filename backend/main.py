"""
Arreu Campers - backend del formulari de contacte

Rep el formulari i l'envia per correu (SMTP). No desa res al disc ni a cap
base de dades: el correu que arriba a la safata d'entrada és el registre.
Si el correu no es pot enviar, es respon amb un error (perquè el web ho
mostri) i es deixa constància als logs.

Executa amb: uvicorn main:app --reload --port 8000
"""
import logging
import os
import smtplib
from datetime import datetime, timezone
from email.message import EmailMessage
from typing import Annotated

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, StringConstraints

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("arreu.contact")

# Sense documentació interactiva (/docs, /redoc, /openapi.json) a producció
app = FastAPI(
    title="Arreu Campers - Contact API",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# 4321 és el port de desenvolupament d'Astro. A producció, defineix
# ALLOWED_ORIGINS amb el domini del web (p. ex. https://campersgirona.com).
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:4321").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Text sense espais als extrems i no buit (un nom de només espais no val)
Text100 = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]


class ContactMessage(BaseModel):
    nom: Text100
    cognom: str | None = Field(None, max_length=100)
    email: EmailStr
    missatge: str | None = Field(None, max_length=4000)
    # Casella de la política de privacitat (RGPD). Sense ella no s'envia res.
    consent: bool = False
    # Parany anti-spam (honeypot): el formulari l'amaga, així que una persona
    # sempre l'envia buit. Si arriba ple, és un bot.
    website: str | None = Field(None, max_length=200)


def _one_line(text: str) -> str:
    """Converteix qualsevol text en una sola línia (evita salts de línia a les capçaleres del correu)."""
    return " ".join(text.split())


def _send_email(entry: dict) -> None:
    """Envia el missatge per SMTP. Llança una excepció si alguna cosa falla."""
    host = os.getenv("SMTP_HOST")
    to_addr = os.getenv("CONTACT_TO_EMAIL")
    if not host or not to_addr:
        raise RuntimeError("Falta configurar SMTP_HOST i/o CONTACT_TO_EMAIL")

    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASSWORD")
    from_addr = os.getenv("SMTP_FROM") or user
    if not from_addr:
        raise RuntimeError("Falta configurar SMTP_FROM (o SMTP_USER)")

    full_name = _one_line(f"{entry['nom']} {entry.get('cognom') or ''}")

    msg = EmailMessage()
    msg["Subject"] = f"Nou missatge de contacte - {_one_line(entry['nom'])}"
    msg["From"] = from_addr
    msg["To"] = to_addr
    # Respondre al correu rebut contesta directament a qui ha escrit
    msg["Reply-To"] = entry["email"]
    msg.set_content(
        f"Nom: {full_name}\n"
        f"Email: {entry['email']}\n\n"
        f"Missatge:\n{entry.get('missatge') or '(sense missatge)'}\n\n"
        # Constància del consentiment (el correu és l'únic registre que es conserva)
        f"Consentiment: ha acceptat la política de privacitat ({entry['consent_at']} UTC)"
    )

    # Port 465 = SSL directe; la resta (587...) = connexió normal amb STARTTLS
    if port == 465:
        server = smtplib.SMTP_SSL(host, port, timeout=10)
    else:
        server = smtplib.SMTP(host, port, timeout=10)

    with server:
        if port != 465:
            server.starttls()
        if user and password:
            server.login(user, password)
        server.send_message(msg)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact", status_code=201)
def create_contact(payload: ContactMessage):
    if payload.website:
        # Bot: responem com si tot hagués anat bé, però no enviem cap correu
        logger.info("Missatge descartat pel parany anti-spam")
        return {"ok": True}

    if not payload.consent:
        raise HTTPException(status_code=422, detail="Cal acceptar la política de privacitat")

    entry = payload.model_dump(exclude={"website"})
    entry["consent_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    try:
        _send_email(entry)
    except Exception as exc:
        # Es registra l'error (sense dades personals de qui escriu) i es respon
        # amb un error perquè el web ho mostri, en lloc de dir que s'ha enviat.
        logger.error("No s'ha pogut enviar el missatge de contacte: %s: %s", type(exc).__name__, exc)
        raise HTTPException(status_code=503, detail="No s'ha pogut enviar el missatge") from exc

    return {"ok": True}
