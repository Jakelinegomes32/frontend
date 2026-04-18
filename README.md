# Frontend Agente de IA Juju

Projeto de agente inteligente para atendimento e provador virtual de modas infantis, desenvolvido com React, Vite e TypeScript.


## Tecnologias

* React
* Vite
* TypeScript
* CSS 


## Funcionalidades

* Chat interativo por IA
* Catálogo de produtos
* Sistema de provador virtual (idade, altura e peso)
* Recomendação automática de tamanho
* Respostas dinâmicas baseadas em intenção

### Clonar repositório

```bash
git clone https://github.com/Jakelinegomes32/Frontend.git
```

### Rodar projeto

```bash
npm run dev
```

---

## Build produção

```bash
npm run build
```

## Lógica do Agente de Atendimento

O agente funciona baseado em estados:

* `idle`: estado inicial
* `catalog`: exibe produtos
* `provador`: coleta dados do usuário

Fluxo:

1. Usuário pede roupas, informações;
2. O agente mostra catálogo;
3. O usuário informa idade, altura e peso;
4. Sistema recomenda tamanho ideal, pelo provador virtual;
5. Fidelizar o usuário no WhatsApp.


---

## Pré-visualização

<p align="center">
  <img src="./src/assets/img/preview.png" width="600"/>
</p>

---

## Melhorias futuras

* Integração com API real de produtos
* Backend Node.js
* Persistência de conversa
* Integração com WhatsApp
* IA generativa para respostas dinâmicas

---
