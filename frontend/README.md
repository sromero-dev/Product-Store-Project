# 🎨 Frontend - Product Store

Interfaz moderna construida con **React 19, Chakra UI v3 y Vite** para una plataforma de gestión de productos.

## 🏗️ Arquitectura del Frontend

```
src/
├── components/
│   ├── AdminPasswordModal.jsx    # Modal de contraseña
│   ├── Navbar.jsx                # Barra de navegación
│   ├── ProductCard.jsx           # Tarjeta de producto
│   └── ui/
│       ├── color-mode.jsx        # Gestión de tema
│       └── toaster.jsx           # Notificaciones
├── pages/
│   ├── HomePage.jsx              # Listado de productos
│   └── CreatePage.jsx            # Crear producto
├── store/
│   └── product.js                # Estado global (Zustand)
├── App.jsx                       # Componente raíz
├── main.jsx                      # Punto de entrada
└── index.html
```

## 📦 Dependencias y Tecnologías

### **Tecnologías Principales:**

- **React 19** - Librería UI moderna
- **Chakra UI v3** - Sistema de diseño accesible
- **Zustand** - Gestión de estado global
- **Vite** - Build tool ultra rápido
- **React Router 7** - Enrutamiento
- **React Icons** - Iconografía

## 🔧 Componentes Principales

### **1. main.jsx - Punto de Entrada**

Monta la aplicación React con todos los providers necesarios:

- ChakraProvider (diseño)
- BrowserRouter (navegación)
- ColorModeProvider (tema)

### **2. App.jsx - Componente Raíz**

Define la estructura global de la aplicación:

- Navbar (siempre visible)
- Routes (cambiar entre HomePage y CreatePage)
- Toaster (notificaciones)

### **3. HomePage.jsx**

Muestra el grid de productos:

- Carga automática de productos al montar
- Grid responsivo (1 columna mobile, 2 tablet, 3 desktop)
- Cada producto como ProductCard

### **4. CreatePage.jsx**

Formulario para crear productos:

- Inputs para nombre, precio, URL imagen
- Preview de imagen en tiempo real
- Modal de contraseña para confirmar

### **5. ProductCard.jsx**

Tarjeta individual de producto:

- Imagen, nombre, precio
- Botones editar y eliminar
- Modal de edición con validación
- Modal de contraseña

### **6. store/product.js - Estado Global (Zustand)**

Gestiona todo el estado de productos:

- `products` - Array de productos
- `fetchProducts()` - Obtener productos del servidor
- `createProduct()` - Crear nuevo producto
- `updateProduct()` - Editar producto
- `deleteProduct()` - Eliminar producto
  <ChakraProvider value={defaultSystem}>
  <ColorModeProvider>
  <App />
  </ColorModeProvider>
  </ChakraProvider>
  </BrowserRouter>
  </StrictMode>
  );

````

**🔍 Explicación:**

- **`StrictMode`**: Herramienta de desarrollo de React para detectar problemas
- **`createRoot`**: API moderna de React 18 para renderizado concurrente
- **`BrowserRouter`**: Habilita el enrutamiento basado en URLs
- **`ChakraProvider`**: Provee el sistema de diseño de Chakra UI v3
- **`ColorModeProvider`**: Contexto personalizado para gestión de tema claro/oscuro

### **2. App.jsx - Componente Raíz**

