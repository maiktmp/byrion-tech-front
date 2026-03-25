# Byron Tech - Análisis del Proyecto

## Descripción General
Byron Tech es una plataforma integral diseñada para una empresa especializada en refacciones de impresión industrial de precisión. El proyecto combina un sitio de marketing (Landing Page), una tienda de comercio electrónico y un panel de administración para la gestión operativa e inventario.

## Stack Tecnológico
- **Framework:** Nuxt 4 (Modo SSR: Desactivado / Single Page Application).
- **UI/Componentes:** PrimeVue v4 (Preset: ByronTheme basado en Aura).
- **Estilos:** Tailwind CSS v3.
- **Tipografía:** Inter (Google Fonts).
- **Iconos:** PrimeIcons.
- **Backend:** Nuxt Server API (H3).
- **Persistencia de Datos:** Archivos JSON locales (`front/server/data/products.json`).

## Arquitectura del Proyecto

### Directorio Principal
- `front/`: Contiene la aplicación completa de Nuxt.
- `package.json` (Raíz): Scripts globales para instalación y ejecución.
- `start.sh`: Script de inicio para producción.

### Estructura de `front/`
- `app/`: Código fuente del frontend.
  - `pages/`: Rutas de la aplicación.
    - `index.vue`: Pantalla de inicio/splash.
    - `landing.vue`: Landing page informativa.
    - `store.vue`: Catálogo de productos.
    - `admin/`: Dashboard e inventario.
  - `layouts/`: Diseños compartidos (Header, Navigation, etc.).
  - `assets/css/main.css`: Estilos globales y personalizaciones de Tailwind.
- `server/`: Lógica del lado del servidor.
  - `api/products.ts`: Endpoint REST para operaciones CRUD de productos.
  - `data/products.json`: Base de datos simulada en JSON.
- `nuxt.config.ts`: Configuración del framework, módulos (Tailwind, PrimeVue) y metadatos.
- `theme.config.ts`: Definición del preset visual (Colores primarios cian, bordes redondeados, etc.).

## Funcionalidades Clave

### 1. Interfaz de Usuario (UI)
- **Diseño Responsivo:** Adaptado para móviles y escritorio mediante Tailwind y componentes de PrimeVue.
- **Tema Personalizado:** Estética "Premium" con uso intensivo de desenfoques (blur), sombras suaves y una paleta de colores cian/slate.
- **Navegación:** Menú pegajoso (sticky) y cajón de navegación (drawer) para dispositivos móviles.

### 2. Tienda E-commerce
- Catálogo de refacciones con búsqueda y filtrado (en desarrollo).
- Carrito de compras persistente (en desarrollo).
- Visualización detallada de compatibilidad por producto.

### 3. Panel de Administración
- **Dashboard:** Métricas KPI simuladas (Ventas, Pedidos, Stock Crítico).
- **Gráficos:** Visualización de rendimiento semanal mediante mockups CSS interactivos.
- **Gestión de Inventario:** CRUD completo de productos.
  - Listado de productos con imágenes.
  - Diálogo para creación de nuevos productos.
  - Eliminación de productos en tiempo real.

## Desarrollo y Ejecución

### Scripts Disponibles (Raíz)
- `npm install`: Instala las dependencias en la carpeta `front`.
- `npm run build`: Genera la versión de producción.
- `npm start`: Ejecuta la aplicación construida.

### Configuración del Servidor
- El servidor corre por defecto en el puerto `3000`.
- El archivo `start.sh` facilita el despliegue en entornos Linux/macOS.

---
*Documentación generada automáticamente por Gemini CLI - Marzo 2026*
