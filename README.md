# 🛍️ Product Store API - Documentación Técnica

## 📋 Descripción General

Esta es una **API RESTful para una tienda de productos** construida con **Node.js, Express y MongoDB**. Proporciona operaciones CRUD (Create, Read, Update, Delete) para gestionar productos en una base de datos.

## 🏗️ Estructura del Proyecto

```
backend/
├── config/
│   └── db.js                 # Configuración de la base de datos
├── controllers/
│   └── product.controller.js # Lógica de negocio para productos
├── models/
│   └── product.model.js      # Modelo de datos de productos
├── routes/
│   └── products.route.js     # Definición de rutas de la API
└── server.js                 # Punto de entrada de la aplicación
```

## 📦 Dependencias (package.json)

### **Dependencias de Producción**

```json
"dependencies": {
  "express": "^4.19.2",    // Framework web para Node.js
  "mongoose": "^8.20.0",   // ODM para MongoDB
  "dotenv": "^17.2.3",     // Manejo de variables de entorno
  "mongodb": "^7.0.0"      // Driver oficial de MongoDB
}
```

### **Dependencias de Desarrollo**

```json
"devDependencies": {
  "nodemon": "^3.1.11"     // Reinicio automático en desarrollo
}
```

### ⚙️ Explicación de package.json

- **`"type": "module"`**: Habilita el uso de sintaxis ES6 (import/export)
- **`"main": "index.js"`**: Archivo principal de la aplicación
- **`"scripts"`**: Comandos ejecutables con npm
  - `npm run dev`: Ejecuta con nodemon para desarrollo
  - `npm test`: Ejecuta tests (aún no implementado)

## 🔧 Componentes del Backend

### **1. server.js - Servidor Principal**

```javascript
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/products.route.js";

dotenv.config(); // Carga variables de entorno

const app = express();
app.use(express.json()); // Middleware para parsear JSON

app.use("/api/products", productRouter); // Monta las rutas de productos

app.listen(3000, () => {
  connectDB(); // Conecta a la base de datos al iniciar
  console.log("Server is running at http://localhost:3000");
});
```

### **2. db.js - Conexión a la Base de Datos**

```javascript
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // Termina el proceso con error
  }
};
```

### **3. product.model.js - Modelo de Datos**

```javascript
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);
```

### **4. product.controller.js - Lógica de Negocio**

```javascript
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
```

### **5. products.route.js - Enrutamiento**

```javascript
router.get("/", getProducts); // Obtener todos los productos
router.post("/", addProduct); // Crear nuevo producto
router.put("/:id", updateProduct); // Actualizar producto por ID
router.delete("/:id", deleteProduct); // Eliminar producto por ID
```

## 🌐 API Endpoints

| Método | Endpoint            | Descripción                 | Body Requerido         |
| ------ | ------------------- | --------------------------- | ---------------------- |
| GET    | `/api/products`     | Obtener todos los productos | `none`                 |
| POST   | `/api/products`     | Crear nuevo producto        | `{name, price, image}` |
| PUT    | `/api/products/:id` | Actualizar producto         | `{name, price, image}` |
| DELETE | `/api/products/:id` | Eliminar producto           | `none`                 |

### **Ejemplos de Uso:**

**Crear Producto:**

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "price": 999.99, "image": "laptop.jpg"}'
```

**Obtener Productos:**

```bash
curl http://localhost:3000/api/products
```

## ⚡ Conceptos Técnicos Explicados

### **¿Por qué `async/await`?**

- **`async`**: Declara que una función retornará una 'promesa'
- **`await`**: Pausa la ejecución hasta que la 'promesa' se resuelva
- **Ventajas**: Código más limpio y legible que usar `.then()/.catch()`

**Ejemplo:**

```javascript
// SIN async/await (más complejo)
export const getProducts = (req, res) => {
  Product.find({})
    .then((products) => res.status(200).json({ success: true, data: products }))
    .catch((error) =>
      res.status(500).json({ success: false, message: "Server Error" })
    );
};

