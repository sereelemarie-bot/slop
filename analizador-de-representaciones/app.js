'use strict';

/* =========================================================
   Analizador de representaciones
   Todo se guarda en el navegador (localStorage). Nada sale de
   esta computadora.
   ========================================================= */

const CLAVE_DATOS = 'analizador-representaciones:datos';
const CLAVE_LETRA = 'analizador-representaciones:letra';

/* ===== Listas fijas ===== */

const TIPOS = {
  noticia: 'Noticia',
  campana: 'Campaña',
  publicidad: 'Publicidad',
  post: 'Post de redes',
  video: 'Video',
  otro: 'Otro'
};

const NIVELES = { no: 'No aparece', poco: 'Un poco', mucho: 'Mucho' };

const RETORICAS = [
  {
    id: 'maravillosa',
    nombre: 'Maravillosa',
    resumen: 'La persona aparece como heroica o extraordinaria.',
    preguntas: [
      '¿Se presenta a la persona como heroica o extraordinaria?',
      '¿Hay cámara desde abajo (contrapicado)?',
      '¿La música sube o se vuelve épica?',
      '¿El foco está en el logro o en “superar” algo?'
    ]
  },
  {
    id: 'sentimental',
    nombre: 'Sentimental',
    resumen: 'La persona aparece como víctima o como alguien que da pena.',
    preguntas: [
      '¿Se presenta a la persona como víctima?',
      '¿Hay cámara desde arriba (picado)?',
      '¿La música es lenta o triste?',
      '¿Aparece alguien que la ayuda o la “rescata”?'
    ]
  },
  {
    id: 'exotica',
    nombre: 'Exótica',
    resumen: 'La diferencia se exagera y se vuelve un espectáculo.',
    preguntas: [
      '¿Se exagera la diferencia, como algo raro o fascinante?',
      '¿Se fragmenta el cuerpo (primeros planos de manos, prótesis, partes del cuerpo)?',
      '¿La persona está ahí para ser mirada más que para hablar?'
    ]
  },
  {
    id: 'realista',
    nombre: 'Realista',
    resumen: 'La persona aparece en lo cotidiano, a la altura de los ojos.',
    preguntas: [
      '¿La cámara está a la altura de los ojos?',
      '¿Se muestra lo cotidiano?',
      '¿Se le da tiempo (duración) a la persona, sin cortes dramáticos?',
      'Ojo: ¿lo “realista” se usa para que la persona parezca “normal” y así merezca respeto?'
    ]
  }
];

const RETORICA_PRINCIPAL = {
  maravillosa: 'Maravillosa',
  sentimental: 'Sentimental',
  exotica: 'Exótica',
  realista: 'Realista',
  mezcla: 'Mezcla (varias por igual)',
  ninguna: 'Ninguna'
};

const SI_NO_NOSE = { si: 'Sí', no: 'No', nose: 'No sé' };

// En todas estas preguntas, «Sí» significa una señal de inspiration porn.
const PREGUNTAS_INSPIRACION = [
  { id: 'espectador', texto: '¿La pieza está hecha para el espectador sin discapacidad, más que para la persona mostrada?' },
  { id: 'vidaPeor', texto: '¿El mensaje funciona solo si se supone que la vida de esa persona es peor?' },
  { id: 'barreras', texto: '¿Desaparecen las barreras del entorno y el problema se vuelve de “actitud” o “ganas”?' },
  { id: 'superar', texto: '¿El valor de la persona depende de que “supere” algo?' },
  { id: 'otraVoz', texto: '¿Habla otra persona por ella, en vez de tener voz propia?' },
  { id: 'controlAjeno', texto: '¿Controló la imagen alguien que no es la persona mostrada?' }
];

// «señal» es la respuesta que indica protección excesiva.
const PREGUNTAS_PROTECCION = [
  {
    id: 'quien',
    texto: '¿Quién decidió que algo era peligroso? ¿Participó la persona en esa decisión?',
    opciones: { si: 'Sí participó', no: 'No participó', nose: 'No sé' },
    senal: 'no',
    ayuda: 'Escribe quién decidió (familia, institución, médico, medio…).'
  },
  {
    id: 'riesgo',
    texto: '¿Es un riesgo que se le permite a cualquier otra persona?',
    opciones: SI_NO_NOSE,
    senal: 'si',
    ayuda: 'Si a cualquier otra persona se le permite, hay una doble vara de medida.'
  },
  {
    id: 'ayudo',
    texto: '¿Se la ayudó a decidir o se decidió por ella?',
    opciones: { ayudo: 'Se la ayudó a decidir', decidieron: 'Se decidió por ella', nose: 'No sé' },
    senal: 'decidieron',
    ayuda: ''
  },
  {
    id: 'tranquiliza',
    texto: '¿A quién tranquiliza la medida?',
    opciones: null,
    senal: null,
    ayuda: '¿A la persona, a su familia, a la institución, al público?'
  }
];

const CONCLUSION = { si: 'Sí', no: 'No', enparte: 'En parte' };

const PREGUNTA_CONCLUSION =
  '¿La representación está hecha para que el espectador se sienta de cierta manera, ' +
  'y su valor depende de suponer que esa vida es peor?';

const PASOS = [
  'Datos del caso',
  'Retóricas visuales',
  'Test de inspiration porn',
  'Test de protección',
  'Conclusión'
];

const PAISES = ['Ecuador', 'Colombia', 'Perú', 'Bolivia', 'Chile', 'Argentina', 'México', 'España', 'Estados Unidos', 'Internacional'];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
  'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/* ===== Datos ===== */

let datos = { casos: [], ultimaCopia: null };
let almacenamientoDisponible = true;
let temporizadorGuardado = null;
let filtros = { texto: '', tipo: '', pais: '', retorica: '' };

function crearId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function ahora() {
  return new Date().toISOString();
}

function nuevoCaso() {
  const c = {
    id: crearId(),
    creado: ahora(),
    modificado: ahora(),
    titulo: '',
    tipo: '',
    medio: '',
    fecha: '',
    anioSolo: '',
    pais: 'Ecuador',
    enlace: '',
    descripcion: '',
    apa: { autor: '', manual: '' },
    retoricas: {},
    retoricaPrincipal: '',
    inspiracion: {},
    proteccion: { aplica: false },
    conclusion: { respuesta: '', texto: '', noEncaja: '', critica: '' }
  };
  RETORICAS.forEach(r => { c.retoricas[r.id] = { nivel: '', nota: '' }; });
  PREGUNTAS_INSPIRACION.forEach(p => { c.inspiracion[p.id] = { resp: '', just: '' }; });
  PREGUNTAS_PROTECCION.forEach(p => { c.proteccion[p.id] = { resp: '', just: '' }; });
  return c;
}

// Copia en «base» solo los campos conocidos de «extra», con el mismo tipo.
// Así un archivo importado con datos raros no rompe la app.
function fusionar(base, extra) {
  if (!extra || typeof extra !== 'object' || Array.isArray(extra)) return base;
  for (const k of Object.keys(base)) {
    if (!(k in extra)) continue;
    const b = base[k];
    const e = extra[k];
    if (b && typeof b === 'object' && !Array.isArray(b)) base[k] = fusionar(b, e);
    else if (typeof b === typeof e) base[k] = e;
  }
  return base;
}

function normalizar(c) {
  const n = fusionar(nuevoCaso(), c);
  if (!n.id) n.id = crearId();
  return n;
}

function cargar() {
  try {
    const texto = localStorage.getItem(CLAVE_DATOS);
    if (!texto) return { casos: [], ultimaCopia: null };
    const obj = JSON.parse(texto);
    return {
      casos: Array.isArray(obj.casos) ? obj.casos.map(normalizar) : [],
      ultimaCopia: typeof obj.ultimaCopia === 'string' ? obj.ultimaCopia : null
    };
  } catch (e) {
    almacenamientoDisponible = false;
    return { casos: [], ultimaCopia: null };
  }
}

