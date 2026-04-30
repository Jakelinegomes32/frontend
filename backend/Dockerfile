FROM python:3.11

WORKDIR /app

#copia o requirements para o container
COPY requirements.txt .

#instala as dependecia do projeto.
RUN pip install -r requirements.txt

#copia o restante do projeto para o container.
COPY . .

#EXPOSE avisa ao Docker qual a porta do container usar.
EXPOSE 8000

#Roda o servidor focado em containers.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]