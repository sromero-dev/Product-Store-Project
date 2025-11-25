# Product Store - Guía Técnica

## Para el deployment

https://dashboard.render.com/web

## Diferencias entre export const y export default

En **JavaScript/React**, la diferencia entre `export const` y `export default` tiene que ver con **cómo exportas** y **cómo importas** los módulos. Te explico con detalle:

---

## 1️⃣ `export const` (Exportaciones nombradas)

- Permite **exportar varias cosas** desde un mismo archivo.
- Al importar, debes usar el **mismo nombre** entre llaves `{}`.

### Ejemplo

```js
// utils.js
export const suma = (a, b) => a + b;
export const resta = (a, b) => a - b;
```

```js
// otroArchivo.js
import { suma, resta } from "./utils";

console.log(suma(2, 3)); // 5
```

> ⚠ Si cambias el nombre al importar, debes usar `as`:

```js
import { suma as sumar } from "./utils";
```

---

## 2️⃣ `export default` (Exportación por defecto)

- Cada archivo puede tener **solo un default export**.
- Al importar, **puedes usar cualquier nombre**, sin llaves.

### Ejemplo

```js
// MiComponente.jsx
export default function MiComponente() {
  return <div>Hola</div>;
}
```

```js
// App.jsx
import Componente from "./MiComponente"; // puedes poner cualquier nombre
```

---

## 3️⃣ Mezclar ambos

Un archivo puede tener **export default** y **export const** al mismo tiempo:

```js
// utils.js
export const suma = (a, b) => a + b;
export default function resta(a, b) {
  return a - b;
}
```

```js
import resta, { suma } from "./utils";
```

- `resta` → default
- `{ suma }` → export nombrado

---

### ✅ Resumen rápido

| Tipo             | Cantidad por archivo | Cómo importar                             | Nombre obligatorio   |
| ---------------- | -------------------- | ----------------------------------------- | -------------------- |
| `export const`   | Múltiples            | `import { nombre } from './archivo'`      | Sí, debe coincidir   |
| `export default` | Solo uno             | `import cualquierNombre from './archivo'` | No, puedes renombrar |

---

## para ejecutar desarrollo en local

npm run dev en back y luego en front

importante console.logs para debuggear
