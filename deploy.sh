#!/bin/bash
# Deploy script para dac-fen
# Uso: ./deploy.sh "mensaje del commit"

cd "$(dirname "$0")"

if [ -z "$1" ]; then
  MSG="actualización $(date +%Y-%m-%d)"
else
  MSG="$1"
fi

git add .
git commit -m "$MSG"
git push origin main

echo ""
echo "✅ Desplegado. GitHub Pages se actualiza en ~1 min."
echo "   Dashboard: https://ctroncoso-valverde.github.io/dac-fen/dashboard/"
echo "   Curso:     https://ctroncoso-valverde.github.io/dac-fen/curso-saic/"
