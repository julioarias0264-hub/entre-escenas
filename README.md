# Entre escenas

Este proyecto es un catálogo de películas y series hecho con Vue 3 y Vite. Puedes guardar lo que quieres ver, marcar lo que ya viste y buscar por título o género.

## Funciones

- Agregar, editar y borrar títulos.
- Guardar el tipo, género, año, calificación y estado de cada uno.
- Cambiar entre pendiente y vista.
- Buscar por título y filtrar por estado o género.
- Guardar la colección en `localStorage`, para que siga ahí al recargar la página.
- Usarla desde una computadora o un celular.

Las ilustraciones de los pósters se hicieron con IA. Están en `public/posters/` y la app las carga desde esa carpeta.

## Conceptos de Vue que uso

- `ref` guarda datos que cambian, como la búsqueda y los filtros.
- `computed` arma la lista según lo que escribes o eliges.
- `v-model` conecta el formulario con esos datos.
- `v-for` recorre la lista y `v-if` muestra un mensaje cuando no hay resultados.
- `props` pasa datos a los componentes y `emit` avisa cuando editas, borras o cambias un título.
- `watch` guarda la lista en `localStorage` cuando cambia.

## Requisitos

- Node.js 20 o posterior.
- npm.

## Ejecutar localmente

```sh
npm install
npm run dev
```

Vite te muestra la dirección para abrir la app. Normalmente es `http://localhost:5173`.

## Compilar para producción

```sh
npm run build
npm run preview
```

La versión para publicar queda en `dist/`. Puedes subirla a Vercel, Netlify o GitHub Pages.

## Estructura

```text
public/
  posters/             Ilustraciones de la colección
src/
  components/          Navegación, tarjeta y formulario
  data/                Títulos de ejemplo y asignación de pósters
  App.vue              Estado, filtros y operaciones de la colección
  main.js              Inicio de Vue
  style.css            Estilos y diseño adaptable
```

## Despliegue

Para subirla a Vercel:

1. Sube el proyecto a un repositorio público de GitHub.
2. En Vercel, importa ese repositorio.
3. Deja `npm run build` como comando y `dist` como carpeta de salida.
4. Cuando la app esté publicada, pega aquí los dos enlaces.

- GitHub: pendiente.
- App publicada: pendiente.
