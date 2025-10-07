#!/bin/bash

# Build script para Render
set -e

echo "🚀 Iniciando build do RouterIFC..."

# Verificar se estamos no backend ou frontend
if [ -f "manage.py" ]; then
    echo "📦 Building Backend Django..."
    pip install -r requirements.production.txt
    python manage.py collectstatic --noinput
    echo "✅ Backend build completo!"
elif [ -f "package.json" ]; then
    echo "📦 Building Frontend Vue.js..."
    npm ci
    npm run build
    echo "✅ Frontend build completo!"
else
    echo "❌ Arquivo de configuração não encontrado!"
    exit 1
fi

echo "🎉 Build finalizado com sucesso!"