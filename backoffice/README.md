# Backoffice Juju

Painel administrativo para atendimento com IA (chat, contatos, pedidos, etc).

---

## Tecnologias

* React
* TypeScript
* Vite
* CSS Modules

---

## Estrutura

```
backoffice/
  src/
    components/
    context/
    data/
    styles/
    types/
```

---

## Rodar o projeto

### Instalar dependências

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

## Rodar com Docker (opcional)

Na raiz do projeto:

```bash
docker-compose up --build
```

---

## Observações

* Os dados atualmente são mockados (`/data`)
* Não depende da API para funcionar
* Pode ser integrado futuramente ao backend

---

## Status

Em desenvolvimento...
