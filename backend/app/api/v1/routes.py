from fastapi import APIRouter
from app.data.products import products
import logging

router = APIRouter()
# Configura o Logger
logger = logging.getLogger(__name__)

@router.get("/")
def home():
    logger.info("Endpoint / acessado")
    return {"message": "Juju API rodando com FastAPI"}

#rota para listar todos os produtos.
@router.get("/products")
def list_products():
    logger.info("Listando Produtos")
    return products 

#rota que busca um produto por id.
@router.get("/product/{product_id}")
def get_product(product_id: int):
    for item in products:
        if item["id"] == product_id:
            return item
    return {"error": "produto nao encontrado"}

#chat
@router.post("/chat")
def chat(payload: dict):
    message = payload.get("message", "").lower()

    logger.info(f"Mensagem recebida: {message}")

    if "vestido" in message:
        return {
            "reply": "Temos vestidos lindos! Veja /products"
        }
    
    if "roupas" in message:
        return {
            "reply": "Temos roupas lindas! Veja /products"
        }

    return {
        "reply": "Ola, Como posso ajudar?"
    }


@router.get("/health")
def health():
    logger.info("Health check ok")
    return {"status": "ok"}