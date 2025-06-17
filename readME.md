# Proyecto React + Node.js + TypeScript

Este proyecto es una aplicación full-stack con un frontend en **React** (construido con TypeScript usando Vite) y un backend en **Node.js** (usando Express). El frontend se comunica con el backend a través de llamadas API para mostrar un mensaje simple.

## Características
- **Frontend**: React con TypeScript, creado con Vite para un desarrollo rápido y compilaciones optimizadas.
- **Backend**: Node.js con Express, sirviendo una API simple.
- **CORS**: Configurado para permitir la comunicación entre el frontend y el backend.
- **Variables de Entorno**: URL de la API configurable para mayor flexibilidad.

## Prerrequisitos
Antes de configurar el proyecto, asegúrate de tener instalado lo siguiente:
- **Node.js** (v16 o superior) y **npm** (descarga desde [nodejs.org](https://nodejs.org)).
- Un editor de código (por ejemplo, VS Code).
- Git (para clonar el repositorio).
- Acceso a una terminal o línea de comandos.

## Instrucciones de Configuración
Sigue estos pasos para clonar y ejecutar el proyecto en tu computadora.

### 1. Clonar el Repositorio
Clona el proyecto desde GitHub a tu máquina local:

```bash
git clone https://github.com/jaimeamigoUTDT/escuela-de-futbol.git
cd escuela-de-futbol
```

### 2. Instalar Dependencias Raíz
El directorio raíz contiene un `package.json` para los metadatos del proyecto. Instala cualquier dependencia de nivel raíz:

```bash
npm install
```

### 3. Configurar el Frontend (React + TypeScript)
El frontend se encuentra en el directorio `cliente` y utiliza Vite con la plantilla de TypeScript.

1. Navega al directorio `cliente`:
   ```bash
   cd cliente
   ```

2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en el directorio `cliente` para configurar la URL de la API del backend:
   ```env
   VITE_API_URL=https://escuela-de-futbol.onrender.com
   ```

4. Inicia el servidor de desarrollo del frontend:
   ```bash
   npm run dev
   ```
   - Abre `http://localhost:5173` en tu navegador para verificar que la aplicación React está funcionando.
   - El frontend debería mostrar un mensaje obtenido del backend (una vez que el backend esté configurado).

### 4. Configurar el Backend (Node.js + Express)
El backend se encuentra en el directorio `servidor` y utiliza Express para servir una API simple.

1. Navega al directorio `servidor`:
   ```bash
   cd ../servidor
   ```

2. Instala las dependencias del backend:
   ```bash
   npm install
   ```

3. Inicia el servidor del backend:
   ```bash
   npm start
   ```
   - Verifica que el servidor esté funcionando visitando `https://escuela-de-futbol.onrender.com/api` en tu navegador. Deberías ver:
     ```json
     { "message": "¡Hola desde el backend de Node.js!" }
     ```

### 5. Probar la Aplicación Completa
Para asegurarte de que el frontend y el backend se están comunicando:
1. Asegúrate de que el servidor del backend esté en ejecución (`npm start` en el directorio `servidor`).
2. Asegúrate de que el servidor del frontend esté en ejecución (`npm run dev` en el directorio `cliente`).
3. Abre `http://localhost:5173` en tu navegador. La aplicación React debería mostrar:
   ```
   Proyecto React + Node.js
   Mensaje del Backend: ¡Hola desde el backend de Node.js!
   ```
   
## Estructura del Proyecto
```
escuela-de-futbol/
├── cliente/                     # Frontend React (TypeScript)
│   ├── src/
│   │   ├── assets/           # Imágenes, videos, fuentes, etc.
│   │   ├── App.tsx           # Componente principal de React
│   │   ├── App.css           # Estilos del componente App
│   │   ├── index.css         # Estilos generales
│   │   ├── main.tsx          # Punto de entrada
│   ├── package.json
│   ├── vite.config.ts        # Configuración de Vite
│   └── .env                  # Variables de entorno
├── servidor/                     # Backend Node.js
│   ├── index.js              # Servidor Express
│   ├── package.json
└── package.json                # Metadatos del proyecto raíz
└── README.md                   # Este archivo
```

## Solución de Problemas
- **Conflictos de Puertos**: Asegúrate de que no haya otras aplicaciones usando los puertos `5000` (backend) o `5173` (frontend).
- **Errores de CORS**: Verifica que el backend incluya el middleware `cors` (`app.use(cors())`) y que el frontend use la URL de API correcta (`VITE_API_URL` en `cliente/.env`).
- **Módulo No Encontrado**: Ejecuta `npm install` en los directorios `cliente` y `servidor` si faltan dependencias.
- **Errores de TypeScript**: Revisa la consola para ver errores de compilación de TypeScript y asegúrate de que todos los tipos estén definidos correctamente.
- **Problemas de Compilación**: Borra la carpeta `node_modules` y el archivo `package-lock.json` en el directorio correspondiente, luego ejecuta `npm install` nuevamente.

## Próximos Pasos
- **Ampliar el Backend**:
  - Agrega más rutas API (por ejemplo, POST, PUT, DELETE).
  - Integra una base de datos (por ejemplo, MongoDB o PostgreSQL).
- **Mejorar el Frontend**:
  - Agrega enrutamiento con `react-router-dom`.
  - Usa una librería de gestión de estado como Redux o Zustand.
  - Mejora los estilos con Tailwind CSS o una librería de componentes como Material-UI.
- **Mejoras de TypeScript**:
  - Define interfaces para las respuestas de la API en `cliente/src/types.ts`.
  - Usa TypeScript en el backend convirtiendo `servidor/index.js` a `index.ts` e instalando `typescript`, `ts-node` y los tipos de Express.
- **Seguridad**:
  - Agrega autenticación (por ejemplo, JWT o OAuth).
  - Sanitiza las entradas para prevenir ataques de inyección.
- **Despliegue**:
  - Despliega el backend en plataformas como Render, Heroku o AWS.
  - Despliega el frontend en Vercel, Netlify o sírvelo a través del backend.
