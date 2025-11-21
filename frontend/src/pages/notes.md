# Dudas

## Diferencias entre Link de 'react-router-dom' y Link de '@chakra-ui/react'

## Funcionamiento del script de HomePage

```javascript
// Importamos componentes de librerías externas
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom/Link";
import { useEffect } from "react"; // ← useEffect es un HOOK de React
import { useProducts } from "../store/product"; // ← Nuestro store de Zustand

// Definimos el componente HomePage como una función constante
// Se usa "const" porque esta referencia NO va a cambiar
// En React, los componentes generalmente se declaran con "const"
const HomePage = () => {
  // ⭐⭐ DESTRUCTURACIÓN: Extraemos fetchProducts y products del store
  // useProducts() retorna un OBJETO: { products: [], fetchProducts: function, ... }
  // En lugar de hacer: const store = useProducts(); y luego store.fetchProducts...
  // Usamos destructuración para obtener directamente las propiedades que necesitamos
  const { fetchProducts, products } = useProducts();

  // ⭐⭐ useEffect - HOOK para efectos secundarios
  useEffect(() => {
    // Esta función se ejecuta después de que el componente se renderiza
    fetchProducts(); // Llamamos a la función que carga los productos
  }, [fetchProducts]); // ← ARRAY DE DEPENDENCIAS: Le dice a React CUÁNDO ejecutar el efecto

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Products <BsFillRocketTakeoffFill />
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {/* Aquí deberían mostrarse los productos reales */}
          <div>Product 1</div>
          <div>Product 2</div>
          <div>Product 3</div>
          <div>Product 4</div>
          <div>Product 5</div>
          <div>Product 6</div>
        </SimpleGrid>

        <Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No products found...{" "}
          <Link to={"/create"}>
            <Text
              as="span"
              color={"blue.500"}
              cursor={"pointer"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
```

## Explicación detallada de tus dudas:

### 1. ¿Por qué `const` y no `let`?

```javascript
// ✅ CORRECTO - usa "const"
const { fetchProducts, products } = useProducts();

// ❌ INCORRECTO - no usar "let"
let { fetchProducts, products } = useProducts();
```

**Razón:** En React, las variables de estado y props NO se reasignan. Usamos `const` porque:

- `fetchProducts` siempre será la misma función
- `products` se actualiza a través de React, no mediante reasignación
- `const` es más seguro y comunica la intención de que no se reasignará

### 2. ¿Por qué `const { var1, var2 }` y no `const var1`?

```javascript
// ❌ Así NO funciona - useProducts() retorna un OBJETO
const fetchProducts = useProducts(); // Esto nos daría el objeto completo

// ✅ Así SÍ funciona - DESTRUCTURACIÓN
const { fetchProducts, products } = useProducts();
```

**Explicación:** `useProducts()` retorna un objeto como:

```javascript
{
  products: [...],
  fetchProducts: function() {...},
  createProduct: function() {...},
  setProducts: function() {...}
}
```

La destructuración `{ fetchProducts, products }` es como decir:
_"Del objeto que retorna useProducts(), dame solo las propiedades `fetchProducts` y `products`"_

### **3. ¿Cómo funciona `useEffect`?**

```javascript
useEffect(
  // 1️⃣ FUNCIÓN EFECTO - Lo que queremos ejecutar
  () => {
    fetchProducts();
  },
  // 2️⃣ ARRAY DE DEPENDENCIAS - CUÁNDO ejecutarlo
  [fetchProducts]
);
```

**El array de dependencias `[fetchProducts]` le dice a React:**

- **`[]` vacío**: Ejecutar solo una vez (al montar el componente)
- **`[fetchProducts]`**: Ejecutar cuando `fetchProducts` cambie
- **Sin array**: Ejecutar en CADA render

**En este caso:** Como `fetchProducts` es una función del store que NO cambia, el efecto se ejecutará solo una vez.

### Flujo completo del componente:

1. **Se monta** → Se ejecuta `useEffect` → Llama a `fetchProducts()`
2. **`fetchProducts()`** → Hace fetch al servidor → Actualiza el store
3. **El store actualizado** → Hace que el componente se rerenderice
4. **Al rerenderizar** → `products` ya tiene datos → Se muestran los productos reales
