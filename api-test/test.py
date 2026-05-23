from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def home():
    return {"message": "SmartDineN API is running"}

@app.post("/create-reservation")
def create_reservation():

    url = "http://localhost:5000/api/reservations"

    data = {
        "customerName": "Ali",
        "phone": "03001234567",
        "guests": 4,
        "date": "2026-05-20",
        "slot": "7:00 PM"
    }

    try:
        response = requests.post(url, json=data, timeout=5)
        return {
            "status": "success",
            "data": response.json()
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }