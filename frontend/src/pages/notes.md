# Explicación de la lógica de los componentes

## HomePage.jsx

### Propósito

Página principal que muestra todos los productos en una cuadrícula responsive.

### Lógica Principal

#### Carga de Datos

```javascript
const { fetchProducts, products } = useProductStore();

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);
```

- **useEffect**: Se ejecuta al montar el componente para cargar los productos
- **Dependencia**: `[fetchProducts]` - aunque la función es estable del store
- **Flujo**: Montaje → fetchProducts → actualiza store → rerender con datos

#### Renderizado Condicional

```javascript
{
  products.length === 0 && (
    <Text>
      No products found...
      <Link to={"/create"}>
        <Text as="span">Create a product</Text>
      </Link>
    </Text>
  );
}
```

- Muestra mensaje solo cuando no hay productos
- Incluye enlace a página de creación como call-to-action

#### Grid Responsive

```javascript
<SimpleGrid
  columns={{
    base: 1,    // 1 columna en móvil
    sm: 2,      // 2 columnas en small
    md: 3,      // 3 columnas en medium+
  }}
  gap={10}
>
```

- **base**: Breakpoint por defecto (móviles)
- **sm**: Small devices (~480px+)
- **md**: Medium devices (~768px+)

## CreatePage.jsx

### Propósito

Formulario para crear nuevos productos con estado local y validación.

### Lógica Principal

#### Estado del Formulario

```javascript
const [newProduct, setNewProduct] = useState({
  name: "",
  price: "",
  image: "",
});
```

- **Estado local**: Maneja los datos del formulario antes de enviar al store
- **Objeto unificado**: Agrupa todos los campos en un solo objeto

#### Manejo de Envío

```javascript
const handleAddProduct = async () => {
  const { success, message } = await createProduct(newProduct);

  // Feedback al usuario
  toaster.create({ ... });

  // Reset solo en éxito
  if (!success) return;
  setNewProduct({ name: "", price: "", image: "" });
};
```

- **Operación asíncrona**: `createProduct` devuelve una Promise
- **Feedback inmediato**: Toaster informa éxito/error
- **Reset condicional**: Solo limpia el formulario en éxito

#### UI/UX Considerations

- **Container centrado**: `minH="80vh"` para centrado vertical
- **Formulario con sombra**: Mejora la percepción de profundidad
- **Inputs controlados**: Cada input está vinculado al estado

## Diferencias entre Link de 'react-router-dom' y Link de '@chakra-ui/react'

### React Router DOM Link

```javascript
import { Link } from "react-router-dom";

<Link to="/create">Crear producto</Link>;
```

- **Propósito**: Navegación entre rutas de la aplicación
- **Comportamiento**: Navegación del lado del cliente (SPA)
- **Props principales**: `to`, `replace`, `state`

### Chakra UI Link

```javascript
import { Link } from "@chakra-ui/react";

<Link href="/create" color="blue.500">
  Crear producto
</Link>;
```

- **Propósito**: Componente de enlace estilizado
- **Comportamiento**: Enlace tradicional (recarga página por defecto)
- **Props principales**: `href`, `color`, `variant`, `isExternal`

### Uso Combinado (Recomendado)

```javascript
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

<Link as={RouterLink} to="/create" color="blue.500">
  Crear producto
</Link>;
```

## Patrones Comunes Identificados

### 1. Manejo de Estado

- **HomePage**: Estado global (store) para datos compartidos
- **CreatePage**: Estado local para datos temporales del formulario

### 2. Feedback al Usuario

- Ambos componentes usan `toaster` para notificaciones
- Mensajes específicos de éxito/error

### 3. Responsive Design

- Uso consistente de breakpoints: `base`, `sm`, `md`, `lg`, `xl`
- Contenedores con `maxW` apropiados

### 4. Navegación

- Uso de `react-router-dom` para routing del lado del cliente
- Enlaces semánticos para mejor UX

## Flujo de Datos entre Componentes

```
CreatePage (Formulario)
    → useProductStore.createProduct()
    → Backend API
    → HomePage (useEffect + fetchProducts)
    → Actualización en tiempo real
```

Este flujo asegura que al crear un producto nuevo, la página principal se actualice automáticamente mostrando el nuevo producto.
