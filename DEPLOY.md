# 🚀 Guia de Deploy - RouterIFC

Este guia contém todas as instruções para fazer o deploy da sua aplicação RouterIFC em produção.

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Git configurado
- Conta em uma das plataformas de deploy (opcional)

## 🏠 Deploy Local com Docker

### 1. Preparação

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/ROUTERIFC-HACKATHON2025/ROUTER_IFC-HACKATHON2025.git
cd ROUTER_IFC-HACKATHON2025

# Configure as permissões do script (Linux/Mac)
chmod +x deploy.sh
```

### 2. Deploy Completo

```bash
# Opção 1: Usando o script automatizado
./deploy.sh

# Opção 2: Usando Make
make deploy

# Opção 3: Manual
docker-compose build --no-cache
docker-compose up -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic --noinput
```

### 3. Verificação

Após o deploy:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin/

## 🌐 Deploy em Plataformas Cloud

### 🟣 Heroku

1. **Instale o Heroku CLI**
   ```bash
   # Windows (usando chocolatey)
   choco install heroku-cli
   
   # ou baixe do site oficial
   ```

2. **Configure o projeto**
   ```bash
   heroku login
   heroku create routerifc-app
   
   # Configure as variáveis de ambiente
   heroku config:set DJANGO_SETTINGS_MODULE=config.production
   heroku config:set SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=routerifc-app.herokuapp.com
   
   # Adicione o PostgreSQL
   heroku addons:create heroku-postgresql:mini
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy para Heroku"
   git push heroku main
   ```

### 🚂 Railway

1. **Acesse [Railway.app](https://railway.app)**

2. **Conecte seu repositório GitHub**

3. **Configure as variáveis de ambiente:**
   ```
   DJANGO_SETTINGS_MODULE=config.production
   SECRET_KEY=your-super-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-app.railway.app
   ```

4. **Railway detectará automaticamente o railway.json e fará o deploy**

### 🎨 Render

1. **Acesse [Render.com](https://render.com)**

2. **Conecte seu repositório**

3. **Render detectará automaticamente o render.yaml**

4. **Configure as variáveis de ambiente necessárias**

### ⚡ Vercel (apenas frontend)

1. **Instale o Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd FrontEnd
   vercel --prod
   ```

## 🔐 Configuração de Domínio e HTTPS

### 1. Domínio Personalizado

**Heroku:**
```bash
heroku domains:add www.seudominio.com
heroku domains:add seudominio.com
```

**Railway/Render:** Configure nas respectivas dashboards

### 2. HTTPS Automático

Todas as plataformas mencionadas fornecem HTTPS automático via Let's Encrypt.

### 3. Configurações de Segurança

Após configurar HTTPS, atualize as variáveis de ambiente:

```bash
# Para plataformas com HTTPS
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
CORS_ALLOWED_ORIGINS=https://seudominio.com
```

## 🗄️ Configuração de Banco de Dados

### PostgreSQL (Recomendado para produção)

**Heroku:**
```bash
heroku addons:create heroku-postgresql:mini
```

**Railway:** Adicione PostgreSQL na dashboard

**Render:** Configure no render.yaml (já incluído)

### Migrações

```bash
# Local
docker-compose exec backend python manage.py migrate

# Heroku
heroku run python BackEnd1/manage.py migrate

# Railway/Render (automático no deploy)
```

## 📱 Configurando como PWA (Progressive Web App)

### 1. Adicione o Service Worker

Crie `FrontEnd/public/sw.js`:

```javascript
const CACHE_NAME = 'routerifc-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

### 2. Web App Manifest

Já incluído no `FrontEnd/public/manifest.json` (se existir) ou crie:

```json
{
  "name": "RouterIFC",
  "short_name": "RouterIFC",
  "description": "Sistema de otimização de rotas",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔧 Comandos Úteis

```bash
# Ver logs
docker-compose logs -f
make logs

# Backup do banco
make backup-db

# Criar superusuário
make superuser

# Acessar shell do backend
make shell-backend

# Limpar containers
make clean
```

## 🚨 Troubleshooting

### Problema: Erro de CORS
**Solução:** Verifique CORS_ALLOWED_ORIGINS nas variáveis de ambiente

### Problema: Static files não carregam
**Solução:** Execute `python manage.py collectstatic --noinput`

### Problema: Banco não conecta
**Solução:** Verifique a DATABASE_URL

### Problema: Container não sobe
**Solução:** Verifique os logs com `docker-compose logs`

## 📞 Suporte

Para problemas específicos, verifique:
1. Logs dos containers
2. Configurações de rede
3. Variáveis de ambiente
4. Documentação das plataformas

---

**RouterIFC** - Sistema desenvolvido para o Hackathon IFC 2025
🚍 Otimização de rotas | 🌐 Integração empresas-passageiros