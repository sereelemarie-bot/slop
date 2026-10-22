# Analizador de representaciones

Una app para analizar casos reales (noticias, campañas, posts, videos) con un método
claro y repetible: datos del caso, las cuatro retóricas visuales de Garland-Thomson,
el test de *inspiration porn* (Stella Young, Jan Grue), un test de protección y una
conclusión. Cada caso genera una ficha que puedes pegar en tu monografía.

## Cómo abrirla

1. Descarga la carpeta `analizador-de-representaciones` en tu computadora.
   - Desde GitHub: botón verde **«Code»** → **«Download ZIP»**. Luego haz clic derecho
     en el archivo descargado → **«Extraer todo»** (en Mac, doble clic).
2. Pon la carpeta en un lugar fijo, por ejemplo en **Documentos**, y no la muevas después.
3. Dentro de la carpeta, haz doble clic en **`index.html`**. Se abre en tu navegador.
4. Consejo: guarda la página en marcadores (Ctrl + D, o Cmd + D en Mac) para abrirla rápido.

No necesitas internet ni instalar nada. Funciona mejor en **Chrome, Edge o Firefox**.
Usa siempre **el mismo navegador**: cada navegador guarda sus propios datos.

## Cómo analizar un caso

1. Pulsa **«Nuevo caso»**.
2. Sigue los 5 pasos con los botones **«Siguiente»** y **«Anterior»**:
   1. **Datos del caso:** título, tipo, medio, fecha, país, enlace y descripción.
      Abajo aparece un borrador de la referencia en **APA 7**. Revísalo siempre
      y, si hace falta, corrígelo en el campo «Referencia corregida a mano».
   2. **Retóricas visuales:** para cada una, elige *No aparece / Un poco / Mucho* y
      escribe una nota. La app sugiere una retórica principal; tú puedes cambiarla.
   3. **Test de inspiration porn:** seis preguntas de *Sí / No / No sé*.
      En todas, **«Sí» significa una señal**. Justifica cada respuesta.
   4. **Test de protección:** marca la casilla solo si el caso trata de proteger a
      la persona. Si no, pasa al siguiente paso.
   5. **Conclusión:** responde *Sí / No / En parte*, escribe tu conclusión, qué no
      encaja con tu tesis y qué te podrían criticar.
3. Pulsa **«Ver la ficha»**.

**No hay botón de guardar: todo se guarda solo mientras escribes.** Puedes dejar un
caso a medias y seguir otro día.

## Mis casos

La pantalla **«Mis casos»** muestra:

- un **resumen**: cuántos casos tienes, qué retórica aparece más y cuántas
  conclusiones son *Sí*, *No* o *En parte*;
- **filtros** por palabra, tipo, país y retórica principal;
- la lista de casos, con un enlace a cada ficha.

## Pasar las fichas a tu monografía

- **Una ficha:** abre la ficha y pulsa **«Descargar ficha (Markdown)»** o
  **«Copiar ficha en Markdown»** y pégala en tu documento.
- **Todas las fichas:** en «Mis casos», pulsa **«Exportar todas las fichas (Markdown)»**.
  Se descarga un solo archivo con el resumen y todas las fichas.
- **Imprimir o PDF:** en la ficha, pulsa **«Imprimir»** y elige «Guardar como PDF».

Los archivos `.md` se abren con cualquier editor de texto (Bloc de notas, TextEdit).
Si pegas el texto en Google Docs, activa *Herramientas → Preferencias → Habilitar Markdown*
para que se vean las negritas y los títulos.

## Copias de seguridad (¡importante!)

Tus casos se guardan **solo en este navegador, en esta computadora**. Se pierden si:

- borras el historial o los «datos de sitios» del navegador,
- cambias de computadora o de navegador,
- mueves o renombras la carpeta de la app.

Para no perder nada:

1. Ve a **«Copia de seguridad»** y pulsa **«Descargar copia de seguridad»**.
2. Se descarga un archivo como `copia-analizador-2026-10-22.json`.
3. Guárdalo en un pendrive o envíatelo por correo. Hazlo **cada semana**.
   La app te lo recuerda si pasan más de 7 días.

Para recuperar una copia:

1. Ve a **«Copia de seguridad»**.
2. Elige **«Combinar»** (agrega los casos del archivo a los que ya tienes) o
   **«Reemplazar»** (borra los actuales y deja solo los del archivo).
3. Pulsa el botón para elegir el archivo `.json` y selecciónalo.

## Accesibilidad

- Se puede usar solo con el teclado: **Tab** avanza, **Mayús + Tab** retrocede,
  las **flechas** eligen opciones y **Enter** pulsa botones.
- El primer **Tab** muestra un enlace «Saltar al contenido».
- Los botones **A−** y **A+** cambian el tamaño de la letra (de 80 % a 200 %).
- Todas las respuestas se muestran con palabras, nunca solo con colores.
- Si tu computadora está en modo oscuro, la app también.

## Privacidad

- Nada se envía a internet. La app bloquea cualquier conexión externa.
- No se guardan imágenes, solo enlaces.
- Si otra persona usa tu computadora con el mismo navegador, podría ver tus casos.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | La página que abres. |
| `estilos.css` | El diseño (colores, tamaños, espacios). |
| `app.js` | Lo que hace funcionar la app: pasos, guardado, fichas, exportar. |
| `LEEME.md` | Este archivo. |

Si quieres cambiar una pregunta, búscala en `app.js` (están al principio, en
`RETORICAS`, `PREGUNTAS_INSPIRACION` y `PREGUNTAS_PROTECCION`) y edita el texto entre comillas.
No cambies los `id`, porque las respuestas guardadas dependen de ellos.