function guardarYa() {
  clearTimeout(temporizadorGuardado);
  temporizadorGuardado = null;
  try {
    localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos));
    return true;
  } catch (e) {
    anunciar('No se pudo guardar. Haz una copia de seguridad ahora mismo desde «Copia de seguridad».', true);
    return false;
  }
}

function guardarPronto() {
  clearTimeout(temporizadorGuardado);
  temporizadorGuardado = setTimeout(guardarYa, 400);
}

function buscarCaso(id) {
  return datos.casos.find(c => c.id === id);
}

function obtener(obj, ruta) {
  return ruta.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function asignar(obj, ruta, valor) {
  const ks = ruta.split('.');
  let o = obj;
  for (let i = 0; i < ks.length - 1; i++) {
    if (typeof o[ks[i]] !== 'object' || o[ks[i]] === null) o[ks[i]] = {};
    o = o[ks[i]];
  }
  o[ks[ks.length - 1]] = valor;
}

/* ===== Cálculos ===== */

function retoricaSugerida(c) {
  const peso = { mucho: 2, poco: 1, no: 0 };
  let respondidas = 0;
  let max = 0;
  let ids = [];
  RETORICAS.forEach(r => {
    const nivel = c.retoricas[r.id].nivel;
    if (!nivel) return;
    respondidas++;
    const p = peso[nivel] || 0;
    if (p > max) { max = p; ids = [r.id]; }
    else if (p === max && p > 0) ids.push(r.id);
  });
  if (respondidas === 0) return '';
  if (max === 0) return 'ninguna';
  return ids.length === 1 ? ids[0] : 'mezcla';
}

function retoricaPrincipal(c) {
  return c.retoricaPrincipal || retoricaSugerida(c);
}

function nombreRetoricaPrincipal(c) {
  return RETORICA_PRINCIPAL[retoricaPrincipal(c)] || 'Sin analizar';
}

function senalesInspiracion(c) {
  let si = 0, nose = 0, sinResponder = 0;
  PREGUNTAS_INSPIRACION.forEach(p => {
    const r = c.inspiracion[p.id].resp;
    if (r === 'si') si++;
    else if (r === 'nose') nose++;
    else if (!r) sinResponder++;
  });
  return { si, nose, sinResponder, total: PREGUNTAS_INSPIRACION.length };
}

function senalesProteccion(c) {
  const conSenal = PREGUNTAS_PROTECCION.filter(p => p.senal);
  const si = conSenal.filter(p => c.proteccion[p.id].resp === p.senal).length;
  return { si, total: conSenal.length };
}

function textoSenales(s) {
  let t = `${s.si} de ${s.total} señales`;
  const extra = [];
  if (s.nose) extra.push(`${s.nose} «no sé»`);
  if (s.sinResponder) extra.push(`${s.sinResponder} sin responder`);
  if (extra.length) t += ` (${extra.join(', ')})`;
  return t;
}

/* ===== Fechas y referencia APA ===== */

function partesFecha(fecha) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha || '');
  if (!m) return null;
  return { a: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
}

function fechaLegible(c) {
  const f = partesFecha(c.fecha);
  if (f) return `${f.d} de ${MESES[f.m - 1]} de ${f.a}`;
  if (String(c.anioSolo).trim()) return String(c.anioSolo).trim();
  return 'Sin fecha';
}

function fechaAPA(c) {
  const f = partesFecha(c.fecha);
  if (f) return `${f.a}, ${f.d} de ${MESES[f.m - 1]}`;
  if (String(c.anioSolo).trim()) return String(c.anioSolo).trim();
  return 's. f.';
}

function fechaHora(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleString('es-EC', { dateStyle: 'long', timeStyle: 'short' });
}

function conPunto(s) {
  return /[.!?]$/.test(s) ? s : s + '.';
}

function sinPunto(s) {
  return s.replace(/[.]+$/, '');
}

// Borrador APA 7 en formato Markdown (cursiva con *asteriscos*).
function referenciaAPA(c) {
  const manual = c.apa.manual.trim();
  if (manual) return manual;

  const autor = c.apa.autor.trim();
  const titulo = sinPunto(c.titulo.trim() || '[Título]');
  const medio = c.medio.trim();
  const url = c.enlace.trim();
  const fecha = `(${fechaAPA(c)}).`;

  let tituloRef;
  let fuente = '';
  if (c.tipo === 'noticia') {
    // Noticia: el título va normal y el periódico en cursiva.
    tituloRef = conPunto(titulo);
    if (medio) fuente = `*${sinPunto(medio)}*.`;
  } else if (c.tipo === 'video') {
    tituloRef = `*${titulo}* [Video].`;
    if (medio && medio !== autor) fuente = conPunto(medio);
  } else if (c.tipo === 'post') {
    tituloRef = `*${titulo}* [Publicación en redes sociales].`;
    if (medio && medio !== autor) fuente = conPunto(medio);
  } else {
    tituloRef = `*${titulo}*.`;
    if (medio && medio !== autor) fuente = conPunto(medio);
  }

  const partes = autor
    ? [conPunto(autor), fecha, tituloRef]
    : [tituloRef, fecha];
  if (fuente) partes.push(fuente);
  if (url) partes.push(url);
  return partes.join(' ');
}

/* ===== Utilidades de HTML ===== */

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

