from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.v1.routes import router
from app.core.logging import setup_logging


#Configura o logs
setup_logging()

#criando o app.
app = FastAPI(title="Juju API")

#configuracao do cors
origins = [
    "http://localhost", 
]

#adiciona o middleware de cors.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#rotas
app.include_router(router)

@app.get("/health")
def health():
    return {"Status": "ok"}