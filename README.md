# Product Store - Guía Técnica Completa

## 📋 Descripción General

**Product Store** es una aplicación full-stack moderna para gestión de productos que implementa operaciones CRUD completas. Consta de un frontend en React con Chakra UI y un backend en Node.js con Express y MongoDB.

## 🏗️ Arquitectura del Proyecto

### **Frontend (React + JavaScript)**

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Vistas de la aplicación
├── store/              # Gestión de estado (Zustand)
└── App.jsx             # Componente raíz
```

### **Backend (Node.js + Express)**

```
backend/
├── controllers/        # Lógica de negocio
├── models/             # Modelos de datos MongoDB
├── routes/             # Definición de endpoints API
└── server.js           # Servidor principal
```

## 🚀 Inicio Rápido

### **Desarrollo Local**

```bash
# Backend
cd backend
npm run dev

# Frontend (en otra terminal)
cd frontend
npm run dev
```

### **Deployment**

- **Plataforma recomendada**: [Render.com](https://dashboard.render.com/web)
- **Variables de entorno**: Configurar `MONGO_URI` para la base de datos

## 🛠️ Stack Tecnológico

### **Frontend**

- **React 18** + JavaScript ES6+
- **Chakra UI v3** - Sistema de diseño
- **Zustand** - Gestión de estado
- **React Router DOM** - Navegación
- **React Icons** - Iconografía

### **Backend**

- **Node.js** + **Express.js** - Servidor API
- **MongoDB** + **Mongoose** - Base de datos
- **dotenv** - Variables de entorno

## 🔄 Operaciones CRUD Disponibles

| Operación | Método HTTP | Endpoint            | Descripción                 |
| --------- | ----------- | ------------------- | --------------------------- |
| CREATE    | POST        | `/api/products`     | Crear nuevo producto        |
| READ      | GET         | `/api/products`     | Obtener todos los productos |
| UPDATE    | PUT         | `/api/products/:id` | Actualizar producto         |
| DELETE    | DELETE      | `/api/products/:id` | Eliminar producto           |

## 💡 Conceptos Técnicos Esenciales

### **Gestión de Estado con Zustand**

```javascript
// Store global sin necesidad de Provider
export const useProductStore = create((set) => ({
  products: [],
  createProduct: async (newProduct) => {
    /* ... */
  },
  fetchProducts: async () => {
    /* ... */
  },
}));
```

### **Async/Await vs Promesas**

- **Async/Await**: Código más limpio y legible
- **Evolución**: Callbacks → Promesas (.then/.catch) → Async/Await
- **Ventajas**: Mejor manejo de errores, debugging más fácil

### **Sistema de Exportación/Importación**

| Tipo             | Cantidad  | Importación              | ¿Nombre obligatorio? |
| ---------------- | --------- | ------------------------ | -------------------- |
| `export const`   | Múltiples | `import { nombre }`      | Sí                   |
| `export default` | Uno único | `import cualquierNombre` | No                   |

**Ejemplo:**

```javascript
// Exportación
export const suma = (a, b) => a + b;
export default function resta(a, b) {
  return a - b;
}

// Importación
import resta, { suma } from "./utils";
```

## 🎨 Características de UI/UX

- **Diseño Responsive**: Mobile-first con Chakra UI
- **Tema Adaptable**: Modo claro/oscuro
- **Validación en Tiempo Real**: Feedback inmediato al usuario
- **Notificaciones**: Sistema toaster para acciones CRUD

## 🔧 Flujo de Desarrollo

### **Debugging**

- Uso de `console.log` para seguimiento de operaciones
- Estructura de respuestas consistente:

```javascript
{
  success: boolean,
  data?: any,
  message?: string
}
```

### **Estructura de Datos**

```javascript
// Producto
{
  _id: "507f1f77bcf86cd799439011",
  name: "Laptop Gaming",
  price: 1299.99,
  image: "https://example.com/image.jpg",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🌟 Próximas Mejoras

- Búsqueda y filtrado en tiempo real
- Paginación para grandes volúmenes
- Subida de imágenes locales
- Sistema de categorías
- Tests automatizados

## 📚 Resumen Técnico

Esta aplicación demuestra **patrones modernos de desarrollo full-stack**:

- **Frontend**: Componentes reutilizables, estado global eficiente, UI consistente
- **Backend**: API RESTful, operaciones asíncronas, arquitectura escalable
- **Base de Datos**: Modelado con Mongoose, validaciones automáticas

**🔗 Conexión Frontend-Backend**: Comunicación mediante API REST con formato JSON estandarizado y manejo unificado de errores.

---

_Para detalles específicos de implementación, consultar los README individuales de frontend y backend._
