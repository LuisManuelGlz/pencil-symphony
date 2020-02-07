## Antes de empezar...

La aplicación trabaja con la base de datos MongoDB por lo que se debe de instalar en nuestro SO antes de proceder.

Una vez instalado MongoDB y para que la aplicación pueda correr sin problemas es necesario ejecutar los siguientes comandos.

### En el directorio server:

Instala las dependencias de Nodejs

### `npm intall`

### En el directorio client:

Instala las dependencias de React

### `npm intall`

---

## Scripts disponibles

En el directorio server, tú puedes ejecutar:

### `npm run start`

Este comando ejecuta la aplicación del backend (solo la API).

### `npm run server`

Este comando ejecuta la aplicación del backend (solo la API) y además el servidor estará escuchando cualquier cambio.

**Nota: para ejecutar este comando es necesario tener instalado `nodemon`<br />Basta con ejecutar `npm install nodemon -D`.**

### `npm run dev`

Este comando ejecuta toda la aplicación tanto el backend como el frontend de forma simultánea.
