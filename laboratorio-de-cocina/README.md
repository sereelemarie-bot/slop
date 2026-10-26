# 🧪🍰 Laboratorio de Cocina

Recetario de química para secundaria: cada receta explica el proceso químico que ocurre al cocinar.

## Cómo abrir la app

1. Descarga o copia la carpeta `laboratorio-de-cocina` completa.
2. Haz doble clic en `index.html`. Se abre en tu navegador (Chrome, Edge, Firefox o Safari).

No hace falta instalar nada ni tener servidor. Con internet se cargan las letras redonditas
(Fredoka y Nunito); sin internet la app funciona igual, con una letra parecida.

**Para presentar en clase:** abre `index.html` y presiona `F11` para pantalla completa.

## Archivos

```
laboratorio-de-cocina/
├── index.html          ← abre este
├── datos/
│   ├── recetas.js      ← las recetas (aquí agregas o editas)
│   ├── glosario.js     ← los términos del glosario
│   └── proyecto.js     ← tu nombre, curso, colegio...
├── css/estilos.css     ← colores y diseño
└── js/app.js           ← la lógica (no necesitas tocarlo)
```

## Cómo agregar una receta nueva

1. Abre `datos/recetas.js` con un editor de texto (Bloc de notas, VS Code...).
2. Baja hasta el final: hay una **plantilla** dentro de un comentario `/* ... */`.
3. Copia la plantilla (sin las marcas `/*` y `*/`) y pégala justo antes del `];` que cierra la lista.
4. Asegúrate de que la receta anterior termine con `},` (con coma).
5. Cambia los textos. El `id` debe ser único, sin espacios ni tildes (ej.: `"helado-casero"`).
6. Guarda y recarga la página (`F5`).

Trucos:

- Fórmulas en el texto: escríbelas entre llaves: `{CO2}` se ve como CO₂.
- Cargas: `{H^+}` se ve como H⁺.
- Ecuaciones: `->` es →, `<=>` es ⇌, y `-[calor]->` pone "calor" encima de la flecha.
- Temporizador en un paso: `temporizador: 10` (minutos).
- Colores: `rosa`, `lila`, `menta`, `durazno`, `celeste`, `amarillo`.

Si la página dice que no pudo cargar las recetas, falta una coma, comilla o corchete.
Presiona `F12`, abre la pestaña **Consola** y verás la línea con el error. La consola también
avisa si a una receta le falta algún campo.

## Tus datos

Edita `datos/proyecto.js` y cambia "Tu nombre aquí", el curso y el colegio.
