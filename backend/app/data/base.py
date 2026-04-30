from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    """ Base parta todos os models ORM """
    pass

from app.models import *  #importa o pacote models, e registra todos os model ORM para o SQLAlchemy, garantindo.