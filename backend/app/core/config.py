from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    #Informaçoes do projeto
    PROJECT_NAME: str = "juju API"
    VERSION: str = "1.0.0"
    API_v1_STR: str = "/api/v1"

    #Banco de dados
    DATABASE_URL: str = "postgresql+asyncpg://juju:pw@db:5432/juju" #protocolo que vai ser usado:// nome-do-usuario do banco de dados : a senha(password) @ endereco-do-servidor : porta padrao do banco / o nome do banco de dados dentro do servidor.

    #redis
    REDIS_URL: str = "redis://redis:6379/0" #protocolo que vai ser usado:// endereco-do-servidor : porta padrao do redis / numero do banco de dados dentro do servico.

    #jwt
    SECRET_KEY: str = "sua_chave_secreta" #A assinatura do seu servidor para criar os tokens JWT. Deve ser manter em segredo e não deve ser compartilhda.
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080 #tempo de validade do token de acesso em minutos (7 dias).
    ALGORITHM: str = "HS256" #O metodo criptografado usado(padrao da JWT)

    #cors
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"] # Define quais endereços podem acessar API.

    #celery
    CELERY_BROKER_URL: str = "redis://redis:6379/0" #protocolo que vai ser usado, o mensageiro que recebe a tarefa (uando redis).
    CELERY_RESULT_BACKEND: str = "redis://redis:6379/0" #Onde o Celery salva o status ou resultado das tarefas concluidas.

    class Config:
        env_file = ".env" #Diz ao Pydantic para procurar um arquivo chamdo .env na raiz do projeto.
        case_sensitive = True #Exige que as variaveis no arquivo .env tenham o mmesmo nome(maiusculo/menusculo) que as definidas na classe.
        
settings = Settings()