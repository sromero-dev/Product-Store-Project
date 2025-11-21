```javascript
// Importamos la función 'create' de la biblioteca Zustand
// Zustand es una herramienta para manejar el estado global en React
import { create } from "zustand";

// Creamos y exportamos nuestro almacén de productos llamado 'useProductStore'
// 'create' es la función que construye nuestro almacén de estado
export const useProductStore = create((set) => ({
  // ESTADO: Aquí definimos los datos que queremos almacenar

  // 'products' es un array vacío donde guardaremos la lista de productos
  // Esto es el ESTADO INICIAL de nuestro almacén
  products: [],

  // ACCIONES: Funciones para interactuar con el estado

  // 'setProducts' es una función que recibe nuevos productos y actualiza el estado
  // (products) => set({ products }) significa:
  // - Recibe un parámetro 'products' (la nueva lista de productos)
  // - Llama a set({ products }) para reemplazar el estado actual
  setProducts: (products) => set({ products }),

  // 'createProduct' es una función ASINCRONA para crear un nuevo producto
  createProduct: async (newProducts) => {
    // VALIDACIÓN: Verificamos que todos los campos requeridos estén presentes
    if (!newProducts.name || !newProducts.price || !newProducts.image) {
      // Si falta algún campo, retornamos un error
      return { success: false, message: "Please fill in all fields." };
    }

    // PETICIÓN HTTP: Hacemos una llamada al servidor para crear el producto
    const res = await fetch("/api/products", {
      method: "POST", // Método POST para crear recursos
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos JSON
      },
      body: JSON.stringify(newProducts), // Convertimos el objeto a JSON
    });

    // PROCESAMOS LA RESPUESTA: Convertimos la respuesta del servidor a JSON
    const data = await res.json();

    // ACTUALIZAMOS EL ESTADO: Agregamos el nuevo producto a la lista existente
    // set((state) => ({ ... })) nos da acceso al estado actual (state)
    // [...state.products, data.data] crea un NUEVO array con:
    // - Todos los productos existentes (...state.products)
    // - Más el nuevo producto (data.data)
    set((state) => ({
      products: [...state.products, data.data],
    }));

    // RETORNAMOS ÉXITO: Informamos que la operación fue exitosa
    return { success: true, message: "Product created successfully." };
  },

  // 'fetchProducts' es una función ASINCRONA para obtener productos del servidor
  fetchProducts: async () => {
    // PETICIÓN HTTP GET: Solicitamos la lista de productos
    const res = await fetch("/api/products");

    // PROCESAMOS LA RESPUESTA
    const data = await res.json();

    // ACTUALIZAMOS EL ESTADO: Reemplazamos TODOS los productos con los nuevos
    // set({ products: data.data }) reemplaza completamente el array products
    set({ products: data.data });
  },
}));

/*
RESUMEN DE CÓMO FUNCIONA TODO:

1. ESTRUCTURA:
   useProductStore = create((set) => ({
     estado: ...,
     acciones: ...
   }))

2. PARTES PRINCIPALES:
   - products: Array donde se guardan los productos (ESTADO)
   - setProducts: Función síncrona para cambiar los productos
   - createProduct: Función asíncrona que:
        * Valida datos
        * Envía datos al servidor
        * Actualiza el estado local
        * Retorna resultado
   - fetchProducts: Función asíncrona que carga productos del servidor

3. CONCEPTOS CLAVE:
   - set: Función mágica de Zustand para actualizar el estado
   - async/await: Para operaciones asíncronas (llamadas al servidor)
   - Inmutabilidad: Siempre creamos nuevos arrays/objetos al actualizar el estado

4. USO EN COMPONENTES:
   const { products, createProduct } = useProductStore();
   // products → estado actual
   // createProduct → función para crear productos
*/
```