// CON async/await (más claro)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
```

## 📜 ¿Qué es una **Promesa** en JavaScript?

Una **Promesa** es un objeto que representa la **finalización o fallo eventual de una operación asíncrona** y su valor resultante.

### 🎯 Analogía Simple:

Imagina que pides comida en un restaurante:

- **Haces el pedido** → Inicias una operación asíncrona
- **Recibes un ticket** → Esto es una **Promesa**
- **El ticket promete** que eventualmente tendrás tu comida o te dirán si hubo un problema

### 💻 Ejemplo Técnico:

```javascript
// Una función que retorna una Promesa
function obtenerDatosDeLaAPI() {
  return new Promise((resolve, reject) => {
    // Simulamos una operación que toma tiempo (como una consulta a BD)
    setTimeout(() => {
      const exito = true; // Podría ser false
      if (exito) {
        resolve({ datos: "Información obtenida" }); // ✅ Promesa CUMPLIDA
      } else {
        reject("Error: No se pudieron obtener los datos"); // ❌ Promesa RECHAZADA
      }
    }, 2000);
  });
}
```

## 🔄 Las 3 Etapas de una Promesa:

1. **`pending`** (pendiente): Estado inicial
2. **`fulfilled`** (cumplida): La operación se completó exitosamente
3. **`rejected`** (rechazada): La operación falló

## ❌ El Problema: **Callback Hell** (Infierno de Callbacks)

**Antes de las Promesas**, el código asíncrono se manejaba con callbacks anidados:

```javascript
// ⚠️ CÓDIGO COMPLEJO Y DIFÍCIL DE LEER (Callback Hell)
obtenerUsuario(1, function (usuario) {
  obtenerPedidos(usuario.id, function (pedidos) {
    obtenerProductos(pedidos[0].id, function (productos) {
      calcularTotal(productos, function (total) {
        enviarEmail(usuario.email, total, function () {
          console.log("Email enviado");
          // 😵 ¿Y si necesitamos más operaciones?
        });
      });
    });
  });
});
```

**Problemas:**

- Código anidado y difícil de leer
- Difícil manejo de errores
- Complicado de mantener y debuggear

## ✅ La Solución: **Promesas con .then() y .catch()**

```javascript
// ✅ MEJOR: Código más estructurado
obtenerUsuario(1)
  .then((usuario) => obtenerPedidos(usuario.id))
  .then((pedidos) => obtenerProductos(pedidos[0].id))
  .then((productos) => calcularTotal(productos))
  .then((total) => enviarEmail(usuario.email, total))
  .then(() => console.log("Email enviado"))
  .catch((error) => console.error("Algo falló:", error));
```

**Mejoras:**

- Cadena de operaciones más clara
- Manejo centralizado de errores
- Menos anidamiento

## 🏆 La Evolución: **Async/Await**

### ¿Por qué es aún MEJOR?

```javascript
// Código que se lee como síncrono
async function procesarPedido() {
  try {
    const usuario = await obtenerUsuario(1);
    const pedidos = await obtenerPedidos(usuario.id);
    const productos = await obtenerProductos(pedidos[0].id);
    const total = await calcularTotal(productos);
    await enviarEmail(usuario.email, total);
    console.log("Email enviado");
  } catch (error) {
    console.error("Algo falló:", error);
  }
}
```

## 🔍 Comparación Directa en Nuestra API

### **CON .then()/.catch()** (Antiguo):

```javascript
export const getProducts = (req, res) => {
  Product.find({})
    .then((products) => {
      res.status(200).json({ success: true, data: products });
    })
    .catch((error) => {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    });
};
```

### **CON async/await** (Moderno - **lo que uso**):

```javascript
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
```

## 🎯 **Ventajas Clave de Async/Await:**

### 1. **Código más legible y mantenible**

```javascript
// Difícil de seguir
function procesoComplejo() {
  return conexionBD()
    .then((db) => db.collection("users").find({}))
    .then((users) => {
      return procesarUsuarios(users).then((usuariosProcesados) => {
        return guardarResultados(usuariosProcesados);
      });
    });
}