```javascript
function App() {
  return (
    <>
      <Box minH="100vh" bg="gray.100" _dark={{ bg: "gray.900" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
        <Toaster />
      </Box>
    </>
  );
}
````

**🔍 Explicación:**

- **Layout Responsive**: Contenedor que ocupa toda la altura viewport
- **Tema Adaptable**: Fondos diferentes para modo claro/oscuro
- **Sistema de Rutas**: Navegación entre páginas
- **Toaster Global**: Sistema de notificaciones accesible en toda la app

### **3. HomePage.jsx - Página Principal**

```javascript
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={8}>
        {/* Título con gradiente */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10} w="full">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </SimpleGrid>
        {/* Mensaje cuando no hay productos */}
      </VStack>
    </Container>
  );
};
```

**🔍 Características:**

- **Carga Automática**: Usa `useEffect` para cargar productos al montar
- **Grid Responsive**: 1 columna en móvil, 2 en tablet, 3 en desktop
- **Estado Condicional**: Muestra mensaje cuando no hay productos
- **Título Animado**: Texto con gradiente y icono

### **4. CreatePage.jsx - Formulario de Creación**

```javascript
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    // Feedback y reset del formulario
  };
};
```

**🔍 Características:**

- **Estado Local**: Maneja datos del formulario antes de enviar
- **Validación Backend**: La validación principal se hace en el store
- **UX Mejorada**: Feedback inmediato y reset en éxito
- **Diseño Centrado**: Formulario centrado verticalmente

### **5. ProductCard.jsx - Tarjeta de Producto con CRUD**

**Funcionalidades Principales:**

- **Visualización**: Imagen, nombre, precio formateado
- **Edición**: Modal con formulario de actualización
- **Validación Avanzada**: Validación robusta de precios
- **Eliminación**: Confirmación implícita con feedback

**Validación de Precios:**

```javascript
// Soporta múltiples formatos numéricos
- "1299.99" ✅
- "1299,99" ✅
- "12.999,99" ❌ (múltiples separadores)
```

### **6. Navbar.jsx - Barra de Navegación**

**Características:**

- **Responsive**: Layout columnar en móviles, horizontal en desktop
- **Tema Interactivo**: Toggle entre modo claro/oscuro
- **Navegación SPA**: Enlaces sin recarga de página
- **Branding con Gradiente**: Efecto visual moderno

## 🏪 Store de Estado Global (Zustand)

### **product.js - Gestión Completa del Estado**

```javascript
export const useProductStore = create((set) => ({
  products: [],

  // CRUD Completo
  createProduct: async (newProduct) => {
    /* ... */
  },
  fetchProducts: async () => {
    /* ... */
  },
  deleteProduct: async (pid) => {
    /* ... */
  },
  updateProduct: async (pid, updatedProduct) => {
    /* ... */
  },

  // Sincronización de estado
  setProducts: (products) => set({ products }),
}));
```

**🔍 Ventajas de Zustand:**

- **✅ No necesita Provider** como Redux
- **✅ Menos boilerplate code**
- **✅ Integración directa** con React
- **✅ DevTools** integradas

## 🎨 Sistema de Diseño (Chakra UI v3)

### **Principios de Diseño:**

1. **Responsive Design** (Mobile-first):

```javascript
columns={{ base: 1, sm: 2, md: 3 }}
fontSize={{ base: "22px", sm: "28px" }}
flexDir={{ base: "column", sm: "row" }}
```

2. **Color Mode Adaptable**:

```javascript
bg="white" _dark={{ bg: "gray.800" }}
color={{ base: "gray.600", _dark: "gray.200" }}
```

3. **Sistema de Espaciado Consistente**:

```javascript
p={6}        // padding: 1.5rem
gap={4}      // gap: 1rem
py={12}      // padding vertical: 3rem
```

## 🔄 Flujo de Datos Completo

### **Ciclo CRUD Completo:**

1. **CREATE**

   ```
   CreatePage → useProductStore.createProduct() → API → Actualiza estado → HomePage se rerenderiza
   ```

2. **READ**

   ```
   HomePage (useEffect) → useProductStore.fetchProducts() → API → Rellena estado → Render ProductCards
   ```

3. **UPDATE**

   ```
   ProductCard (Modal) → useProductStore.updateProduct() → API → Actualiza estado específico → Rerender
   ```

4. **DELETE**
   ```
   ProductCard (Button) → useProductStore.deleteProduct() → API → Filtra estado → Rerender
   ```

### **Comunicación API:**

```javascript
// Estructura consistente de requests
const res = await fetch("/api/products", {
  method: "POST", // o GET, PUT, DELETE
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(productData)
});

// Respuesta estandarizada
{
  success: true,
  data: product,    // En éxito
  message: "..."    // En error
}
```

## 🎯 Características Técnicas Avanzadas

### **1. Gestión de Estado Optimizada**

```javascript
// Actualizaciones inmutables eficientes
set((state) => ({
  products: state.products.filter((product) => product._id !== pid),
}));

