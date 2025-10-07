#!/bin/bash

# Script de deploy para RouterIFC
set -e

echo "🚀 Iniciando processo de deploy do RouterIFC..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Construir imagens
echo "🔨 Construindo imagens Docker..."
docker-compose build --no-cache

# Subir os serviços
echo "🚀 Subindo os serviços..."
docker-compose up -d

# Aguardar o backend estar pronto
echo "⏳ Aguardando o backend estar pronto..."
sleep 30

# Executar migrações
echo "🗄️ Executando migrações do banco de dados..."
docker-compose exec backend python manage.py migrate

# Coletar arquivos estáticos
echo "📦 Coletando arquivos estáticos..."
docker-compose exec backend python manage.py collectstatic --noinput

# Verificar status dos containers
echo "✅ Verificando status dos containers..."
docker-compose ps

echo "🎉 Deploy concluído!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8000"
echo ""
echo "Para ver os logs, use: docker-compose logs -f"