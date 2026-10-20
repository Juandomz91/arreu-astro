import os
import smtplib
import socket

from dotenv import load_dotenv

load_dotenv(".env")
host = os.getenv("SMTP_HOST")
port = int(os.getenv("SMTP_PORT", "587"))
user = os.getenv("SMTP_USER")
password = os.getenv("SMTP_PASSWORD")
print("host:", repr(host), "| port:", port, "| user:", repr(user), "| password definida:", bool(password))

try:
    socket.create_connection((host, port), timeout=10).close()
    print("1. conexion TCP: OK")
except Exception as e:
    print("1. conexion TCP: FALLA ->", type(e).__name__, e)
    raise SystemExit(1)

try:
    s = smtplib.SMTP_SSL(host, port, timeout=10) if port == 465 else smtplib.SMTP(host, port, timeout=10)
    s.set_debuglevel(1)
    print("2. saludo del servidor: OK")
    if port != 465:
        s.starttls()
        print("3. STARTTLS: OK")
    s.login(user, password)
    print("4. login: OK")
    s.quit()
except Exception as e:
    print("FALLA ->", type(e).__name__, e)