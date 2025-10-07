# Makefile para RouterIFC
.PHONY: help install dev build deploy clean logs shell

help: ## Mostrar esta ajuda
	@echo "RouterIFC - Sistema de Rotas do Hackathon IFC 2025"
	@echo ""
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Instalar dependências localmente
	@echo "📦 Instalando dependências do backend..."
	cd BackEnd1 && pip install -r requirements.production.txt
	@echo "📦 Instalando dependências do frontend..."
	cd FrontEnd && npm install

dev: ## Executar em modo desenvolvimento
	@echo "🚀 Iniciando servidor de desenvolvimento..."
	@echo "Execute em terminais separados:"
	@echo "  Backend: cd BackEnd1 && python manage.py runserver"
	@echo "  Frontend: cd FrontEnd && npm run dev"

build: ## Construir imagens Docker
	@echo "🔨 Construindo imagens Docker..."
	docker-compose build --no-cache

deploy: ## Deploy completo com Docker
	@echo "🚀 Fazendo deploy..."
	./deploy.sh

start: ## Iniciar containers em produção
	@echo "▶️ Iniciando containers..."
	docker-compose up -d

stop: ## Parar containers
	@echo "⏹️ Parando containers..."
	docker-compose down

restart: ## Reiniciar containers
	@echo "🔄 Reiniciando containers..."
	docker-compose restart

clean: ## Limpar containers e volumes
	@echo "🧹 Limpando containers e volumes..."
	docker-compose down -v
	docker system prune -f

logs: ## Ver logs dos containers
	@echo "📋 Mostrando logs..."
	docker-compose logs -f

shell-backend: ## Acessar shell do backend
	docker-compose exec backend /bin/bash

shell-frontend: ## Acessar shell do frontend
	docker-compose exec frontend /bin/sh

migrate: ## Executar migrações do banco
	@echo "🗄️ Executando migrações..."
	docker-compose exec backend python manage.py migrate

collectstatic: ## Coletar arquivos estáticos
	@echo "📦 Coletando arquivos estáticos..."
	docker-compose exec backend python manage.py collectstatic --noinput

superuser: ## Criar superusuário Django
	@echo "👤 Criando superusuário..."
	docker-compose exec backend python manage.py createsuperuser

backup-db: ## Fazer backup do banco de dados
	@echo "💾 Fazendo backup do banco..."
	docker-compose exec db pg_dump -U routerifc routerifc > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore-db: ## Restaurar backup do banco (use: make restore-db FILE=backup.sql)
	@echo "♻️ Restaurando backup..."
	docker-compose exec -T db psql -U routerifc routerifc < $(FILE)