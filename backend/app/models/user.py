from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from app.data.base import Base

class User(Base):
    __tablename__ = "users" #define explicativamente o nome da tabela no bando de dados.

    # Cada atributo da classe represente uma coluna da tabela.
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    hasheb_password = Column(String, nullabel=False)
    is_activate = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=Fasle)

    #Timestamps automaiticos
    created_at = Column(DateTime(timezone=True), server_default=func.now()
    updated_at = Column(Datetime(timezonme=True), onupdate=func.now())