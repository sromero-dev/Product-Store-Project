# 🎨 Frontend - Product Store (React + JavaScript)

## 📋 Descripción General

El frontend de **Product Store** es una aplicación React moderna que proporciona una interfaz de usuario intuitiva para gestionar productos. Utiliza **Chakra UI** para el diseño, **React Router** para la navegación y **Zustand** para el manejo del estado global.

## 🏗️ Arquitectura del Frontend

```
src/
├── components/
│   └── Navbar.jsx           # Barra de navegación global
├── pages/
│   ├── HomePage.jsx         # Página principal (en desarrollo)
│   └── CreatePage.jsx       # Formulario de creación de productos
├── store/
│   └── product.js           # Gestión del estado global (Zustand)
├── App.jsx                  # Componente raíz de la aplicación
└── main.jsx                 # Punto de entrada de React
```

## 📦 Dependencias y Tecnologías

### **Tecnologías Principales:**

- **React 18**: Biblioteca para interfaces de usuario
- **React Router DOM**: Enrutamiento cliente-side
- **Chakra UI**: Sistema de diseño y componentes
- **Zustand**: Gestión de estado global minimalista
- **React Icons**: Biblioteca de iconos

## 🔧 Componentes Principales

### **1. main.jsx - Punto de Entrada de la Aplicación**

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
```

**🔍 Explicación:**

- **`StrictMode`**: Herramienta de desarrollo de React para detectar problemas
- **`createRoot`**: API moderna de React 18 para renderizado concurrente
- **`BrowserRouter`**: Habilita el enrutamiento basado en URLs
- **`ChakraProvider`**: Provee el tema y contexto de Chakra UI a toda la app

### **2. App.jsx - Componente Raíz**

```javascript
function App() {
  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}
```

**🔍 Explicación:**

- **`useColorModeValue`**: Hook de Chakra UI para temas claro/oscuro
- **`Routes` y `Route`**: Sistema de enrutamiento declarativo
- **Contenedor responsivo** que ocupa toda la altura viewport

### **3. Navbar.jsx - Barra de Navegación**

```javascript
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        {/* Logo/Título */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        {/* Botones de acción */}
        <HStack spacing={2}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
```

**🔍 Características:**

- **Diseño responsivo**: Cambia de columna a fila en pantallas pequeñas
- **Modo claro/oscuro**: Toggle con iconos dinámicos
- **Gradiente animado**: Efecto visual en el título
- **Navegación SPA**: Sin recargas de página

### **4. CreatePage.jsx - Formulario de Creación**

```javascript
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      // Reset del formulario
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack w={"full"}>
        <Heading as={"h1"} size={"2xl"}>
          Create New Product
        </Heading>
        <Box
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            {/* Más inputs... */}
            <Button onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
```

## 🏪 Store de Estado Global (Zustand)

### **product.js - Gestión del Estado**

```javascript
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProducts) => {
    // Validación síncrona
    if (!newProducts.name || !newProducts.price || !newProducts.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    // Petición asíncrona a la API
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProducts),
    });

    const data = await res.json();

    // Actualización del estado global
    set((state) => ({
      products: [...state.products, data.data],
    }));

    return { success: true, message: "Product created successfully." };
  },
}));
```

## 🎨 Sistema de Diseño (Chakra UI)

### **Principios de Diseño:**

1. **Responsive Design**:

```javascript
// Diseño mobile-first
flexDir={{ base: "column", sm: "row" }}
fontSize={{ base: "22", sm: "28" }}
```

2. **Color Mode**:

```javascript
// Tema adaptable
bg={useColorModeValue("gray.100", "gray.900")}
bg={useColorModeValue("white", "gray.800")}
```

3. **Espaciado Consistente**:

```javascript
// Sistema de spacing de Chakra
p={6}        // padding: 1.5rem
spacing={4}  // gap: 1rem
```

## 🔄 Flujo de Datos

### **Creación de Producto:**

1. **Usuario** llena formulario en `CreatePage`
2. **Estado Local** (`useState`) captura los cambios
3. **Botón "Add Product"** → ejecuta `handleAddProduct`
4. **Store (Zustand)** → `createProduct` hace fetch a la API
5. **Backend** → procesa y guarda en MongoDB
6. **Store** → actualiza estado global con nuevo producto
7. **UI** → muestra toast y limpia formulario

### **Navegación:**

```
/ → HomePage (en desarrollo)
/create → CreatePage (formulario)
```

## 🎯 Características Técnicas Avanzadas

### **1. Gestión de Estado con Zustand**

```javascript
// Patrón simple y efectivo
const { createProduct, products } = useProductStore();

