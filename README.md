# Project Structure

## Dependencies

### `package.json`

```json
{
  "name": "productstore",
  "version": "1.0.0",
  "description": "product store project",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon backend/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sromero-dev/Product-Store-Project.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "bugs": {
    "url": "https://github.com/sromero-dev/Product-Store-Project/issues"
  },
  "homepage": "https://github.com/sromero-dev/Product-Store-Project#readme",
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^4.19.2",
    "mongoose": "^8.20.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
```

TODO: Explicar cada apartado

### 📦 1. express@4.19.2

- Framework para crear servidores y APIs en Node.js.

### 📦 2. mongoose

- Habilita la conexión y el trabajo con MongoDB usando modelos y esquemas.

### 📦 3. dotenv

- Carga variables de entorno desde un archivo .env.

### 📦 4. nodemon

- Herramienta que reinicia automáticamente tu servidor Node.js cada vez que guardas cambios en tus archivos.

  Se guarda en `devDependencies` dentro del `package.json`, porque solo se necesita en **desarrollo**, no en **producción**.

---

    - Se instalan en la carpeta node_modules/.
    - Se agregan a "dependencies" en package.json.

---

## Back-end

### `server.js`

TODO: Explicar cada apartado

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
```

## Front-end
