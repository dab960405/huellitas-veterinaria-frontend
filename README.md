# 🐾 Clínica Veterinaria Huellitas — Frontend

Sistema web de gestión veterinaria para administrar **dueños**, **mascotas** y **citas médicas**.

> **Stack:** React 19 · Vite · React Router · Axios

---

## ⚠️ Requisito previo — Node.js

Solo necesitas tener **Node.js v20 o superior** instalado.

### ¿Cómo verificarlo?

Abre una terminal y escribe:
```
node --version
```

| Resultado | Qué hacer |
|-----------|-----------|
| `v20.x.x` o mayor ✅ | Listo, continúa al siguiente paso |
| `v18.x.x` o menor ⚠️ | Necesitas actualizar Node.js |
| Comando no encontrado ❌ | Necesitas instalar Node.js |

**Descarga Node.js aquí → https://nodejs.org** (botón verde que dice **LTS**)  
Instala con todas las opciones por defecto y reinicia la terminal.

---

## 📦 Paso 1 — Obtener el proyecto

### Si lo descargaste como ZIP:

1. Localiza el archivo `.zip` descargado
2. **Clic derecho → Extraer todo** (Windows) o doble clic (Mac)  
   ⚠️ No ejecutes nada desde dentro del ZIP sin extraer primero
3. Abre la carpeta extraída — verás estos archivos dentro:

```
📁 carpeta-del-proyecto/
   ├── start.bat        ← para Windows
   ├── start.sh         ← para Mac / Linux
   ├── README.md
   ├── package.json
   ├── vite.config.js
   ├── index.html
   └── src/
```

### Si lo clonaste desde GitHub:

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

---

## 🚀 Paso 2 — Levantar el proyecto

### En Windows — doble clic en `start.bat`

1. Dentro de la carpeta del proyecto, haz **doble clic** en `start.bat`
2. Si Windows muestra una advertencia azul, haz clic en **"Más información"** → **"Ejecutar de todas formas"**
3. Se abre una ventana negra (consola) — espera mientras instala las dependencias
4. El navegador se abre solo en **http://localhost:5173** ✅

---

### En Mac — clic derecho en `start.sh`

1. Dentro de la carpeta del proyecto, haz **clic derecho** sobre `start.sh`
2. Selecciona **"Abrir con" → "Terminal"**
3. Espera mientras instala las dependencias
4. El navegador se abre solo en **http://localhost:5173** ✅

> Si Mac dice que no puede abrir el archivo, abre Terminal manualmente,
> navega hasta la carpeta del proyecto y ejecuta:
> ```bash
> chmod +x start.sh && ./start.sh
> ```

---

### En Linux — terminal en la carpeta del proyecto

```bash
chmod +x start.sh && ./start.sh
```

El navegador se abre solo en **http://localhost:5173** ✅

---

### Alternativa manual (cualquier sistema)

Si los scripts no funcionan, abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

Luego abre **http://localhost:5173** en tu navegador.

---

## 🔗 Paso 3 — Backend requerido

Este frontend se comunica con un servidor **Spring Boot** en:
```
http://localhost:8080
```

> ⚠️ El backend debe estar corriendo **antes** de usar la aplicación.  
> Si las tablas aparecen vacías, verifica que el servidor Spring Boot esté activo.

---

## ✅ ¿Qué debería ver?

Al abrir **http://localhost:5173** con el backend activo verás:

- **Página de inicio** con tres tarjetas: Dueños, Mascotas, Citas
- **Módulo Dueños** — registrar, editar, eliminar y buscar propietarios
- **Módulo Mascotas** — registrar, editar, eliminar y buscar pacientes
- **Módulo Citas** — agendar, editar y cancelar citas veterinarias

---

## ❓ Problemas comunes

**El navegador no se abre solo**  
→ Escribe manualmente en tu navegador: `http://localhost:5173`

**Error "Puerto 5173 en uso"**  
→ Ya hay una instancia corriendo. Abre directamente `http://localhost:5173` en tu navegador, o reinicia el equipo e intenta de nuevo.

**Error al instalar dependencias (npm install)**  
→ Verifica tu conexión a internet e intenta de nuevo.

**Las tablas aparecen vacías o hay errores**  
→ El backend (Spring Boot en puerto 8080) no está corriendo. Levántalo primero.

**Windows bloquea el script .bat**  
→ Clic derecho sobre `start.bat` → **"Ejecutar como administrador"**

**Mac dice que no puede abrir start.sh**  
→ Abre Terminal, navega a la carpeta del proyecto y ejecuta: `chmod +x start.sh && ./start.sh`

---

*Prueba técnica — AHK Colombia 2026*