// Fácil de entender
async function procesoComplejo() {
  const db = await conexionBD();
  const users = await db.collection("users").find({});
  const usuariosProcesados = await procesarUsuarios(users);
  return await guardarResultados(usuariosProcesados);
}
```

### 2. **Mejor manejo de errores**

```javascript
// Manejo de errores más intuitivo
async function operacionCompleja() {
  try {
    const resultado1 = await paso1();
    const resultado2 = await paso2(resultado1);
    const resultadoFinal = await paso3(resultado2);
    return resultadoFinal;
  } catch (error) {
    // ¡Todos los errores se capturan aquí!
    console.error("Error en la operación:", error);
    throw error;
  }
}
```

### 3. **Depuración más fácil**

- Los stack traces son más claros
- Puedes usar breakpoints normales
- El flujo es más predecible

## 🚀 **En el Contexto de Nuestra API:**

### **Conexión a Base de Datos:**

```javascript
export const connectDB = async () => {
  try {
    // ⏳ await PAUSA la ejecución hasta que mongoose.connect() termine
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Esta línea solo se ejecuta CUANDO la conexión se establece
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Si la conexión falla, viene aquí
    console.log(error);
    process.exit(1);
  }
};
```

### **Operaciones CRUD:**

```javascript
export const addProduct = async (req, res) => {
  const product = req.body;

  // Validación síncrona (no necesita await)
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    // ⏳ await PAUSA hasta que la operación de guardado termine
    const newProduct = new Product(product);
    await newProduct.save(); // Esto podría tomar milisegundos o segundos

    // Solo ejecuta esto CUANDO el producto se guardó exitosamente
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    // Si hay error en la operación asíncrona, viene aquí
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
```

## 📚 **Resumen Final:**

| Concepto    | ¿Qué es?                                            | ¿Por qué es importante?                             |
| ----------- | --------------------------------------------------- | --------------------------------------------------- |
| **Promesa** | Objeto que representa un valor futuro               | Maneja operaciones asíncronas de forma estructurada |
| **async**   | Marca una función como asíncrona                    | Permite usar `await` dentro de la función           |
| **await**   | Pausa la ejecución hasta que la promesa se resuelve | Hace que el código asíncrono se lea como síncrono   |

### **La Evolución:**

1. **Callbacks** → Código anidado y difícil de mantener
2. **Promesas con .then()** → Mejor estructura, pero aún complejo
3. **Async/Await** → ✅ **Código limpio, legible y fácil de mantener**

### **¿Por qué llaves en `import { connectDB }`?**

- **Exportación nombrada**: `export const connectDB = ...`
- **Importación con llaves**: `import { connectDB } from './config/db.js'`
- **Exportación por defecto**: `export default router`
- **Importación sin llaves**: `import productRouter from './routes/products.route.js'`

## 🔄 Flujo de una Petición

1. **Cliente** → `GET /api/products`
2. **server.js** → Redirige a `productRouter`
3. **products.route.js** → Ejecuta `getProducts`
4. **product.controller.js** → Consulta MongoDB con `Product.find()`
5. **MongoDB** → Retorna datos de productos
6. **Cliente** ← Recibe JSON con productos

## 🚀 Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno (.env):**

   ```
   MONGO_URI=mongodb://localhost:27017/productstore
   ```

3. **Ejecutar en desarrollo:**

   ```bash
   npm run dev
   ```

4. **Probar la API:**
   ```bash
   curl http://localhost:3000/api/products
   ```

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **Base de Datos**: MongoDB + Mongoose
- **Variables de Entorno**: dotenv
- **Desarrollo**: Nodemon para auto-reload

Esta API proporciona una base sólida para un sistema de gestión de productos, con arquitectura escalable y buenas prácticas de desarrollo.
