# 🐾 Clínica Veterinaria Huellitas — Frontend

Interfaz web desarrollada con **React + Vite** como parte del Test Práctico de Certificación del programa Técnico Laboral en Desarrollo de Software (CESDE / AHK Colombia).

---

## 🗂️ Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Módulos de la aplicación](#módulos-de-la-aplicación)
- [Validaciones implementadas](#validaciones-implementadas)
- [Diseño responsive y accesibilidad](#diseño-responsive-y-accesibilidad)
- [Conexión con el backend](#conexión-con-el-backend)

---

## Descripción

El frontend de Huellitas es una **Single Page Application (SPA)** que consume la API REST del backend (Spring Boot en el puerto 8080) para gestionar la información clínica de la veterinaria. Permite administrar dueños, mascotas y citas desde una interfaz web moderna, intuitiva y adaptable a cualquier dispositivo.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Librería principal de UI con hooks |
| Vite | 7 | Bundler y servidor de desarrollo |
| React Router DOM | 7 | Enrutamiento entre páginas (SPA) |
| Axios | 1.13 | Cliente HTTP para consumir la API REST |
| React Icons | 5.5 | Iconografía (FaSave, FaEdit, FaTrash...) |
| CSS personalizado | — | Estilos propios con variables CSS |

---

## Arquitectura del proyecto

El frontend sigue el patrón **"Presentational & Container Components"**, separando la lógica de negocio de la presentación:

```
App.jsx (BrowserRouter + Rutas)
     │
     ▼
Layout (Header + Outlet + Footer)
     │
     ├── HomePage        ← Tarjetas de acceso rápido
     ├── DuenosPage      ← Lógica de estado del módulo
     │     ├── DuenoForm ← Formulario (recibe props)
     │     └── DuenoList ← Tabla (recibe props)
     ├── MascotasPage
     │     ├── MascotaForm
     │     └── MascotaList
     └── CitasPage
           ├── CitaForm
           └── CitaList

services/api.js  ← Capa de comunicación con el backend (Axios)
styles/global.css ← Estilos centralizados con variables CSS
```

**Flujo de datos:**

```
Usuario interactúa
      │
      ▼
Componente Form (estado local con useState)
      │ onSave(formData)
      ▼
Page Component (lógica + estado global del módulo)
      │ await service.create(data)
      ▼
services/api.js (Axios → HTTP Request)
      │
      ▼
Backend Spring Boot (puerto 8080)
      │ JSON Response
      ▼
Page actualiza estado → Re-render automático
```

---

## Estructura de carpetas

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── citas/
│   │   │   ├── CitaForm.jsx        # Formulario agendar/editar citas
│   │   │   ├── CitaList.jsx        # Tabla de citas con badge de estado
│   │   │   └── CitasPage.jsx       # Página principal del módulo
│   │   ├── duenos/
│   │   │   ├── DuenoForm.jsx       # Formulario crear/editar dueños
│   │   │   ├── DuenoList.jsx       # Tabla de dueños
│   │   │   └── DuenosPage.jsx      # Página principal del módulo
│   │   ├── home/
│   │   │   └── HomePage.jsx        # Dashboard con tarjetas de acceso
│   │   └── layout/
│   │       ├── Footer.jsx          # Pie de página
│   │       ├── Header.jsx          # Navegación con menú hamburguesa
│   │       └── Layout.jsx          # Wrapper con Outlet de React Router
│   ├── services/
│   │   └── api.js                  # Capa Axios: duenoService, mascotaService, citaService
│   ├── styles/
│   │   └── global.css              # Estilos globales con variables CSS
│   ├── App.jsx                     # Enrutador raíz (BrowserRouter + Routes)
│   └── main.jsx                    # Punto de entrada (ReactDOM.createRoot)
├── index.html                      # HTML base (div#root)
├── vite.config.js                  # Configuración Vite (puerto 5173, open: true)
├── package.json
├── start.bat                       # Script arranque automático Windows
└── start.sh                        # Script arranque automático Mac/Linux
```

---

## Requisitos previos

- **Node.js v20 o superior**

Verificar:
```bash
node --version   # debe mostrar v20.x.x o mayor
```

Si no está instalado o la versión es antigua, descargarlo desde **https://nodejs.org** (botón verde **LTS**).

---

## Instalación y ejecución

> ⚠️ El backend Spring Boot debe estar corriendo **antes** de usar la aplicación.
> Ver instrucciones en `CodigoFuente/Backend/README.md`.

### Opción A — Scripts automáticos (recomendado)

**Windows:** doble clic en `start.bat`

Los scripts verifican automáticamente la versión de Node, instalan las dependencias y abren el navegador en `http://localhost:5173`.

**Mac:** clic derecho sobre `start.sh` → "Abrir con Terminal"

**Linux:**
```bash
chmod +x start.sh && ./start.sh
```

### Opción B — Comandos manuales

```bash
# Desde la carpeta CodigoFuente/Frontend/
npm install
npm run dev
```

Abrir en el navegador: **http://localhost:5173**

### Verificar que funciona

Al abrir la aplicación con el backend activo se debe ver:

```
✅ Página de inicio con tres tarjetas: Dueños | Mascotas | Citas
✅ Módulo Dueños: registrar, editar, eliminar y buscar
✅ Módulo Mascotas: registrar, editar, eliminar y buscar
✅ Módulo Citas: agendar, editar, cambiar estado y eliminar
```

---

## Módulos de la aplicación

### 🏠 Inicio (`/`)
Dashboard con tres tarjetas de acceso rápido a cada módulo. Muestra un banner con el nombre del sistema.

### 🧑 Dueños (`/duenos`)
| Funcionalidad | Descripción |
|---|---|
| Registrar dueño | Formulario con nombre, apellido, documento, teléfono, email y dirección |
| Editar dueño | Carga los datos en el formulario al presionar "Editar" |
| Eliminar dueño | Confirmación con `window.confirm` antes de eliminar |
| Buscar dueño | Búsqueda por nombre, apellido o número de documento |

> Al eliminar un dueño se eliminan en cascada sus mascotas y citas (manejado por el backend con `CascadeType.ALL`).

### 🐶 Mascotas (`/mascotas`)
| Funcionalidad | Descripción |
|---|---|
| Registrar mascota | Nombre, especie (select), raza, fecha de nacimiento y dueño asociado |
| Editar mascota | Precarga todos los campos incluyendo el dueño del select |
| Eliminar mascota | Confirmación antes de eliminar |
| Buscar mascota | Búsqueda por nombre de mascota, nombre del dueño o documento del dueño |
| Edad calculada | La columna "Edad" muestra el valor calculado automáticamente por el backend |

### 📅 Citas (`/citas`)
| Funcionalidad | Descripción |
|---|---|
| Agendar cita | Selección de mascota (con su dueño), fecha, hora y motivo |
| Editar cita | Permite cambiar datos y actualizar el estado (PROGRAMADA / COMPLETADA / CANCELADA) |
| Eliminar cita | Confirmación antes de eliminar |
| Badge de estado | Color azul (PROGRAMADA), verde (COMPLETADA), rojo (CANCELADA) |

---

## Validaciones implementadas

Las validaciones ocurren en **dos capas**: frontend (antes de enviar) y backend (Spring Validation).

### Validaciones en el frontend

| Regla | Componente | Descripción |
|---|---|---|
| Campos obligatorios vacíos | Todos los formularios | `alert()` si hay campos requeridos en blanco |
| No citas en fechas pasadas | `CitaForm.jsx` | Compara la fecha seleccionada con `new Date()` |
| No completar citas futuras | `CitaForm.jsx` | Deshabilita la opción COMPLETADA si `fechaHora > ahora` |
| Fecha mínima en input | `CitaForm.jsx` | Atributo `min={getTodayDate()}` en el `<input type="date">` |
| Fecha máxima nacimiento | `MascotaForm.jsx` | Atributo `max={new Date().toISOString().split('T')[0]}` |

### Validaciones en el backend (Spring)

El backend retorna errores en formato JSON `{ "success": false, "error": "..." }` que el frontend captura con `error.response?.data?.error` y muestra en la alerta de la página.

---

## Diseño responsive y accesibilidad

### Responsive

La interfaz se adapta a tres tamaños de pantalla:

| Breakpoint | Cambios |
|---|---|
| Desktop (> 768px) | Navegación horizontal, formularios en grilla de 2 columnas, tablas completas |
| Tablet (≤ 768px) | Menú hamburguesa, formularios en 1 columna, búsqueda vertical |
| Móvil (≤ 480px) | Tipografía reducida, padding compacto, acciones en columna |

Para verificar el diseño responsive durante la defensa: presionar **F12** en el navegador → ícono de dispositivo móvil, o reducir el ancho de la ventana.

### Accesibilidad

- `*:focus-visible` con `outline` visible para navegación con teclado
- Colores con contraste suficiente (azul `#2E86AB` sobre blanco)
- Botones con estado `disabled` con `opacity: 0.6` y `cursor: not-allowed`
- Etiquetas `<label>` asociadas a cada input del formulario
- Indicadores visuales de campos obligatorios con `*` en rojo

---

## Conexión con el backend

Toda la comunicación HTTP está centralizada en `src/services/api.js`:

```javascript
// Instancia base de Axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});
```

Los servicios expuestos son:

| Servicio | Métodos disponibles |
|---|---|
| `duenoService` | `getAll`, `getById`, `create`, `update`, `delete`, `search` |
| `mascotaService` | `getAll`, `getById`, `create`, `update`, `delete`, `search`, `getByDueno` |
| `citaService` | `getAll`, `getById`, `create`, `update`, `delete`, `getByMascota` |

### Solución de problemas comunes

| Problema | Causa | Solución |
|---|---|---|
| Tablas vacías / errores en consola | Backend no está corriendo | Iniciar Spring Boot primero (`mvnw spring-boot:run`) |
| Puerto 5173 ya en uso | Otra instancia corriendo | Abrir directamente `http://localhost:5173` o reiniciar el equipo |
| El navegador no abre solo | Vite tardó en iniciar | Escribir manualmente `http://localhost:5173` |
| `npm install` falla | Sin conexión a internet | Verificar red e intentar de nuevo |
| Windows bloquea `start.bat` | Política de seguridad | Clic derecho → "Ejecutar como administrador" |

---

## Autor

Desarrollado como Test Práctico Final de Certificación — AHK Colombia / CESDE  
Contacto evaluador: andres.valencia@ahk-colombia.com