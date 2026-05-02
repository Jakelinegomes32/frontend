from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings

#Contesto do hashing - bcrypt e p padrao atual
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#Verifica o a senha que o usuario digita login com a senha hasheada no banco de dados.
def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

#Pega senha cadastrada pelo usuario e passa poraqui. O bcrypt transforma isso em em senha crypton.
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(subject: Union[str, int]) -> str:
    #expire define quando o cracha vence.
    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    #A SECRET_KEY assina o token. o subject e o ID do usuario.
    payload = {"exp": expire, "sub": str(subject)}
    return jwt.encode(payload, settings.SECRET_KEY, settings.ALGORITHM)

    #funç~çao para verificar se o cracha foi assindao pela SECRET_KEY. Sealguem tentarr alterar o ID do usaurio dentro do token, a assinatura quebra e o jwt.decode lanca o erro.
    def decode_acess_token(token: str) -> Optional[str]:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, [settings.ALGORITHM])
            return payload.get("sub")
        except JWTError:
            return None