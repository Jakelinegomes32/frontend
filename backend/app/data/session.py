from sqlalchemy.ext.asyncio import (
    AsyncSession, create_async_engine, async_sessionmaker
)
from app.core.config import settings

#Engine: conexao com o banco
engine = create_async_engine(
    settings.DATABASE_URL, #pega o endereço do banco de dados
    echo=False,
    pool_pre_ping=True, #reconectar se cair ela descarta a conexao e cria uma nova.
    pool_size=10, #matem 10 conexoes abertas, se chegar na 10 ele espera a conexao ser liberada para criar uma nova.
    max_overflow=20, #se as 10 conexoes estiverem ocupadas ele pode criar mais 20 conexoes.
)

#Factory de sessões
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False, #evita que os objetos sejam apagados da sessão após o commit, permitindo que seja acessado apos a conculta.
)

#Dependencia para obter a sessão.
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session: #abre uma nova sessão (pede uma nova sessão ao engine)
        try:
            yield session #entrega a sessão para o endpoint usar.
            await session.commit() #se o endpoint terminar sem erros, ele salva as mudaças automaticamente.
        except Exception:
            await session.rollback() #se der erro, ele executa o rollback, garantindo que nenhum dado parcial ou conrrompido seja salvo.
            raise
        finally:
            await session.close() #fecha a sessão, idependente de erro ou sucesso.