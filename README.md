# 🛍️ Product Store

Una aplicación **full-stack moderna** para gestión de productos con operaciones CRUD completas. Perfecta para aprender desarrollo web contemporáneo.

## 📋 ¿Qué es Product Store?

**Product Store** es una plataforma de gestión de productos que permite:

- ✅ Ver todos los productos disponibles
- ✅ Crear nuevos productos (requiere contraseña de administrador)
- ✅ Editar información de productos (requiere contraseña de administrador)
- ✅ Eliminar productos (requiere contraseña de administrador)

**Características principales:**

- 🎨 Interfaz moderna con Chakra UI
- 🔐 Autenticación por contraseña para operaciones sensibles
- 📱 Diseño responsive (móvil, tablet, desktop)
- 🌓 Modo claro/oscuro
- ⚡ Gestión de estado eficiente con Zustand
- 🚀 API RESTful con Node.js + Express

---

## 🏗️ Stack Tecnológico

### Frontend

- **React 19** - Librería UI
- **Chakra UI v3** - Sistema de diseño
- **Zustand** - Gestión de estado global
- **Vite** - Build tool ultra rápido
- **React Router** - Navegación
- **React Icons** - Iconografía

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** + **Mongoose** - Base de datos
- **dotenv** - Variables de entorno

---

## 🚀 Lanzar en Local

### Requisitos Previos