// ✅ No necesita Provider como Redux
// ✅ Menos boilerplate code
// ✅ Integración directa con React
```

### **2. Validación en Capas**

```javascript
// Frontend (validación inmediata)
if (!newProducts.name || !newProducts.price || !newProducts.image) {
  return { success: false, message: "Please fill in all fields." };
}

// Backend (validación de seguridad)
if (!product.name || !product.price || !product.image) {
  return res.status(400).json({
    success: false,
    message: "All fields are required.",
  });
}
```

### **3. Manejo de Errores con Feedback**

```javascript
// Sistema de notificaciones
toast({
  title: "Error",
  description: message, // Mensaje específico del error
  status: "error",
  isClosable: true,
});
```

## 🚀 Patrones React Utilizados

### **1. Estado Local vs Global**

```javascript
// Estado LOCAL (solo este componente)
const [newProduct, setNewProduct] = useState({
  name: "",
  price: "",
  image: "",
});

// Estado GLOBAL (compartido entre componentes)
const { createProduct, products } = useProductStore();
```

### **2. Composición de Componentes**

```javascript
// Patrón de contenedor + componentes puros
<Container>
  <VStack>
    <Heading>...</Heading>
    <Box>
      <VStack>
        <Input>...</Input>
        <Button>...</Button>
      </VStack>
    </Box>
  </VStack>
</Container>
```

### **3. Separación de Responsabilidades**

- **Components**: UI pura (Navbar)
- **Pages**: Vistas completas (CreatePage)
- **Store**: Lógica de estado (product.js)
- **Routes**: Configuración de navegación (App.jsx)

## 🔮 Próximos Pasos (Según Código Actual)

### **HomePage.jsx** - En Desarrollo

```javascript
// Actualmente vacío - probablemente mostrará:
// - Lista de productos
// - Búsqueda y filtros
// - Cards de productos con opciones de editar/eliminar
```

### **Mejoras Potenciales:**

1. **Carga de productos** al iniciar la aplicación
2. **Operaciones CRUD completas** (editar, eliminar)
3. **Búsqueda y filtrado** en tiempo real
4. **Paginación** para muchos productos
5. **Imágenes locales** además de URLs

## 🌐 Integración Frontend-Backend

### **Comunicación API:**

```javascript
// Frontend → Backend
fetch("/api/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newProducts),
});

// Backend responde con:
{ success: true, data: newProduct } // ✅ Éxito
{ success: false, message: "Error message" } // ❌ Falla
```

### **Estructura de Datos Consistente:**

```javascript
// Producto en Frontend
{
  name: "Laptop Gaming",
  price: "1299.99",
  image: "https://example.com/laptop.jpg"
}

// Producto en Backend (Mongoose)
{
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  timestamps: true // createdAt, updatedAt automáticos
}
```

Esta arquitectura frontend proporciona una base sólida, escalable y mantenible para la aplicación Product Store, con excelentes prácticas de desarrollo React moderno.

## Rules - `eslint.config.js`

#TODO - Explicar

## Resumen del stack empleado

**⚡ Desarrollo rápido** - Vite

**🎨 UI consistente y accesible** - Chakra UI v2 (→ v3)

**🧭 Navegación cliente** - React Router DOM

**🏪 Estado global simple** - Zustand

**🎯 Iconografía** - React Icons + Chakra Icons

**⚛️ Base fundamental** - React 18 + JavaScript ES6+
