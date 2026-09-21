"""
Arreu Campers - backend del formulari de contacte
Executa amb: uvicorn main:app --reload
"""
import json
import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

app = FastAPI(title="Arreu Campers - Contact API")

# 4321 és el port de desenvolupament d'Astro (abans, 5173 amb Vite)
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:4321").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent / "contacts.json"


class ContactMessage(BaseModel):
    nom: str = Field(..., min_length=1, max_length=100)
    cognom: str | None = Field(None, max_length=100)
    email: EmailStr
    missatge: str | None = Field(None, max_length=4000)
    # Parany anti-spam (honeypot): el formulari l'amaga, així que una persona
    # sempre l'envia buit. Si arriba ple, és un bot.
    website: str | None = Field(None, max_length=200)


def _load_contacts() -> list[dict]:
    if not DATA_FILE.exists():
        return []
    try:
        return json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []


def _save_contact(entry: dict) -> None:
    contacts = _load_contacts()
    contacts.append(entry)
    DATA_FILE.write_text(json.dumps(contacts, indent=2, ensure_ascii=False), encoding="utf-8")


def _maybe_send_email(entry: dict) -> None:
    """Optional: send a notification email if SMTP env vars are configured."""
    smtp_host = os.getenv("SMTP_HOST")
    if not smtp_host:
        return
    import smtplib
    from email.message import EmailMessage

    msg = EmailMessage()
    msg["Subject"] = f"Nou missatge de contacte - {entry['nom']}"
    msg["From"] = os.getenv("SMTP_FROM", "no-reply@arreucampers.com")
    msg["To"] = os.getenv("CONTACT_TO_EMAIL", "hola@arreucampers.com")
    msg.set_content(
        f"Nom: {entry['nom']} {entry.get('cognom') or ''}\n"
        f"Email: {entry['email']}\n\n"
        f"Missatge:\n{entry.get('missatge') or '(sense missatge)'}"
    )

    with smtplib.SMTP(smtp_host, int(os.getenv("SMTP_PORT", "587"))) as server:
        server.starttls()
        server.login(os.getenv("SMTP_USER", ""), os.getenv("SMTP_PASSWORD", ""))
        server.send_message(msg)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact", status_code=201)
def create_contact(payload: ContactMessage):
    if payload.website:
        # Bot: responem com si tot hagués anat bé, però no desem res ni enviem cap correu
        return {"ok": True}

    entry = payload.model_dump(exclude={"website"})
    entry["received_at"] = datetime.now(timezone.utc).isoformat()

    try:
        _save_contact(entry)
    except OSError as exc:
        raise HTTPException(status_code=500, detail="No s'ha pogut desar el missatge") from exc

    try:
        _maybe_send_email(entry)
    except Exception:
        # Don't fail the request if the notification email fails; the message is already saved.
        pass

    return {"ok": True}