- **Node.js** (v18+) - [Descargar](https://nodejs.org/)
- **npm** (viene con Node.js)
- **Git** - [Descargar](https://git-scm.com/)
- **MongoDB URI** - [Crear cluster gratis en MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Pasos para Ejecutar Localmente

#### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/sromero-dev/Product-Store-Project.git
cd product-store
```

#### 2️⃣ Configurar variables de entorno

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env

# Editar .env y agregar:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/products
ADMIN_PASSWORD=your-secure-password-here
```

> **¿Cómo obtener MONGODB_URI?**
>
> 1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
> 2. Crea un cluster gratis
> 3. Ve a "Connect" → "Drivers" → "Node.js"
> 4. Copia la connection string y reemplaza `<password>` con tu contraseña

#### 3️⃣ Instalar dependencias

```bash
# Instalar dependencias del backend
npm install

# Instalar dependencias del frontend
npm install --prefix frontend
```

#### 4️⃣ Lanzar backend y frontend

**Terminal 1 - Backend:**

```bash
npm run dev
# El servidor estará en http://localhost:5000
```

**Terminal 2 - Frontend (nueva terminal):**

```bash
npm run dev --prefix frontend
# La aplicación estará en http://localhost:5173
```

#### 5️⃣ ¡Listo! 🎉

Abre tu navegador en `http://localhost:5173` y comienza a usar la aplicación.

---

## 📁 Estructura del Proyecto

```
product-store/
├── backend/
│   ├── config/
│   │   └── db.js                 # Conexión a MongoDB
│   ├── controllers/
│   │   └── product.controller.js # Lógica de negocio
│   ├── middleware/
│   │   └── ipWhitelist.middleware.js # Validación de IP
│   ├── models/
│   │   └── product.model.js      # Schema de productos
│   ├── routes/
│   │   └── products.route.js     # Rutas de API
│   └── server.js                 # Punto de entrada
├── frontend/
│   ├── src/
│   │   ├── components/           # Componentes reutilizables
│   │   ├── pages/                # Vistas de la app
│   │   ├── store/                # Estado global (Zustand)
│   │   ├── lib/                  # Utilidades
│   │   ├── App.tsx               # Componente raíz
│   │   └── main.jsx              # Punto de entrada
│   ├── public/
│   │   └── favicon.svg           # Logo en pestaña del navegador
│   └── package.json
├── .env.example                  # Template de variables de entorno
├── package.json                  # Scripts del proyecto
└── README.md                     # Este archivo
```

---

## 🔄 Operaciones CRUD Disponibles

| Operación  | Método | Endpoint            | Autenticación | Descripción             |
| ---------- | ------ | ------------------- | ------------- | ----------------------- |
| **READ**   | GET    | `/api/products`     | ❌ Pública    | Ver todos los productos |
| **CREATE** | POST   | `/api/products`     | ✅ Contraseña | Crear producto          |
| **UPDATE** | PUT    | `/api/products/:id` | ✅ Contraseña | Editar producto         |
| **DELETE** | DELETE | `/api/products/:id` | ✅ Contraseña | Eliminar producto       |

> ✅ La contraseña se verifica en el servidor. Sin contraseña válida = Error 401 Unauthorized

---

## 🔐 Autenticación por Contraseña

### ¿Por qué?

Para proteger el catálogo de modificaciones accidentales o no autorizadas, cualquier operación que cambie datos (crear, editar o eliminar productos) requiere una contraseña de administrador.

### ¿Cómo funciona?

1. Cuando intentas crear, editar o eliminar un producto
2. Se abre un modal pidiendo la contraseña de administrador
3. Si es correcta: ✅ Operación permitida
4. Si es incorrecta: ❌ Error de acceso denegado

### Cambiar la contraseña de administrador

Edita el archivo `.env` en el backend:

```env
ADMIN_PASSWORD=tu-nueva-contraseña-segura
```

> **Nota:** La contraseña solo se verifica en el servidor, nunca se almacena en la base de datos.

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Lanza backend en modo desarrollo

# Frontend
npm run dev --prefix frontend      # Lanza frontend en desarrollo
npm run build --prefix frontend    # Construye para producción

# Build completo
npm run build            # Compila backend + frontend para producción

# Iniciar en producción
npm start                # Ejecuta servidor de producción
```

---

## 🚀 Desplegar en Render.com

### Configuración Automática

1. Ve a [Render.com](https://render.com)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio GitHub
4. Configura:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Agrega Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=<tu_connection_string>
   ADMIN_PASSWORD=<contraseña-segura>
   PORT=5000
   ```

Para detalles completos, ver [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎨 Características Principales

### Frontend

- **UI Moderna**: Diseño limpio con Chakra UI
- **Modo Oscuro**: Tema adaptable
- **Validación en Tiempo Real**: Feedback inmediato al usuario
- **Preview de Imágenes**: Ve la imagen mientras escribes la URL
- **Responsivo**: Funciona perfecto en móvil, tablet y desktop

### Backend

- **API RESTful**: Endpoints bien estructurados
- **Validación de Datos**: Verifica que no falten campos
- **Manejo de Errores**: Respuestas consistentes
- **Logs**: Seguimiento de operaciones y accesos
- **Seguridad**: Restricción por IP en operaciones sensibles

---

## 💡 Flujo de Uso

### Para Ver Productos (Cualquiera)

1. Abre http://localhost:5173/
2. La página carga automáticamente todos los productos
3. Ves nombre, precio e imagen de cada uno

### Para Añadir/Editar/Eliminar (Solo tu IP)

1. Navega a "Create New Product"
2. Completa los campos
3. El servidor valida tu IP
4. Si es autorizada: producto guardado ✅
5. Si no es autorizada: error 403 ❌

---

## 🐛 Solución de Problemas

### "Cannot GET /"

- ✅ Verifica que el backend está corriendo en otra terminal

### "Connection refused"

- ✅ Comprueba que MongoDB Atlas está activo
- ✅ Verifica que tu IP está en la whitelist de MongoDB Atlas

### "Access denied. Your IP is not authorized"

- ✅ Solo tu IP puede modificar
- ✅ Los visitantes pueden ver pero no editar

### "npm: command not found"

- ✅ Instala Node.js desde [nodejs.org](https://nodejs.org/)

---

## 📚 Archivos Importantes

| Archivo                                      | Propósito                           |
| -------------------------------------------- | ----------------------------------- |
| `.env`                                       | Variables de entorno (NO versionar) |
| `.env.example`                               | Template de `.env` (SÍ versionar)   |
| `backend/server.js`                          | Servidor principal                  |
| `frontend/src/App.jsx`                       | Componente raíz                     |
| `backend/middleware/adminAuth.middleware.js` | Validación de contraseña            |
| `package.json`                               | Scripts y dependencias              |

---

## 🌟 Aprendizajes Clave

Este proyecto demuestra:

- ✅ **Full-Stack Development**: Frontend + Backend + Base de Datos
- ✅ **Comunicación Cliente-Servidor**: API REST
- ✅ **Gestión de Estado**: Zustand en frontend
- ✅ **Async/Await**: Operaciones asincrónicas
- ✅ **Seguridad**: Autenticación por contraseña
- ✅ **Variables de Entorno**: Configuración segura
- ✅ **Deployment**: Desplegar en producción
