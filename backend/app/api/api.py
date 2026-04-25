from fastapi import APIRouter
import logging

router = APIRouter()
# Configura o Logger
logger = logging.getLogger(__name__)

@router.get("/")
def home():
    logger.info("Endpoint / acessado")
    return {"message": "Juju API rodando com FastAPI"}

@router.get("/health")
def health():
    logger.info("Health check ok")
    return {"Status": "ok"}