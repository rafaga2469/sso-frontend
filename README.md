# SSO Frontend

Aplicación de ejemplo para autenticación simple basada en JWT y cookies utilizando React con Vite. Incluye soporte para identidad federada a través de OAuth2 con `django-oauth-toolkit`.

## Características

- Inicio de sesión y registro de usuarios.
- Renovación automática de tokens mediante `refresh_token` almacenado en cookie.
- Control de sesión global con React Context.
- Rutas protegidas usando `react-router-dom`.
- Estilos con Tailwind CSS y componentes de Heroicons.
- Integración con OAuth2 para identidad federada.

## Requisitos

- Node.js 18 o superior
- Configurar las variables de entorno del cliente OAuth en un archivo `.env`:
  - `VITE_OAUTH_CLIENT_ID` – identificador del cliente público registrado en el backend.
  - `VITE_OAUTH_REDIRECT_URI` – URL de retorno autorizada para el flujo OAuth2.
  - `VITE_API_BASE` – URL base de la API del backend.
- Un backend compatible que exponga los siguientes endpoints:
  - `POST /token/` para obtener tokens con usuario y contraseña.
  - `POST /token/cookie/` para obtener `access` y almacenar `refresh_token` en una cookie.
  - `POST /token/refresh/` para refrescar el token de acceso usando la cookie.
  - `GET /me/` para obtener la información del usuario autenticado.
  - `POST /logout/` para cerrar sesión.
  - `POST /register/` para registrar usuarios.

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia el archivo `.env.example` como `.env` y ajusta los valores de las variables:

   ```bash
   cp .env.example .env
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

La aplicación estará disponible normalmente en `http://localhost:5173`.

## Scripts disponibles

- `npm run dev` &ndash; levanta la aplicación en modo desarrollo.
- `npm run build` &ndash; genera la versión de producción en la carpeta `dist`.
- `npm run preview` &ndash; ejecuta un servidor para previsualizar la compilación.
- `npm run lint` &ndash; ejecuta ESLint sobre todos los archivos fuente.

## Estructura básica

```
src/
├── api/           # Módulos para llamadas HTTP
├── components/    # Componentes reutilizables
├── context/       # Contexto de autenticación
├── pages/         # Páginas principales (Login, Register, Dashboard)
├── routes.jsx     # Definición de rutas protegidas y públicas
└── main.jsx       # Punto de entrada de React
```

## Licencia

MIT
