# Explicación de la lógica de los componentes

## ProductCard.jsx

### Propósito

Componente que muestra la tarjeta de un producto con funcionalidades completas de CRUD (Crear, Leer, Actualizar, Eliminar).

### Lógica Principal

#### Estado y Store

- **Estado local**: `updatedProduct` para almacenar los datos editados temporalmente
- **Estado modal**: `open` controla la visibilidad del diálogo de edición
- **Store**: Utiliza `useProductStore` para operaciones globales (`deleteProduct`, `updateProduct`)

#### Validación de Precio

Implementa validación robusta para el campo de precio:

- Verifica que no esté vacío y sea mayor o igual a 0
- Valida formato numérico (solo números y un punto decimal opcional)
- Detecta múltiples puntos decimales
- Maneja tanto punto como coma como separador decimal
- Convierte a número flotante y redondea a 2 decimales

#### Componente FloatingLabelInput

Input personalizado con etiqueta flotante:

- Usa `useControllableState` para manejo de estado controlado/no controlado
- La etiqueta flota hacia arriba cuando el input está enfocado o tiene contenido
- Estilos CSS-in-JS con `defineStyle` para transiciones suaves

## Navbar.jsx

### Propósito

Barra de navegación principal con branding y controles de interfaz.

### Características

- **Branding**: Texto con gradiente "Product Store" que enlaza a la página principal
- **Botón Add**: Navegación a la página de creación de productos
- **Toggle de Tema**: Alterna entre modo claro y oscuro usando el contexto de color

### Responsive Design

- Diseño columnar en móviles, horizontal en pantallas más grandes
- Tamaños de texto adaptativos (`base` y `sm`)

## color-mode.jsx

### Sistema de Tema

Contexto personalizado para gestión del modo de color en toda la aplicación.

### Implementación

- **Persistencia**: Almacena la preferencia en `localStorage`
- **Sincronización**: Aplica la clase y atributos CSS al elemento raíz del documento
- **API Simple**: Provee `colorMode` y `toggleColorMode` a través del contexto

### Efectos Visuales

- Actualiza `color-scheme` CSS property
- Aplica clases `light`/`dark` al documento
- Mantiene consistencia entre sesiones mediante localStorage

## Flujo de Datos

### Actualización de Productos

1. Usuario hace clic en editar → abre diálogo modal
2. Cambios se guardan en estado local `updatedProduct`
3. Al guardar: validación → transformación → llamada al store → feedback vía toaster

### Eliminación de Productos

Confirmación implícita mediante acción directa con feedback visual de éxito/error.

### Sincronización de Tema

Cambios en el tema se propagan inmediatamente a toda la aplicación mediante el contexto React.
