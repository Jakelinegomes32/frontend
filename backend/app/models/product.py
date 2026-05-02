from sqlalchemy import Column, Integer, String, Numeric, Boolean, DateTime, func
from app.date.base import Base

class product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sku = Column(String, unique=True, index=True)
    price = Column(Numeric(10,2), nullabel=False)
    stock = Column(Integer, default=True)
    is_active = Column(Boolean, default=True)

    #Campo chave para a integração do bling.
    bling_id = Column(String, unique=True, nullabel=True, index=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())