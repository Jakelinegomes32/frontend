from fastapi import FastAPI
from app.api.api import router
from app.core.logging import setup_logging


#Configura o logs
setup_logging()

app = FastAPI(title="Juju API")

app.include_router(router)
