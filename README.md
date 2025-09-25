
---

# 🚍 ROUTERIFC

Sistema desenvolvido para o **Hackathon IFC 2025**, com foco em otimização das rotas, organização de transporte e integração entre passageiros e empresas.

---

## 📌 Tecnologias Utilizadas

* **Frontend:** Vue.js, Node.js, HTML, CSS, JavaScript
* **Backend:** Django, Django Rest Framework
* **Banco de Dados:** MySQL
* **Bibliotecas:** Axios, Lucide Vue, Leaflet

---

## 👩‍💻 Integrantes

* Gabriela Senderski
* Henrique Santiago de Souza Borba
* Higor Thiago Andresen de Braga
* Maria Eduarda Gonçalves Tavares
* Paulo Artur Pereira

---

## ⚙️ Como Rodar o Projeto Localmente

### 1. Clone o repositório

```sh
git clone https://github.com/ROUTERIFC-HACKATHON2025/ROUTER_IFC-HACKATHON2025.git
```

---

### 2. Instale as dependências do **Frontend**

Acesse a pasta:

```sh
cd FrontEnd
```

Instale as dependências principais:

```sh
npm install
```

Instale bibliotecas adicionais:

```sh
npm install axios
npm install lucide-vue-next
npm install leaflet
```

---

### 3. Instale as dependências do **Backend**

Acesse a pasta:

```sh
cd BackEnd1
```

Instale o Django:

```sh
pdm add django
```

> ⚠️ Caso ainda não tenha o **pdm** instalado, siga a [documentação oficial](https://pdm.fming.dev/latest/#installation).

---

### 4. Inicie os servidores

#### Backend (API)

Na pasta `BackEnd1`:

```sh
pdm run python manage.py runserver
```

#### Frontend (Vue.js)

Em outro terminal, acesse a pasta `FrontEnd`:

```sh
npm run dev
```

---
