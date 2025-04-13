from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
from routes import router

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific frontend URL for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router from routes.py
app.include_router(router)

db_path = "passwords.db"
encrypted_db_path = f"file:{db_path}?mode=memory&cache=shared"

# Database initialization
def init_db():
    conn = sqlite3.connect(encrypted_db_path, uri=True)
    conn.execute("PRAGMA key = 'your-encryption-key';")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        username TEXT NOT NULL,
        website TEXT,
        category TEXT NOT NULL,
        password TEXT NOT NULL,
        strength TEXT NOT NULL,
        favorite INTEGER NOT NULL
    )''')
    conn.commit()
    conn.close()

init_db()

# Pydantic model for password
class Password(BaseModel):
    id: int | None = None  # Make 'id' optional for POST requests
    title: str
    username: str
    website: str | None
    category: str
    password: str
    strength: str
    favorite: bool

@app.get("/passwords", response_model=List[Password])
def get_passwords():
    conn = sqlite3.connect(encrypted_db_path, uri=True)
    conn.execute("PRAGMA key = 'your-encryption-key';")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM passwords")
    rows = cursor.fetchall()
    conn.close()

    passwords = []
    for row in rows:
        if len(row) >= 8:  # Ensure the row has all expected columns
            passwords.append(
                Password(
                    id=row[0],
                    title=row[1],
                    username=row[2],
                    website=row[3] if len(row) > 3 else None,
                    category=row[4],
                    password=row[5],
                    strength=row[6],
                    favorite=bool(row[7])
                )
            )
    return passwords

@app.post("/passwords")
def add_password(password: Password):
    conn = sqlite3.connect(encrypted_db_path, uri=True)
    conn.execute("PRAGMA key = 'your-encryption-key';")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO passwords (title, username, website, category, password, strength, favorite) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (password.title, password.username, password.website, password.category, password.password, password.strength, int(password.favorite))
    )
    conn.commit()
    conn.close()
    return {"message": "Password added successfully"}