from fastapi import FastAPI

app = FastAPI


app = FastAPI()

@app.get("/")
def home():
    return {"message": "Juju API rodando com FastAPI!"}


@app.get("/health")
def health():
    return {"Status": "ok"}