// Actualizaciones de elementos específicos
set((state) => ({
  products: state.products.map((product) =>
    product._id === pid ? { ...product, ...data.data } : product,
  ),
}));
```

### **2. Validación en Múltiples Capas**

**Frontend (UX Inmediata):**

```javascript
// Validación de precio en ProductCard
if (!/^\d+(\.\d+)?$/.test(price)) {
  toaster.create({ type: "error", description: "Formato inválido" });
  return;
}
```

**Backend (Seguridad):**

```javascript
// Validación en el endpoint API
if (!product.name || !product.price || !product.image) {
  return res.status(400).json({
    success: false,
    message: "Todos los campos son requeridos",
  });
}
```

### **3. Sistema de Notificaciones**

```javascript
// Toaster consistente en toda la aplicación
toaster.create({
  title: success ? "Success" : "Error",
  description: message,
  type: success ? "success" : "error",
  duration: 3000,
});
```

## 🚀 Patrones React Utilizados

### **1. Separación de Responsabilidades**

- **Components**: UI reutilizable (ProductCard, Navbar)
- **Pages**: Vistas completas (HomePage, CreatePage)
- **Store**: Lógica de estado y side effects
- **UI Utilities**: Funcionalidades transversales (toaster, color-mode)

### **2. Estado Local vs Global**

```javascript
// Estado LOCAL (formulario temporal)
const [newProduct, setNewProduct] = useState({
  name: "",
  price: "",
  image: "",
});

// Estado GLOBAL (datos compartidos)
const { products, createProduct } = useProductStore();
```

### **3. Composición de Componentes**

```javascript
// ProductCard compone múltiples componentes de Chakra UI
<Box shadow="lg" rounded="lg">
  <Image src={product.image} />
  <Box p={4}>
    <Heading>{product.name}</Heading>
    <Text>
      <FormatNumber value={product.price} currency="EUR" />
    </Text>
    <HStack>
      <IconButton onClick={edit}><FaEdit /></IconButton>
      <IconButton onClick={delete}><FaTrash /></IconButton>
    </HStack>
  </Box>
</Box>
```

## 🌐 Integración Frontend-Backend

### **Estructura de Datos Consistente:**

```javascript
// Producto en Frontend
{
  _id: "507f1f77bcf86cd799439011",  // MongoDB ID
  name: "Laptop Gaming",
  price: "1299.99",
  image: "https://example.com/laptop.jpg"
}

// Producto en Backend (Mongoose)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date
}
```

### **Manejo de Errores Unificado:**

```javascript
// Todas las responses siguen el mismo formato
{
  success: boolean,
  data?: any,
  message?: string
}

// Frontend maneja consistentemente
const { success, message } = await createProduct(newProduct);
if (!success) {
  // Mostrar error al usuario
  return;
}
// Proceder con éxito
```

## 🔮 Próximas Mejoras Potenciales

### **Funcionalidades Adicionales:**

- **Búsqueda y Filtrado** en tiempo real
- **Paginación** para grandes volúmenes de productos
- **Subida de Imágenes** locales además de URLs
- **Categorías y Etiquetas** para organización
- **Modo Vista/Edición** en línea (sin modal)

### **Optimizaciones Técnicas:**

- **Virtualización** de listas para muchos productos
- **Caché Avanzada** con react-query o SWR
- **Lazy Loading** de imágenes y componentes
- **Testing** con Jest y React Testing Library

## 📊 Resumen del Stack

**⚡ Desarrollo Rápido** - Vite  
**🎨 UI Consistente y Accesible** - Chakra UI v3
**🧭 Navegación Cliente** - React Router DOM  
**🏪 Estado Global Simple** - Zustand  
**🎯 Iconografía** - React Icons  
**🔔 Notificaciones** - Sistema Toaster personalizado  
**🌓 Tema Adaptable** - Context personalizado + localStorage  
**⚛️ Base Fundamental** - React 18 + JavaScript ES6+

Esta arquitectura frontend proporciona una base sólida, escalable y mantenible para la aplicación Product Store, con excelentes prácticas de desarrollo React moderno y experiencia de usuario.
