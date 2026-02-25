#!/bin/bash

# ══════════════════════════════════════════════════════
#   CLINICA VETERINARIA HUELLITAS - FRONTEND
#   Script de arranque automático (Mac / Linux)
# ══════════════════════════════════════════════════════

clear

echo ""
echo "  ╔══════════════════════════════════════════════════════╗"
echo "  ║       CLINICA VETERINARIA HUELLITAS - FRONTEND       ║"
echo "  ║              Script de arranque automático           ║"
echo "  ╚══════════════════════════════════════════════════════╝"
echo ""

# ─────────────────────────────────────────
# Verificar que estamos en la carpeta correcta
# ─────────────────────────────────────────
if [ ! -f "package.json" ]; then
    echo "  ❌ ERROR: Este script debe ejecutarse desde la carpeta"
    echo "     raíz del proyecto (donde está el package.json)."
    echo ""
    echo "  Si descargaste un ZIP, asegúrate de haberlo extraído"
    echo "  completamente y abre una terminal dentro de esa carpeta."
    echo ""
    exit 1
fi

# ─────────────────────────────────────────
# 1. Verificar que Node.js está instalado
# ─────────────────────────────────────────
echo "  [1/3] Verificando Node.js..."

if ! command -v node &> /dev/null; then
    echo ""
    echo "  ❌ ERROR: Node.js no está instalado en este equipo."
    echo ""
    echo "  Por favor descárgalo e instálalo desde:"
    echo "  👉  https://nodejs.org  (botón verde que dice LTS)"
    echo ""
    echo "  Luego cierra esta ventana y vuelve a ejecutar este script."
    echo ""
    exit 1
fi

# Verificar que la versión de Node es >= 20
NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 20 ]; then
    echo ""
    echo "  ❌ ERROR: Tu versión de Node.js es demasiado antigua."
    echo ""
    echo "  Versión actual:   $(node --version)"
    echo "  Versión mínima:   v20.x.x"
    echo ""
    echo "  Actualiza Node.js desde:"
    echo "  👉  https://nodejs.org  (botón verde que dice LTS)"
    echo ""
    echo "  Después de instalar, cierra esta ventana y vuelve a ejecutar este script."
    echo ""
    exit 1
fi

echo "  ✅ Node.js encontrado: $(node --version)"
echo ""

# ─────────────────────────────────────────
# 2. Instalar dependencias
# ─────────────────────────────────────────
echo "  [2/3] Instalando dependencias (npm install)..."
echo "  Esto puede tardar unos segundos la primera vez..."
echo ""

npm install
if [ $? -ne 0 ]; then
    echo ""
    echo "  ❌ ERROR al instalar dependencias."
    echo "  Asegúrate de tener conexión a internet e intenta de nuevo."
    echo ""
    exit 1
fi

echo ""
echo "  ✅ Dependencias instaladas correctamente."
echo ""

# ─────────────────────────────────────────
# 3. Arrancar el servidor de desarrollo
# ─────────────────────────────────────────
echo "  [3/3] Iniciando la aplicación..."
echo ""
echo "  ┌─────────────────────────────────────────────────────┐"
echo "  │  Abriendo navegador en: http://localhost:5173       │"
echo "  │                                                     │"
echo "  │  Si el navegador no abre, escribe esto en tu        │"
echo "  │  navegador manualmente:  http://localhost:5173      │"
echo "  │                                                     │"
echo "  │  Para detener la aplicación presiona Ctrl + C       │"
echo "  └─────────────────────────────────────────────────────┘"
echo ""

# Vite abre el navegador solo gracias a server.open: true en vite.config.js
npm run dev