// Convierte *texto* en cursiva (solo para mostrar la referencia).
function cursivas(s) {
  return esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function esEnlaceSeguro(url) {
  return /^https?:\/\//i.test(String(url).trim());
}

function idCampo(ruta) {
  return 'f-' + ruta.replace(/\./g, '-');
}

function textoLibre(s, vacio = 'Sin escribir.') {
  return String(s || '').trim()
    ? `<p class="texto-libre">${esc(s.trim())}</p>`
    : `<p class="vacio">${esc(vacio)}</p>`;
}

function campo({ ruta, etiqueta, valor, ayuda = '', tipo = 'text', multilinea = false, lista = '', extra = '' }) {
  const id = idCampo(ruta);
  const idAyuda = ayuda ? id + '-ayuda' : '';
  const describe = idAyuda ? ` aria-describedby="${idAyuda}"` : '';
  const control = multilinea
    ? `<textarea id="${id}" data-ruta="${ruta}"${describe} ${extra}>${esc(valor)}</textarea>`
    : `<input type="${tipo}" id="${id}" data-ruta="${ruta}" value="${esc(valor)}"${describe}${lista ? ` list="${lista}"` : ''} ${extra}>`;
  return `<div class="campo">
    <label for="${id}">${esc(etiqueta)}</label>
    ${ayuda ? `<p class="ayuda" id="${idAyuda}">${esc(ayuda)}</p>` : ''}
    ${control}
  </div>`;
}

function seleccion({ ruta, etiqueta, opciones, valor, vacio, ayuda = '' }) {
  const id = idCampo(ruta);
  const idAyuda = ayuda ? id + '-ayuda' : '';
  return `<div class="campo">
    <label for="${id}">${esc(etiqueta)}</label>
    ${ayuda ? `<p class="ayuda" id="${idAyuda}">${esc(ayuda)}</p>` : ''}
    <select id="${id}" data-ruta="${ruta}"${idAyuda ? ` aria-describedby="${idAyuda}"` : ''}>
      <option value="">${esc(vacio)}</option>
      ${Object.entries(opciones).map(([v, t]) =>
        `<option value="${esc(v)}"${valor === v ? ' selected' : ''}>${esc(t)}</option>`).join('')}
    </select>
  </div>`;
}

function grupoRadios({ ruta, leyenda, opciones, valor, ayuda = '' }) {
  const nombre = idCampo(ruta);
  const idAyuda = ayuda ? nombre + '-ayuda' : '';
  return `<fieldset${idAyuda ? ` aria-describedby="${idAyuda}"` : ''}>
    <legend>${esc(leyenda)}</legend>
    ${ayuda ? `<p class="ayuda" id="${idAyuda}">${esc(ayuda)}</p>` : ''}
    <div class="opciones">
      ${Object.entries(opciones).map(([v, t]) => `
        <label class="opcion">
          <input type="radio" name="${nombre}" value="${esc(v)}" data-ruta="${ruta}"${valor === v ? ' checked' : ''}>
          ${esc(t)}
        </label>`).join('')}
    </div>
  </fieldset>`;
}

/* ===== Avisos y foco ===== */

let temporizadorAviso = null;

function anunciar(mensaje, fijo = false) {
  const aviso = document.getElementById('aviso');
  aviso.textContent = '';
  clearTimeout(temporizadorAviso);
  // Pequeña pausa para que el lector de pantalla note el cambio.
  setTimeout(() => { aviso.textContent = mensaje; }, 50);
  if (!fijo) temporizadorAviso = setTimeout(() => { aviso.textContent = ''; }, 8000);
}

function enfocarTitulo() {
  const el = document.getElementById('foco') || document.querySelector('main h1');
  if (el) el.focus();
}

/* ===== Vista: Mis casos ===== */

function vistaColeccion() {
  document.title = 'Mis casos · Analizador de representaciones';
  const casos = datos.casos;
  const paises = [...new Set(casos.map(c => c.pais.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));

  let html = `<h1 id="foco" tabindex="-1">Mis casos</h1>`;
  html += avisoCopia();
  html += `<div class="acciones">
    <a class="boton primario" href="#/nuevo">+ Nuevo caso</a>
    ${casos.length ? `<button type="button" id="exportar-todas">Exportar todas las fichas (Markdown)</button>` : ''}
  </div>`;

  if (!casos.length) {
    html += `<p>Todavía no tienes casos. Pulsa <strong>«+ Nuevo caso»</strong> para empezar.</p>
      <p>Si es tu primera vez, lee <a href="#/ayuda">Cómo se usa</a>.</p>`;
    document.getElementById('contenido').innerHTML = html;
    return;
  }

  html += htmlResumen(casos);

  html += `<h2>Buscar y filtrar</h2>
  <div class="filtros">
    <div class="campo">
      <label for="filtro-texto">Buscar por palabra</label>
      <input type="search" id="filtro-texto" value="${esc(filtros.texto)}">
    </div>
    <div class="campo">
      <label for="filtro-tipo">Tipo</label>
      <select id="filtro-tipo">
        <option value="">Todos</option>
        ${Object.entries(TIPOS).map(([v, t]) => `<option value="${v}"${filtros.tipo === v ? ' selected' : ''}>${esc(t)}</option>`).join('')}
      </select>
    </div>
    <div class="campo">
      <label for="filtro-pais">País</label>
      <select id="filtro-pais">
        <option value="">Todos</option>
        ${paises.map(p => `<option value="${esc(p)}"${filtros.pais === p ? ' selected' : ''}>${esc(p)}</option>`).join('')}
      </select>
    </div>
    <div class="campo">
      <label for="filtro-retorica">Retórica principal</label>
      <select id="filtro-retorica">
        <option value="">Todas</option>
        ${Object.entries(RETORICA_PRINCIPAL).map(([v, t]) => `<option value="${v}"${filtros.retorica === v ? ' selected' : ''}>${esc(t)}</option>`).join('')}
        <option value="sin"${filtros.retorica === 'sin' ? ' selected' : ''}>Sin analizar</option>
      </select>
    </div>
  </div>
  <p id="conteo" role="status"></p>
  <ul class="lista-casos" id="lista-casos"></ul>`;

  document.getElementById('contenido').innerHTML = html;
  // El ancho se pone desde aquí porque la política de seguridad bloquea estilos dentro del HTML.
  document.querySelectorAll('.barra').forEach(b => { b.style.width = b.dataset.pct + '%'; });
  pintarLista();

  ['texto', 'tipo', 'pais', 'retorica'].forEach(f => {
    const el = document.getElementById('filtro-' + f);
    el.addEventListener(f === 'texto' ? 'input' : 'change', () => {
      filtros[f] = el.value;
      pintarLista();
    });
  });
  const exp = document.getElementById('exportar-todas');
  if (exp) exp.addEventListener('click', exportarTodasMarkdown);
}

function casosFiltrados() {
  const texto = filtros.texto.trim().toLowerCase();
  return datos.casos.filter(c => {
    if (filtros.tipo && c.tipo !== filtros.tipo) return false;
    if (filtros.pais && c.pais.trim() !== filtros.pais) return false;
    if (filtros.retorica) {
      const r = retoricaPrincipal(c) || 'sin';
      if (r !== filtros.retorica) return false;
    }
    if (texto) {
      const todo = [c.titulo, c.medio, c.descripcion, c.conclusion.texto].join(' ').toLowerCase();
      if (!todo.includes(texto)) return false;
    }
    return true;
  });
}

function pintarLista() {
  const lista = casosFiltrados()
    .slice()
    .sort((a, b) => b.modificado.localeCompare(a.modificado));
  document.getElementById('conteo').textContent =
    `Mostrando ${lista.length} de ${datos.casos.length} ${datos.casos.length === 1 ? 'caso' : 'casos'}.`;

  document.getElementById('lista-casos').innerHTML = lista.map(c => {
    const titulo = c.titulo.trim() || '(sin título)';
    const meta = [TIPOS[c.tipo] || 'Sin tipo', c.medio.trim(), fechaLegible(c), c.pais.trim()].filter(Boolean);
    return `<li>
      <article class="tarjeta" aria-labelledby="t-${c.id}">
        <h3 id="t-${c.id}"><a href="#/ficha/${c.id}">${esc(titulo)}</a></h3>
        <p class="meta">${meta.map(esc).join(' · ')}</p>
        <p class="meta">
          Retórica principal: ${esc(nombreRetoricaPrincipal(c))} ·
          Inspiration porn: ${esc(textoSenales(senalesInspiracion(c)))} ·
          Conclusión: ${esc(CONCLUSION[c.conclusion.respuesta] || 'sin responder')}
        </p>
        <p><a class="boton" href="#/caso/${c.id}/paso/1">Editar análisis<span class="sr"> de «${esc(titulo)}»</span></a></p>
      </article>
    </li>`;
  }).join('');
}

function calcularResumen(casos) {
  const principal = {};
  Object.keys(RETORICA_PRINCIPAL).forEach(k => { principal[k] = 0; });
  principal.sin = 0;
  const presencia = {};
  RETORICAS.forEach(r => { presencia[r.id] = 0; });
  const conclusiones = { si: 0, no: 0, enparte: 0, sin: 0 };

  casos.forEach(c => {
    principal[retoricaPrincipal(c) || 'sin']++;
    RETORICAS.forEach(r => {
      const n = c.retoricas[r.id].nivel;
      if (n === 'poco' || n === 'mucho') presencia[r.id]++;
    });
    conclusiones[c.conclusion.respuesta || 'sin']++;
  });
  return { total: casos.length, principal, presencia, conclusiones };
}

function retoricaMasFrecuente(r) {
  let max = 0;
  let ganadoras = [];
  RETORICAS.forEach(x => {
    const n = r.principal[x.id];
    if (n > max) { max = n; ganadoras = [x.nombre]; }
    else if (n === max && n > 0) ganadoras.push(x.nombre);
  });
  if (!max) return 'Todavía no hay suficientes casos analizados para saberlo.';
  const nombres = ganadoras.join(' y ');
  return ganadoras.length === 1
    ? `La retórica principal que más aparece es la ${nombres.toLowerCase()} (${max} ${max === 1 ? 'caso' : 'casos'}).`
    : `Hay empate entre ${nombres.toLowerCase()} (${max} ${max === 1 ? 'caso' : 'casos'} cada una).`;
}

function filaBarra(nombre, n, total) {
  const pct = total ? Math.round((n / total) * 100) : 0;
  return `<tr>
    <th scope="row">${esc(nombre)}</th>
    <td>${n} (${pct} %)</td>
    <td class="barra-celda"><div class="barra" data-pct="${pct}" aria-hidden="true"></div></td>
  </tr>`;
}

function htmlResumen(casos) {
  const r = calcularResumen(casos);
  let html = `<h2>Resumen</h2>
  <p>Tienes <strong>${r.total} ${r.total === 1 ? 'caso' : 'casos'}</strong>. ${esc(retoricaMasFrecuente(r))}</p>

  <h3>Retórica principal de cada caso</h3>
  <div class="tabla-envoltura"><table>
    <thead><tr><th scope="col">Retórica</th><th scope="col">Casos</th><th scope="col"><span class="sr">Barra</span></th></tr></thead>
    <tbody>
      ${Object.entries(RETORICA_PRINCIPAL).map(([k, t]) => filaBarra(t, r.principal[k], r.total)).join('')}
      ${r.principal.sin ? filaBarra('Sin analizar', r.principal.sin, r.total) : ''}
    </tbody>
  </table></div>

  <h3>En cuántos casos aparece cada retórica (un poco o mucho)</h3>
  <p class="ayuda">Como las retóricas se mezclan, un mismo caso puede contar en varias filas.</p>
  <div class="tabla-envoltura"><table>
    <thead><tr><th scope="col">Retórica</th><th scope="col">Casos</th><th scope="col"><span class="sr">Barra</span></th></tr></thead>
    <tbody>${RETORICAS.map(x => filaBarra(x.nombre, r.presencia[x.id], r.total)).join('')}</tbody>
  </table></div>

  <h3>Conclusiones</h3>
  <p class="ayuda">Respuesta a: «${esc(PREGUNTA_CONCLUSION)}»</p>
  <div class="tabla-envoltura"><table>
    <thead><tr><th scope="col">Respuesta</th><th scope="col">Casos</th><th scope="col"><span class="sr">Barra</span></th></tr></thead>
    <tbody>
      ${filaBarra('Sí', r.conclusiones.si, r.total)}
      ${filaBarra('En parte', r.conclusiones.enparte, r.total)}
      ${filaBarra('No', r.conclusiones.no, r.total)}
      ${r.conclusiones.sin ? filaBarra('Sin responder', r.conclusiones.sin, r.total) : ''}
    </tbody>
  </table></div>`;
  return html;
}

function avisoCopia() {
  if (!datos.casos.length) return '';
  const ultima = datos.ultimaCopia ? new Date(datos.ultimaCopia) : null;
  const dias = ultima ? (Date.now() - ultima) / 86400000 : Infinity;
  if (dias < 7) return '';
  const texto = ultima
    ? `Tu última copia de seguridad fue el ${fechaHora(datos.ultimaCopia)}.`
    : 'Todavía no has hecho ninguna copia de seguridad.';
  return `<div class="nota" role="note"><p>${esc(texto)} <a href="#/copia">Haz una copia ahora</a> para no perder tu trabajo.</p></div>`;
}

/* ===== Vista: Editor paso a paso ===== */

function vistaEditor(c, paso) {
  const titulo = c.titulo.trim() || '(sin título)';
  document.title = `Paso ${paso}: ${PASOS[paso - 1]} · ${titulo}`;

  const contenidoPaso = [paso1, paso2, paso3, paso4, paso5][paso - 1](c);
  const anterior = paso > 1
    ? `<a class="boton" href="#/caso/${c.id}/paso/${paso - 1}">← Anterior: ${esc(PASOS[paso - 2])}</a>`
    : `<a class="boton" href="#/casos">← Volver a mis casos</a>`;
  const siguiente = paso < PASOS.length
    ? `<a class="boton primario" href="#/caso/${c.id}/paso/${paso + 1}">Siguiente: ${esc(PASOS[paso])} →</a>`
    : `<a class="boton primario" href="#/ficha/${c.id}">Ver la ficha →</a>`;

  document.getElementById('contenido').innerHTML = `
    <h1>Analizar: <span id="titulo-caso">${esc(titulo)}</span></h1>
    <nav aria-label="Pasos del análisis">
      <ol class="pasos">
        ${PASOS.map((p, i) => `<li><a href="#/caso/${c.id}/paso/${i + 1}"${i + 1 === paso ? ' aria-current="step"' : ''}>${i + 1}. ${esc(p)}</a></li>`).join('')}
      </ol>
    </nav>
    <p class="ayuda">Todo se guarda automáticamente mientras escribes. Puedes dejar el caso a medias y seguir otro día.</p>
    <form id="form-paso" data-caso="${c.id}" novalidate>
      ${contenidoPaso}
    </form>
    <div class="navegacion-pasos">${anterior}${siguiente}</div>`;
}

function paso1(c) {
  return `<h2 id="foco" tabindex="-1">Paso 1 de 5: Datos del caso</h2>
  <p>Describe la pieza que vas a analizar. Escribe sobre la pieza, no datos privados de las personas que aparecen.</p>
  ${campo({ ruta: 'titulo', etiqueta: 'Título del caso', valor: c.titulo, ayuda: 'El título de la noticia, campaña, post o video.' })}
  ${seleccion({ ruta: 'tipo', etiqueta: 'Tipo de pieza', opciones: TIPOS, valor: c.tipo, vacio: 'Elige un tipo' })}
  ${campo({ ruta: 'medio', etiqueta: 'Medio o autor', valor: c.medio, ayuda: 'Por ejemplo: El Universo, Primicias, un ministerio, una cuenta de Instagram, YouTube.' })}
  ${campo({ ruta: 'fecha', etiqueta: 'Fecha de publicación', tipo: 'date', valor: c.fecha, ayuda: 'Si no sabes el día exacto, déjala vacía y escribe solo el año en el campo siguiente.' })}
  ${campo({ ruta: 'anioSolo', etiqueta: 'Año (solo si no sabes la fecha exacta)', valor: c.anioSolo, extra: 'inputmode="numeric" autocomplete="off"' })}
  ${campo({ ruta: 'pais', etiqueta: 'País', valor: c.pais, lista: 'lista-paises' })}
  <datalist id="lista-paises">${PAISES.map(p => `<option value="${esc(p)}">`).join('')}</datalist>
  ${campo({ ruta: 'enlace', etiqueta: 'Enlace', tipo: 'url', valor: c.enlace, ayuda: 'Copia la dirección completa. Empieza con https://', extra: 'autocomplete="off" spellcheck="false"' })}
  ${campo({ ruta: 'descripcion', etiqueta: 'Descripción con tus palabras', valor: c.descripcion, multilinea: true, ayuda: '¿Qué se ve, qué se escucha, qué se dice? Descríbelo sin juzgar todavía.' })}

  <fieldset>
    <legend>Referencia APA 7</legend>
    <p class="ayuda">La app arma un borrador con los datos de arriba. Revísalo siempre: los casos especiales tienen reglas propias.</p>
    ${campo({ ruta: 'apa.autor', etiqueta: 'Autor para la referencia', valor: c.apa.autor, ayuda: 'Formato APA: Apellido, A. A. (por ejemplo: Pérez, M. J.). Si es una institución, escribe su nombre completo. Si no hay autor, déjalo vacío.' })}
    <p><strong>Borrador de la referencia:</strong></p>
    <p class="borrador-apa" id="apa-vista">${cursivas(referenciaAPA(c))}</p>
    ${campo({ ruta: 'apa.manual', etiqueta: 'Referencia corregida a mano (opcional)', valor: c.apa.manual, multilinea: true, ayuda: 'Si escribes aquí, la ficha usará este texto en vez del borrador. Usa *asteriscos* para la cursiva.' })}
  </fieldset>`;
}

function paso2(c) {
  const sugerida = retoricaSugerida(c);
  return `<h2 id="foco" tabindex="-1">Paso 2 de 5: Retóricas visuales</h2>
  <p>Según Rosemarie Garland-Thomson, hay cuatro maneras frecuentes de mostrar la discapacidad. Para cada una, lee las preguntas guía y elige cuánto aparece.</p>
  <div class="nota" role="note">
    <p><strong>Recuerda:</strong> las retóricas se mezclan. Una misma pieza puede tener varias a la vez.</p>
    <p>Ninguna es automáticamente buena, <strong>tampoco la realista</strong>.</p>
  </div>
  ${RETORICAS.map(r => `
    <section class="retorica" aria-labelledby="r-${r.id}">
      <h3 id="r-${r.id}">${esc(r.nombre)}</h3>
      <p>${esc(r.resumen)}</p>
      <p><strong>Preguntas guía:</strong></p>
      <ul>${r.preguntas.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      ${grupoRadios({ ruta: `retoricas.${r.id}.nivel`, leyenda: `¿Cuánto aparece la retórica ${r.nombre.toLowerCase()}?`, opciones: NIVELES, valor: c.retoricas[r.id].nivel })}
      ${campo({ ruta: `retoricas.${r.id}.nota`, etiqueta: `Tu nota sobre la retórica ${r.nombre.toLowerCase()}`, valor: c.retoricas[r.id].nota, multilinea: true, ayuda: 'Anota lo que viste: un plano, una frase, la música, el minuto del video.' })}
    </section>`).join('')}

  <section class="retorica" aria-labelledby="r-principal">
    <h3 id="r-principal">Retórica principal</h3>
    <p>Sirve para filtrar tus casos. La app sugiere una según tus respuestas; tú decides.</p>
    <p id="retorica-sugerida">${esc(textoSugerencia(sugerida))}</p>
    ${seleccion({ ruta: 'retoricaPrincipal', etiqueta: 'Retórica principal de este caso', opciones: RETORICA_PRINCIPAL, valor: c.retoricaPrincipal, vacio: 'Usar la sugerencia de la app' })}
  </section>`;
}

function textoSugerencia(sugerida) {
  return sugerida
    ? `Sugerencia de la app: ${RETORICA_PRINCIPAL[sugerida]}.`
    : 'Sugerencia de la app: todavía no hay respuestas.';
}

function paso3(c) {
  return `<h2 id="foco" tabindex="-1">Paso 3 de 5: Test de inspiration porn</h2>
  <p>Basado en Stella Young y Jan Grue. Responde cada pregunta y justifica tu respuesta con algo concreto de la pieza.</p>
  <div class="nota" role="note">
    <p>En todas las preguntas, <strong>«Sí» significa una señal</strong> de inspiration porn.</p>
    <p>El conteo de señales no es un veredicto: la conclusión la escribes tú en el paso 5.</p>
  </div>
  ${PREGUNTAS_INSPIRACION.map((p, i) => `
    <section class="pregunta" aria-labelledby="ip-${p.id}">
      <h3 id="ip-${p.id}">Pregunta ${i + 1} de ${PREGUNTAS_INSPIRACION.length}</h3>
      ${grupoRadios({ ruta: `inspiracion.${p.id}.resp`, leyenda: p.texto, opciones: SI_NO_NOSE, valor: c.inspiracion[p.id].resp })}
      ${campo({ ruta: `inspiracion.${p.id}.just`, etiqueta: `Justificación de la pregunta ${i + 1}`, valor: c.inspiracion[p.id].just, multilinea: true, ayuda: '¿Qué en la pieza te hace responder así?' })}
    </section>`).join('')}`;
}

function paso4(c) {
  const aplica = c.proteccion.aplica;
  let html = `<h2 id="foco" tabindex="-1">Paso 4 de 5: Test de protección</h2>
  <p>Úsalo solo si el caso trata de proteger a la persona: prohibirle algo, decidir por ella o “cuidarla” de un riesgo.</p>
  <div class="casilla">
    <input type="checkbox" id="f-proteccion-aplica" data-ruta="proteccion.aplica" data-recargar${aplica ? ' checked' : ''}>
    <label for="f-proteccion-aplica">Este caso trata sobre protección</label>
  </div>`;
  if (!aplica) {
    return html + `<p>Si no aplica, pasa al siguiente paso. Si marcas la casilla, aparecerán las preguntas.</p>`;
  }
  html += PREGUNTAS_PROTECCION.map((p, i) => {
    const r = c.proteccion[p.id];
    const etiquetaTexto = p.opciones ? `Explica la respuesta de la pregunta ${i + 1}` : `Respuesta de la pregunta ${i + 1}`;
    return `<section class="pregunta" aria-labelledby="pr-${p.id}">
      <h3 id="pr-${p.id}">Pregunta ${i + 1} de ${PREGUNTAS_PROTECCION.length}</h3>
      ${p.opciones
        ? grupoRadios({ ruta: `proteccion.${p.id}.resp`, leyenda: p.texto, opciones: p.opciones, valor: r.resp })
        : `<p><strong>${esc(p.texto)}</strong></p>`}
      ${campo({ ruta: `proteccion.${p.id}.just`, etiqueta: etiquetaTexto, valor: r.just, multilinea: true, ayuda: p.ayuda })}
    </section>`;
  }).join('');
  return html;
}

function paso5(c) {
  const s = senalesInspiracion(c);
  const ps = senalesProteccion(c);
  return `<h2 id="foco" tabindex="-1">Paso 5 de 5: Conclusión</h2>
  <div class="nota" role="note">
    <p><strong>Lo que respondiste antes:</strong></p>
    <p>Retórica principal: ${esc(nombreRetoricaPrincipal(c))}.</p>
    <p>Inspiration porn: ${esc(textoSenales(s))}.</p>
    <p>Protección: ${c.proteccion.aplica ? esc(`${ps.si} de ${ps.total} señales de protección excesiva`) : 'no aplica'}.</p>
  </div>
  ${grupoRadios({ ruta: 'conclusion.respuesta', leyenda: PREGUNTA_CONCLUSION, opciones: CONCLUSION, valor: c.conclusion.respuesta })}
  ${campo({ ruta: 'conclusion.texto', etiqueta: 'Tu conclusión', valor: c.conclusion.texto, multilinea: true, ayuda: 'Explica tu respuesta con lo que encontraste en los pasos anteriores.', extra: 'rows="8"' })}
  ${campo({ ruta: 'conclusion.noEncaja', etiqueta: '¿Qué hay en este caso que no encaja con tu tesis? (opcional)', valor: c.conclusion.noEncaja, multilinea: true, ayuda: 'Los casos que no encajan también son resultados. Hacen tu método más fuerte, no más débil.' })}
  ${campo({ ruta: 'conclusion.critica', etiqueta: '¿Qué te podrían criticar?', valor: c.conclusion.critica, multilinea: true, ayuda: 'Por ejemplo: ¿estás suponiendo la intención de quien hizo la pieza? ¿Sabes qué opina la persona mostrada?' })}`;
}

// Guarda cada cambio del formulario en el caso.
function alEditar(evento) {
  const el = evento.target;
  const form = el.closest('#form-paso');
  if (!form || !el.dataset.ruta) return;
  const c = buscarCaso(form.dataset.caso);
  if (!c) return;

  const valor = el.type === 'checkbox' ? el.checked : el.value;
  asignar(c, el.dataset.ruta, valor);
  c.modificado = ahora();

  if (evento.type === 'change') guardarYa();
  else guardarPronto();

  // Actualiza las partes que dependen de lo escrito.
  const apa = document.getElementById('apa-vista');
  if (apa) apa.innerHTML = cursivas(referenciaAPA(c));
  const sug = document.getElementById('retorica-sugerida');
  if (sug) sug.textContent = textoSugerencia(retoricaSugerida(c));
  if (el.dataset.ruta === 'titulo') {
    document.getElementById('titulo-caso').textContent = c.titulo.trim() || '(sin título)';
  }

  if (evento.type === 'change' && 'recargar' in el.dataset) {
    const id = el.id;
    render();
    document.getElementById(id).focus();
    anunciar(el.checked ? 'Aparecieron las preguntas del test de protección.' : 'Se ocultaron las preguntas del test de protección.');
  }
}

/* ===== Vista: Ficha ===== */

function vistaFicha(c) {
  const titulo = c.titulo.trim() || '(sin título)';
  document.title = `Ficha: ${titulo}`;
  document.getElementById('contenido').innerHTML = `
    <div class="acciones">
      <a class="boton" href="#/casos">← Mis casos</a>
      <a class="boton" href="#/caso/${c.id}/paso/1">Editar análisis</a>
      <button type="button" id="descargar-md" class="primario">Descargar ficha (Markdown)</button>
      <button type="button" id="copiar-md">Copiar ficha en Markdown</button>
      <button type="button" id="imprimir">Imprimir</button>
      <button type="button" id="eliminar" class="peligro">Eliminar caso</button>
    </div>
    ${fichaHTML(c)}`;

  document.getElementById('descargar-md').addEventListener('click', () => {
    descargar(`ficha-${nombreArchivo(titulo)}.md`, fichaMarkdown(c, 1), 'text/markdown');
    anunciar('Se descargó la ficha. Búscala en tu carpeta de Descargas.');
  });
  document.getElementById('copiar-md').addEventListener('click', async () => {
    const ok = await copiar(fichaMarkdown(c, 1));
    anunciar(ok ? 'Ficha copiada. Ya puedes pegarla en tu documento.' : 'No se pudo copiar. Usa «Descargar ficha».');
  });
  document.getElementById('imprimir').addEventListener('click', () => window.print());
  document.getElementById('eliminar').addEventListener('click', () => {
    if (!confirm(`¿Eliminar el caso «${titulo}»? Esto no se puede deshacer (a menos que tengas una copia de seguridad).`)) return;
    datos.casos = datos.casos.filter(x => x.id !== c.id);
    guardarYa();
    location.hash = '#/casos';
    anunciar(`Se eliminó el caso «${titulo}».`);
  });
}

function fichaHTML(c) {
  const titulo = c.titulo.trim() || '(sin título)';
  const s = senalesInspiracion(c);
  const ps = senalesProteccion(c);
  const enlace = c.enlace.trim();
  const enlaceHTML = !enlace
    ? '<span class="vacio">Sin enlace</span>'
    : esEnlaceSeguro(enlace)
      ? `<a href="${esc(enlace)}" rel="noopener noreferrer" target="_blank">${esc(enlace)}<span class="sr"> (se abre en otra pestaña)</span></a>`
      : esc(enlace);

  let html = `<article class="ficha" aria-labelledby="foco">
  <h1 id="foco" tabindex="-1">${esc(titulo)}</h1>
  <dl class="datos">
    <dt>Tipo</dt><dd>${esc(TIPOS[c.tipo] || 'Sin tipo')}</dd>
    <dt>Medio o autor</dt><dd>${esc(c.medio.trim() || '—')}</dd>
    <dt>Fecha</dt><dd>${esc(fechaLegible(c))}</dd>
    <dt>País</dt><dd>${esc(c.pais.trim() || '—')}</dd>
    <dt>Enlace</dt><dd>${enlaceHTML}</dd>
    <dt>Última edición</dt><dd>${esc(fechaHora(c.modificado))}</dd>
  </dl>

  <h2>Descripción</h2>
  ${textoLibre(c.descripcion)}

  <h2>Referencia APA 7</h2>
  <p class="borrador-apa">${cursivas(referenciaAPA(c))}</p>
  ${c.apa.manual.trim() ? '' : '<p class="ayuda">Borrador automático: revísalo antes de usarlo.</p>'}

  <h2>Retóricas visuales</h2>
  <p><strong>Retórica principal:</strong> ${esc(nombreRetoricaPrincipal(c))}${c.retoricaPrincipal ? '' : ' (sugerida por la app)'}</p>
  <div class="tabla-envoltura"><table>
    <thead><tr><th scope="col">Retórica</th><th scope="col">Nivel</th><th scope="col">Nota</th></tr></thead>
    <tbody>
      ${RETORICAS.map(r => {
        const x = c.retoricas[r.id];
        return `<tr><th scope="row">${esc(r.nombre)}</th><td>${esc(NIVELES[x.nivel] || 'Sin responder')}</td><td class="texto-libre">${esc(x.nota.trim()) || '<span class="vacio">—</span>'}</td></tr>`;
      }).join('')}
    </tbody>
  </table></div>

  <h2>Test de inspiration porn</h2>
  <p><strong>${esc(textoSenales(s))}.</strong> «Sí» = señal.</p>
  <div class="tabla-envoltura"><table>
    <thead><tr><th scope="col">Pregunta</th><th scope="col">Respuesta</th><th scope="col">Justificación</th></tr></thead>
    <tbody>
      ${PREGUNTAS_INSPIRACION.map(p => {
        const x = c.inspiracion[p.id];
        return `<tr><th scope="row">${esc(p.texto)}</th><td>${esc(SI_NO_NOSE[x.resp] || 'Sin responder')}</td><td class="texto-libre">${esc(x.just.trim()) || '<span class="vacio">—</span>'}</td></tr>`;
      }).join('')}
    </tbody>
  </table></div>

  <h2>Test de protección</h2>`;

  if (!c.proteccion.aplica) {
    html += '<p>No aplica a este caso.</p>';
  } else {
    html += `<p><strong>${ps.si} de ${ps.total} señales de protección excesiva.</strong></p>
    <div class="tabla-envoltura"><table>
      <thead><tr><th scope="col">Pregunta</th><th scope="col">Respuesta</th><th scope="col">Explicación</th></tr></thead>
      <tbody>
        ${PREGUNTAS_PROTECCION.map(p => {
          const x = c.proteccion[p.id];
          const resp = p.opciones ? (p.opciones[x.resp] || 'Sin responder') : '—';
          return `<tr><th scope="row">${esc(p.texto)}</th><td>${esc(resp)}</td><td class="texto-libre">${esc(x.just.trim()) || '<span class="vacio">—</span>'}</td></tr>`;
        }).join('')}
      </tbody>
    </table></div>`;
  }

  html += `<h2>Conclusión</h2>
  <p><strong>${esc(PREGUNTA_CONCLUSION)}</strong></p>
  <p>Respuesta: <strong>${esc(CONCLUSION[c.conclusion.respuesta] || 'Sin responder')}</strong></p>
  ${textoLibre(c.conclusion.texto, 'Todavía no escribiste la conclusión.')}
  <h3>Lo que no encaja con mi tesis</h3>
  ${textoLibre(c.conclusion.noEncaja, 'Nada anotado.')}
  <h3>Qué me podrían criticar</h3>
  ${textoLibre(c.conclusion.critica, 'Nada anotado.')}
  </article>`;
  return html;
}

/* ===== Markdown ===== */

// Texto en una sola línea, para listas de Markdown.
function md1(s, vacio = '—') {
  const t = String(s || '').trim().replace(/\s*\n+\s*/g, ' ');
  return t || vacio;
}

function mdParrafo(s, vacio) {
  const t = String(s || '').trim();
  return t ? t.replace(/\n{3,}/g, '\n\n') : `_${vacio}_`;
}

function fichaMarkdown(c, nivel) {
  const h = n => '#'.repeat(nivel + n);
  const titulo = c.titulo.trim() || '(sin título)';
  const s = senalesInspiracion(c);
  const ps = senalesProteccion(c);
  const l = [];

  l.push(`${h(0)} ${titulo}`, '');
  l.push(`- **Tipo:** ${TIPOS[c.tipo] || 'Sin tipo'}`);
  l.push(`- **Medio o autor:** ${md1(c.medio)}`);
  l.push(`- **Fecha:** ${fechaLegible(c)}`);
  l.push(`- **País:** ${md1(c.pais)}`);
  l.push(`- **Enlace:** ${md1(c.enlace, 'Sin enlace')}`, '');

  l.push(`${h(1)} Descripción`, '', mdParrafo(c.descripcion, 'Sin escribir.'), '');
  l.push(`${h(1)} Referencia APA 7`, '', referenciaAPA(c), '');

  l.push(`${h(1)} Retóricas visuales`, '');
  l.push(`**Retórica principal:** ${nombreRetoricaPrincipal(c)}${c.retoricaPrincipal ? '' : ' (sugerida por la app)'}`, '');
  RETORICAS.forEach(r => {
    const x = c.retoricas[r.id];
    l.push(`- **${r.nombre}:** ${NIVELES[x.nivel] || 'Sin responder'}. ${md1(x.nota, '')}`.trimEnd());
  });
  l.push('');

  l.push(`${h(1)} Test de inspiration porn`, '');
  l.push(`**${textoSenales(s)}.** («Sí» = señal)`, '');
  PREGUNTAS_INSPIRACION.forEach((p, i) => {
    const x = c.inspiracion[p.id];
    l.push(`${i + 1}. ${p.texto} **${SI_NO_NOSE[x.resp] || 'Sin responder'}.** ${md1(x.just, '')}`.trimEnd());
  });
  l.push('');

  l.push(`${h(1)} Test de protección`, '');
  if (!c.proteccion.aplica) {
    l.push('No aplica a este caso.', '');
  } else {
    l.push(`**${ps.si} de ${ps.total} señales de protección excesiva.**`, '');
    PREGUNTAS_PROTECCION.forEach((p, i) => {
      const x = c.proteccion[p.id];
      const resp = p.opciones ? ` **${p.opciones[x.resp] || 'Sin responder'}.**` : '';
      l.push(`${i + 1}. ${p.texto}${resp} ${md1(x.just, '')}`.trimEnd());
    });
    l.push('');
  }

  l.push(`${h(1)} Conclusión`, '');
  l.push(`**${PREGUNTA_CONCLUSION}** ${CONCLUSION[c.conclusion.respuesta] || 'Sin responder'}.`, '');
  l.push(mdParrafo(c.conclusion.texto, 'Todavía no escribí la conclusión.'), '');
  l.push(`${h(2)} Lo que no encaja con mi tesis`, '', mdParrafo(c.conclusion.noEncaja, 'Nada anotado.'), '');
  l.push(`${h(2)} Qué me podrían criticar`, '', mdParrafo(c.conclusion.critica, 'Nada anotado.'), '');

  return l.join('\n');
}

function resumenMarkdown(casos) {
  const r = calcularResumen(casos);
  const pct = n => (r.total ? Math.round((n / r.total) * 100) : 0);
  const l = [];
  l.push('## Resumen', '');
  l.push(`Total de casos: ${r.total}. ${retoricaMasFrecuente(r)}`, '');
  l.push('**Retórica principal de cada caso:**', '');
  Object.entries(RETORICA_PRINCIPAL).forEach(([k, t]) => l.push(`- ${t}: ${r.principal[k]} (${pct(r.principal[k])} %)`));
  if (r.principal.sin) l.push(`- Sin analizar: ${r.principal.sin} (${pct(r.principal.sin)} %)`);
  l.push('', '**En cuántos casos aparece cada retórica (un poco o mucho):**', '');
  RETORICAS.forEach(x => l.push(`- ${x.nombre}: ${r.presencia[x.id]} (${pct(r.presencia[x.id])} %)`));
  l.push('', '**Conclusiones:**', '');
  l.push(`- Sí: ${r.conclusiones.si}`, `- En parte: ${r.conclusiones.enparte}`, `- No: ${r.conclusiones.no}`);
  if (r.conclusiones.sin) l.push(`- Sin responder: ${r.conclusiones.sin}`);
  l.push('');
  return l.join('\n');
}

function exportarTodasMarkdown() {
  const casos = datos.casos.slice().sort((a, b) => (a.titulo || '').localeCompare(b.titulo || '', 'es'));
  const partes = [
    '# Casos analizados',
    '',
    `Exportado el ${fechaHora(ahora())}.`,
    '',
    resumenMarkdown(casos),
    ...casos.map(c => '---\n\n' + fichaMarkdown(c, 2))
  ];
  descargar(`casos-analizados-${hoyArchivo()}.md`, partes.join('\n'), 'text/markdown');
  anunciar(`Se descargaron ${casos.length} fichas. Búscalas en tu carpeta de Descargas.`);
}

/* ===== Archivos ===== */

function nombreArchivo(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'caso';
}

function hoyArchivo() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function descargar(nombre, contenido, tipo) {
  const blob = new Blob([contenido], { type: tipo + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

async function copiar(texto) {
  const activo = document.activeElement;
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
    ta.remove();
    if (activo) activo.focus();
    return ok;
  }
}

/* ===== Vista: Copia de seguridad ===== */

function vistaCopia() {
  document.title = 'Copia de seguridad · Analizador de representaciones';
  const ultima = datos.ultimaCopia ? fechaHora(datos.ultimaCopia) : 'nunca';
  document.getElementById('contenido').innerHTML = `
    <h1 id="foco" tabindex="-1">Copia de seguridad</h1>
    <p>Tus casos se guardan solo en este navegador. Si borras el historial o cambias de computadora, se pierden.
    Por eso conviene descargar una copia de seguridad cada semana y guardarla en un pendrive o en tu correo.</p>
    <p><strong>Última copia de seguridad:</strong> ${esc(ultima)}.</p>

    <h2>Guardar una copia</h2>
    <p>Descarga un archivo <code>.json</code> con todos tus casos (${datos.casos.length}).</p>
    <div class="acciones">
      <button type="button" id="exportar-json" class="primario">Descargar copia de seguridad</button>
    </div>

    <h2>Recuperar una copia</h2>
    <p>Elige un archivo <code>.json</code> que hayas descargado antes con esta app.</p>
    ${grupoRadiosSimple('modo-importar', '¿Qué hacer con los casos que ya tienes?', {
      combinar: 'Combinar: conservar mis casos y agregar los del archivo',
      reemplazar: 'Reemplazar: borrar mis casos y quedarme solo con los del archivo'
    }, 'combinar')}
    <div class="campo">
      <label for="importar-json">Archivo de copia de seguridad</label>
      <input type="file" id="importar-json" accept=".json,application/json">
    </div>`;

  document.getElementById('exportar-json').addEventListener('click', exportarJSON);
  document.getElementById('importar-json').addEventListener('change', importarJSON);
}

function grupoRadiosSimple(nombre, leyenda, opciones, valor) {
  return `<fieldset>
    <legend>${esc(leyenda)}</legend>
    <div class="opciones">
      ${Object.entries(opciones).map(([v, t]) => `
        <label class="opcion"><input type="radio" name="${nombre}" value="${v}"${v === valor ? ' checked' : ''}> ${esc(t)}</label>`).join('')}
    </div>
  </fieldset>`;
}

function exportarJSON() {
  datos.ultimaCopia = ahora();
  guardarYa();
  const contenido = JSON.stringify({
    app: 'analizador-de-representaciones',
    version: 1,
    exportado: datos.ultimaCopia,
    casos: datos.casos
  }, null, 2);
  descargar(`copia-analizador-${hoyArchivo()}.json`, contenido, 'application/json');
  vistaCopia();
  enfocarTitulo();
  anunciar('Se descargó la copia de seguridad. Búscala en tu carpeta de Descargas y guárdala en un lugar seguro.');
}

function importarJSON(evento) {
  const archivo = evento.target.files[0];
  if (!archivo) return;
  const modo = document.querySelector('input[name="modo-importar"]:checked').value;
  const lector = new FileReader();
  lector.onload = () => {
    let obj;
    try {
      obj = JSON.parse(lector.result);
    } catch (e) {
      anunciar('Ese archivo no es una copia de seguridad válida (no se pudo leer).', true);
      return;
    }
    const lista = Array.isArray(obj) ? obj : obj && Array.isArray(obj.casos) ? obj.casos : null;
    if (!lista) {
      anunciar('Ese archivo no parece una copia de seguridad de esta app.', true);
      return;
    }
    const nuevos = lista.filter(x => x && typeof x === 'object').map(normalizar);

    if (modo === 'reemplazar') {
      if (!confirm(`Se borrarán tus ${datos.casos.length} casos actuales y quedarán los ${nuevos.length} del archivo. ¿Continuar?`)) {
        evento.target.value = '';
        return;
      }
      datos.casos = nuevos;
    } else {
      // Los casos con el mismo identificador se actualizan con la versión del archivo.
      nuevos.forEach(n => {
        const i = datos.casos.findIndex(c => c.id === n.id);
        if (i >= 0) datos.casos[i] = n;
        else datos.casos.push(n);
      });
    }
    if (guardarYa()) {
      evento.target.value = '';
      anunciar(`Listo: ${nuevos.length === 1 ? 'se recuperó 1 caso' : `se recuperaron ${nuevos.length} casos`}. Ahora tienes ${datos.casos.length} en total.`);
    }
  };
  lector.onerror = () => anunciar('No se pudo leer el archivo.', true);
  lector.readAsText(archivo);
}

/* ===== Vista: Ayuda ===== */

function vistaAyuda() {
  document.title = 'Cómo se usa · Analizador de representaciones';
  document.getElementById('contenido').innerHTML = `
    <h1 id="foco" tabindex="-1">Cómo se usa</h1>
    <h2>Analizar un caso</h2>
    <ol>
      <li>Pulsa <strong>«Nuevo caso»</strong>.</li>
      <li>Sigue los 5 pasos: datos, retóricas, test de inspiration porn, test de protección (si aplica) y conclusión.</li>
      <li>Al final pulsa <strong>«Ver la ficha»</strong>. Desde ahí puedes descargarla o copiarla en Markdown.</li>
    </ol>
    <p>No hace falta un botón de guardar: todo se guarda solo mientras escribes.</p>

    <h2>Usar solo el teclado</h2>
    <ul>
      <li><kbd>Tab</kbd> avanza al siguiente elemento y <kbd>Mayús</kbd> + <kbd>Tab</kbd> retrocede.</li>
      <li>En las opciones (Sí / No / No sé), usa las <kbd>flechas</kbd> para elegir.</li>
      <li><kbd>Enter</kbd> abre enlaces y pulsa botones. La <kbd>barra espaciadora</kbd> marca casillas.</li>
      <li>Los botones <strong>A−</strong> y <strong>A+</strong> de arriba cambian el tamaño de la letra.</li>
    </ul>

    <h2>Privacidad</h2>
    <ul>
      <li>Todo se guarda solo en este navegador, en esta computadora. Nada se envía a internet.</li>
      <li>No se guardan imágenes, solo enlaces.</li>
      <li>Si otra persona usa tu computadora con el mismo navegador, podría ver tus casos.</li>
    </ul>

    <h2>No perder tu trabajo</h2>
    <ul>
      <li>Usa siempre el mismo navegador y no muevas la carpeta de la app.</li>
      <li>Borrar el historial o los “datos de sitios” del navegador borra tus casos.</li>
      <li>Haz una <a href="#/copia">copia de seguridad</a> cada semana.</li>
    </ul>

    <h2>Sobre el método</h2>
    <ul>
      <li>El conteo de señales no decide por ti: es una ayuda para ordenar lo que viste.</li>
      <li>Responde «No sé» cuando no tengas información. Es más honesto que adivinar.</li>
      <li>Analiza también casos que podrían contradecir tu tesis. Un método que solo encuentra lo que esperaba es fácil de criticar.</li>
    </ul>`;
}

function vistaNoEncontrado() {
  document.title = 'No encontrado · Analizador de representaciones';
  document.getElementById('contenido').innerHTML = `
    <h1 id="foco" tabindex="-1">No encontré ese caso</h1>
    <p>Puede que se haya eliminado. <a href="#/casos">Volver a mis casos</a>.</p>`;
}

/* ===== Navegación ===== */

function render() {
  const partes = location.hash.replace(/^#\/?/, '').split('/');
  const vista = partes[0] || 'casos';

  if (vista === 'nuevo') {
    const c = nuevoCaso();
    datos.casos.push(c);
    guardarYa();
    // «replace» evita crear otro caso al pulsar «Atrás».
    location.replace(`#/caso/${c.id}/paso/1`);
    return;
  }

  if (vista === 'caso') {
    const c = buscarCaso(partes[1]);
    const paso = Math.min(Math.max(parseInt(partes[3], 10) || 1, 1), PASOS.length);
    if (c) vistaEditor(c, paso); else vistaNoEncontrado();
  } else if (vista === 'ficha') {
    const c = buscarCaso(partes[1]);
    if (c) vistaFicha(c); else vistaNoEncontrado();
  } else if (vista === 'copia') {
    vistaCopia();
  } else if (vista === 'ayuda') {
    vistaAyuda();
  } else {
    vistaColeccion();
  }

  document.querySelectorAll('.menu a').forEach(a => {
    if (a.dataset.vista === vista) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  if (!almacenamientoDisponible) {
    anunciar('Atención: este navegador no permite guardar datos. Lo que escribas se perderá al cerrar. Prueba con otro navegador.', true);
  }
}

/* ===== Tamaño de letra ===== */

function aplicarLetra(pct) {
  pct = Math.min(Math.max(pct, 80), 200);
  document.documentElement.style.fontSize = pct + '%';
  document.getElementById('letra-valor').textContent = pct + ' %';
  try { localStorage.setItem(CLAVE_LETRA, String(pct)); } catch (e) { /* sin almacenamiento */ }
  return pct;
}

/* ===== Inicio ===== */

function iniciar() {
  try {
    const k = '__prueba__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
  } catch (e) {
    almacenamientoDisponible = false;
  }
  datos = cargar();

  let letra = 100;
  try { letra = parseInt(localStorage.getItem(CLAVE_LETRA), 10) || 100; } catch (e) { /* sin almacenamiento */ }
  letra = aplicarLetra(letra);
  document.getElementById('letra-menos').addEventListener('click', () => { letra = aplicarLetra(letra - 10); });
  document.getElementById('letra-mas').addEventListener('click', () => { letra = aplicarLetra(letra + 10); });

  const main = document.getElementById('contenido');
  main.addEventListener('input', alEditar);
  main.addEventListener('change', alEditar);
  main.addEventListener('submit', e => e.preventDefault());

  document.getElementById('saltar').addEventListener('click', e => {
    e.preventDefault();
    main.focus();
  });

  window.addEventListener('hashchange', () => {
    guardarYa();
    render();
    enfocarTitulo();
  });

  // Si la app está abierta en dos pestañas, mantiene los datos al día.
  window.addEventListener('storage', e => {
    if (e.key !== CLAVE_DATOS) return;
    datos = cargar();
    render();
    anunciar('Los datos cambiaron en otra pestaña. La vista se actualizó.');
  });

  window.addEventListener('beforeunload', () => {
    if (temporizadorGuardado) guardarYa();
  });

  render();
}

iniciar();
