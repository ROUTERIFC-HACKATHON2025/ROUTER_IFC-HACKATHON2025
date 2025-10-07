# 🚀 Deploy RouterIFC no Vercel

## ⚠️ IMPORTANTE: O que funciona no Vercel

**✅ Frontend (Vue.js):**
- Interface completa
- Mapas interativos
- Roteamento
- Otimização automática

**❌ Backend (Django):**
- Vercel não suporta Django
- Precisa de outra plataforma para API

## 🎯 ESTRATÉGIA RECOMENDADA

### Frontend: Vercel + Backend: Railway

**Vantagens:**
- ✅ Frontend super rápido (Vercel)
- ✅ Backend grátis (Railway)  
- ✅ HTTPS automático
- ✅ Deploy automático
- ✅ Domínio personalizado gratuito

## 🚀 PASSO A PASSO COMPLETO

### 1. Preparar Backend no Railway

```bash
# 1. Acesse railway.app
# 2. Conecte seu GitHub
# 3. Selecione ROUTER_IFC-HACKATHON2025
# 4. Escolha: Deploy Backend
```

**Variáveis no Railway:**
```
DJANGO_SETTINGS_MODULE=config.production
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=False
ALLOWED_HOSTS=*.railway.app
DATABASE_URL=postgresql://... (automático)
CORS_ALLOWED_ORIGINS=https://sua-app.vercel.app
```

### 2. Preparar Frontend no Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar para frontend
cd FrontEnd

# Login no Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Configurar API URL

Após deploy do Railway, você terá uma URL tipo:
`https://router-ifc-production.up.railway.app`

Atualize no Vercel:
```bash
# Definir variável de ambiente no Vercel
vercel env add VITE_API_URL
# Cole: https://sua-app.railway.app
```

## 🌐 DEPLOY VIA DASHBOARD (Mais Fácil)

### Railway (Backend):

1. **Acesse:** https://railway.app
2. **Login** com GitHub
3. **New Project** > Deploy from GitHub repo
4. **Selecione:** ROUTER_IFC-HACKATHON2025
5. **Configure variáveis:**
   ```
   DJANGO_SETTINGS_MODULE=config.production
   SECRET_KEY=generate-random-key
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app,*.vercel.app
   ```
6. **Deploy automático!**

### Vercel (Frontend):

1. **Acesse:** https://vercel.com
2. **Login** com GitHub  
3. **Import Project** > ROUTER_IFC-HACKATHON2025
4. **Framework:** Vite
5. **Root Directory:** FrontEnd
6. **Build Command:** npm run build
7. **Output Directory:** dist
8. **Environment Variables:**
   ```
   VITE_API_URL=https://sua-app.railway.app
   VITE_APP_TITLE=RouterIFC
   ```

## 🔗 URLs FINAIS

Após deploy completo:
- **Frontend:** https://router-ifc.vercel.app
- **Backend API:** https://router-ifc.railway.app
- **Admin Django:** https://router-ifc.railway.app/admin

## 🎨 DOMÍNIO PERSONALIZADO

### No Vercel (Frontend):
```bash
# Via CLI
vercel domains add routerifc.com

# Via Dashboard:
# Settings > Domains > Add Domain
```

### No Railway (Backend):
```bash
# Via Dashboard:
# Settings > Domains > Custom Domain
# Adicione: api.routerifc.com
```

**Resultado:**
- **Site:** https://routerifc.com
- **API:** https://api.routerifc.com

## 🔧 COMANDOS ÚTEIS

```bash
# Ver status do deploy
vercel ls

# Ver logs
vercel logs

# Deploy preview
vercel

# Deploy production  
vercel --prod

# Configurar domínio
vercel domains

# Ver variáveis
vercel env ls
```

## 📱 TESTANDO A APLICAÇÃO

1. **Abra o frontend** (Vercel URL)
2. **Teste as funcionalidades:**
   - Login/Cadastro
   - Mapas
   - Rotas
   - API calls

3. **Verifique console do navegador:**
   - Sem erros CORS
   - API respondendo
   - Assets carregando

## 🚨 PROBLEMAS COMUNS

### Erro: "Network Error" na API
**Solução:** 
```bash
# Verifique CORS no Railway
CORS_ALLOWED_ORIGINS=https://sua-app.vercel.app
```

### Erro: "Build failed" no Vercel
**Solução:**
```bash
# Verifique se está na pasta FrontEnd
# Root Directory: FrontEnd
# Build Command: npm run build
```

### Erro: "API não encontrada"
**Solução:**
```bash
# Verifique variável no Vercel
VITE_API_URL=https://sua-app.railway.app
```

## 💡 DICAS EXTRAS

1. **Performance:**
   - Vercel é otimizado para Vue.js
   - CDN global automático
   - Compressão automática

2. **Monitoramento:**
   - Railway: logs em tempo real
   - Vercel: analytics automático

3. **Updates:**
   - Push no GitHub = deploy automático
   - Preview branches automático

## 🎯 EXEMPLO REAL

**Repositório:** `ROUTER_IFC-HACKATHON2025`

**Railway Deploy:**
1. Connect GitHub
2. Select repo
3. Configure vars
4. URL: `https://router-ifc-production.up.railway.app`

**Vercel Deploy:**  
1. Import project
2. Root: `FrontEnd`
3. Framework: Vite
4. URL: `https://router-ifc.vercel.app`

**Final result:**
- Frontend super rápido
- Backend estável
- Deploy automático
- HTTPS everywhere!

## ✅ CHECKLIST FINAL

- [ ] Backend no Railway funcionando
- [ ] Frontend no Vercel funcionando  
- [ ] API conectando sem CORS
- [ ] Domínio personalizado (opcional)
- [ ] HTTPS ativo
- [ ] Todas as funcionalidades testadas

---

**🚀 Pronto!** Sua aplicação RouterIFC estará online e funcionando perfeitamente!