@echo off
chcp 65001 >nul
cls

echo.
echo  ╔══════════════════════════════════════════════════════╗
echo  ║       CLINICA VETERINARIA HUELLITAS - FRONTEND       ║
echo  ║              Script de arranque automático           ║
echo  ╚══════════════════════════════════════════════════════╝
echo.

:: ─────────────────────────────────────────
:: Verificar que estamos en la carpeta correcta
:: ─────────────────────────────────────────
IF NOT EXIST "package.json" (
    echo  ❌ ERROR: Este script debe ejecutarse desde la carpeta
    echo     raiz del proyecto ^(donde esta el package.json^).
    echo.
    echo  Asegurate de haber extraido el ZIP completamente
    echo  y ejecuta start.bat desde dentro de la carpeta extraida.
    echo.
    pause
    exit /b 1
)

:: ─────────────────────────────────────────
:: 1. Verificar que Node.js está instalado
:: ─────────────────────────────────────────
echo [1/3] Verificando Node.js...

node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR: Node.js no esta instalado en este equipo.
    echo.
    echo  Por favor descargalo e instalalo desde:
    echo  ==^>  https://nodejs.org  ^(boton verde que dice LTS^)
    echo.
    echo  Luego cierra esta ventana y vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

:: Verificar que la versión de Node es >= 20
FOR /F "tokens=2 delims=v." %%a IN ('node --version') DO SET NODE_MAJOR=%%a

IF %NODE_MAJOR% LSS 20 (
    echo.
    echo  ERROR: Tu version de Node.js es demasiado antigua.
    echo.
    FOR /F "tokens=*" %%i IN ('node --version') DO SET NODE_VER=%%i
    echo  Version actual:   %NODE_VER%
    echo  Version minima:   v20.x.x
    echo.
    echo  Actualiza Node.js desde:
    echo  ==^>  https://nodejs.org  ^(boton verde que dice LTS^)
    echo.
    echo  Despues de instalar, cierra esta ventana y vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

FOR /F "tokens=*" %%i IN ('node --version') DO SET NODE_VER=%%i
echo  OK - Node.js encontrado: %NODE_VER%
echo.

:: ─────────────────────────────────────────
:: 2. Instalar dependencias
:: ─────────────────────────────────────────
echo [2/3] Instalando dependencias (npm install)...
echo  Esto puede tardar unos segundos la primera vez...
echo.

call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR al instalar dependencias.
    echo  Asegurate de tener conexion a internet e intenta de nuevo.
    echo.
    pause
    exit /b 1
)

echo.
echo  OK - Dependencias instaladas correctamente.
echo.

:: ─────────────────────────────────────────
:: 3. Arrancar el servidor de desarrollo
:: ─────────────────────────────────────────
echo [3/3] Iniciando la aplicacion...
echo.
echo  Abriendo navegador en: http://localhost:5173
echo.
echo  Si el navegador no abre solo, escribe esto en tu navegador:
echo      http://localhost:5173
echo.
echo  Para detener la aplicacion presiona Ctrl + C
echo.

call npm run dev

pause
