from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Juju API rodando com FastAPI!"}