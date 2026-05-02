from sqlalchemy import Column, Interger, String, DateTime, Enum, ForeignKey, func
from sqlalchemy.orm import relationship
import enum
from app.data.base import Base

class ConversationStatus(str, enum.Enum):
    bot = "bot"
    waitign = "waiting"
    human = "human"
    close = "closed"

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Interger, primary_Key=True, index=True)
    customer_id = Column(String, index=True, nullable=False) #buscador de conversas pelo id do cliente.
    customer_name = Column(String, nullable=False)
    status = Column(Enum(ConversationStatus), default=ConversationStatus.bot, nullable=False) #define que toda conversa nova começa com o status bot.
    assigned_to = Column(Interger, ForeignKey("users.id"), nullable=True) #Está e uma chave estrangeira, ela liga a conversa a um usuario do atendente. Se estiver null, nenhum umano atendeu ainda.
    created_at = Column(DateTime(timezone=True), server_default=func.now()) #faz o proprio banco da dados, gerar a data de criação.
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) #atualiza a data automati  messages = relationship( "Message" , back_populates= "conversation" , order_by= "Message.created_at" )

    messages = relationship("Message", back_populates="conversation", order_by="Message.created_at")