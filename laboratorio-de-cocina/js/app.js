/* =====================================================================
   🧪 Laboratorio de Cocina: lógica de la app
   No necesitas tocar este archivo para agregar recetas: edita los
   archivos de la carpeta datos/.
   ===================================================================== */
(function () {
  "use strict";

  const app = document.getElementById("app");

  /* ---------- Datos ---------- */
  const recetas = typeof RECETAS !== "undefined" && Array.isArray(RECETAS) ? RECETAS : null;
  const glosario = typeof GLOSARIO !== "undefined" && Array.isArray(GLOSARIO) ? GLOSARIO : [];
  const proyecto = typeof PROYECTO !== "undefined" && PROYECTO ? PROYECTO : {};

  const COLORES = ["rosa", "lila", "menta", "durazno", "celeste", "amarillo"];
  const DIFICULTAD = ["", "Fácil", "Media", "Difícil"];

  /* ---------- Utilidades de texto ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Convierte "C6H12O6" en C₆H₁₂O₆ y "H^+" en H⁺ (sobre texto ya escapado).
  function subindices(t) {
    return t
      .replace(/\^(\d*[+\-−])|\^(\d+)/g, function (_, carga, num) {
        return "<sup>" + (carga || num).replace("-", "−") + "</sup>";
      })
      .replace(/([A-Za-z)\]])(\d+)/g, "$1<sub>$2</sub>");
  }

  // Da formato a una fórmula o ecuación completa (flechas incluidas).
  function formula(s) {
    return String(s)
      .split(/(-\[[^\]]*\]->|<=>|->)/)
      .map(function (parte) {
        if (parte === "->") return '<span class="flecha">→</span>';
        if (parte === "<=>") return '<span class="flecha">⇌</span>';
        const m = parte.match(/^-\[([^\]]*)\]->$/);
        if (m) {
          return (
            '<span class="flecha flecha-etiqueta"><span class="sobre-flecha">' +
            esc(m[1]) +
            "</span>→</span>"
          );
        }
        return subindices(esc(parte));
      })
      .join("");
  }

  // Texto normal: escapa todo y da formato a lo que esté entre {llaves}.
  function fmt(s) {
    return String(s == null ? "" : s)
      .split(/\{([^}]+)\}/)
      .map(function (parte, i) {
        return i % 2 ? '<span class="formula">' + formula(parte) + "</span>" : esc(parte);
      })
      .join("");
  }

  function normalizar(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function colorDe(r) {
    return COLORES.indexOf(r.color) >= 0 ? r.color : "rosa";
  }

  function estrellas(n) {
    n = Math.max(1, Math.min(3, Number(n) || 1));
    let s = "";
    for (let i = 1; i <= 3; i++) s += '<span class="' + (i <= n ? "llena" : "vacia") + '">★</span>';
    return (
      '<span class="estrellas" role="img" aria-label="Dificultad: ' +
      DIFICULTAD[n] +
      '">' +
      s +
      "</span>"
    );
  }

  function duracion(seg) {
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    const s = seg % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return h ? h + ":" + mm + ":" + ss : mm + ":" + ss;
  }

  function guardar(clave, valor) {
    try {
      localStorage.setItem("lab-cocina:" + clave, JSON.stringify(valor));
    } catch (e) {
      /* sin almacenamiento: no pasa nada */
    }
  }
  function leer(clave) {
    try {
      return JSON.parse(localStorage.getItem("lab-cocina:" + clave));
    } catch (e) {
      return null;
    }
  }

  /* ---------- Revisión de datos (ayuda al agregar recetas) ---------- */
  function revisarRecetas() {
    const ids = {};
    recetas.forEach(function (r, i) {
      const nombre = r && r.nombre ? '"' + r.nombre + '"' : "#" + (i + 1);
      ["id", "nombre", "proceso", "ingredientes", "pasos"].forEach(function (campo) {
        if (!r || !r[campo]) console.warn("🧪 A la receta " + nombre + ' le falta el campo "' + campo + '".');
      });
      if (r && r.id) {
        if (ids[r.id]) console.warn('🧪 Hay dos recetas con el mismo id: "' + r.id + '". Cada id debe ser único.');
        ids[r.id] = true;
      }
      if (r && r.color && COLORES.indexOf(r.color) < 0) {
        console.warn("🧪 Color desconocido en " + nombre + ': "' + r.color + '". Usa: ' + COLORES.join(", "));
      }
      (r && r.quiz ? r.quiz : []).forEach(function (q, j) {
        if (!q.opciones || q.correcta == null || !q.opciones[q.correcta]) {
          console.warn("🧪 Revisa la pregunta " + (j + 1) + " del quiz de " + nombre + ': "correcta" no coincide con ninguna opción.');
        }
      });
    });
  }

  /* ---------- Ilustraciones SVG ---------- */
  const SVG_MATRAZ =
    '<svg class="matraz" viewBox="0 0 200 230" aria-hidden="true">' +
    '<g class="matraz-burbujas">' +
    '<circle class="mb mb1" cx="96" cy="60" r="6"/>' +
    '<circle class="mb mb2" cx="108" cy="70" r="4"/>' +
    '<circle class="mb mb3" cx="100" cy="66" r="8"/>' +
    "</g>" +
    '<path d="M86 32 V84 L38 178 Q30 200 54 202 H146 Q170 200 162 178 L114 84 V32 Z" fill="#fff"/>' +
    '<path class="liquido" d="M61.5 132 Q81 124 100 132 T138.5 132 L162 178 Q170 200 146 202 H54 Q30 200 38 178 Z"/>' +
    '<path d="M86 32 V84 L38 178 Q30 200 54 202 H146 Q170 200 162 178 L114 84 V32" fill="none" stroke="#9d86e8" stroke-width="6" stroke-linejoin="round"/>' +
    '<rect x="76" y="20" width="48" height="14" rx="7" fill="#ffd6e7" stroke="#9d86e8" stroke-width="6"/>' +
    '<path d="M58 160 L74 128" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/>' +
    '<circle cx="84" cy="164" r="6" fill="#5a4a6b"/><circle cx="116" cy="164" r="6" fill="#5a4a6b"/>' +
    '<circle cx="86" cy="162" r="2" fill="#fff"/><circle cx="118" cy="162" r="2" fill="#fff"/>' +
    '<ellipse cx="72" cy="176" rx="8" ry="5" fill="#ff8fb8" opacity=".7"/>' +
    '<ellipse cx="128" cy="176" rx="8" ry="5" fill="#ff8fb8" opacity=".7"/>' +
    '<path d="M93 174 Q100 182 107 174" stroke="#5a4a6b" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
    "</svg>";

  function svgMolecula(clase) {
    return (
      '<svg class="molecula ' + (clase || "") + '" viewBox="0 0 120 84" aria-hidden="true">' +
      '<line x1="30" y1="50" x2="60" y2="38" stroke="#c9b8f5" stroke-width="7" stroke-linecap="round"/>' +
      '<line x1="60" y1="38" x2="94" y2="54" stroke="#c9b8f5" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="30" cy="52" r="17" fill="#bfe3ff"/>' +
      '<circle cx="94" cy="56" r="14" fill="#bff0dc"/>' +
      '<circle cx="60" cy="38" r="24" fill="#ffc4dc"/>' +
      '<circle cx="52" cy="36" r="3" fill="#5a4a6b"/><circle cx="68" cy="36" r="3" fill="#5a4a6b"/>' +
      '<ellipse cx="46" cy="44" rx="4" ry="2.5" fill="#ff8fb8"/><ellipse cx="74" cy="44" rx="4" ry="2.5" fill="#ff8fb8"/>' +
      '<path d="M55 43 Q60 48 65 43" stroke="#5a4a6b" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function svgLecitina() {
    let moleculas = "";
    const n = 16;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const p = function (r) {
        return (150 + r * cos).toFixed(1) + " " + (140 + r * sin).toFixed(1);
      };
      const off = 4;
      // dos colitas (hidrofóbicas) hacia el aceite, cabecita (hidrofílica) hacia el agua
      moleculas +=
        '<line x1="' + (150 + 92 * cos - off * sin).toFixed(1) + '" y1="' + (140 + 92 * sin + off * cos).toFixed(1) +
        '" x2="' + (150 + 62 * cos - off * sin).toFixed(1) + '" y2="' + (140 + 62 * sin + off * cos).toFixed(1) +
        '" class="cola"/>' +
        '<line x1="' + (150 + 92 * cos + off * sin).toFixed(1) + '" y1="' + (140 + 92 * sin - off * cos).toFixed(1) +
        '" x2="' + (150 + 62 * cos + off * sin).toFixed(1) + '" y2="' + (140 + 62 * sin - off * cos).toFixed(1) +
        '" class="cola"/>';
      const c = p(100).split(" ");
      moleculas += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="9" class="cabeza"/>';
    }
    return (
      '<figure class="diagrama diagrama-lecitina">' +
      '<svg viewBox="0 0 300 280" role="img" aria-label="Gota de aceite rodeada por moléculas de lecitina: las colas hacia el aceite y las cabezas hacia el agua">' +
      '<rect x="4" y="4" width="292" height="272" rx="28" class="agua"/>' +
      '<circle cx="150" cy="140" r="84" class="aceite"/>' +
      moleculas +
      '<text x="150" y="136" text-anchor="middle" class="etq">gota de</text>' +
      '<text x="150" y="156" text-anchor="middle" class="etq">aceite</text>' +
      '<text x="26" y="34" class="etq etq-agua">agua 💧</text>' +
      "</svg>" +
      '<figcaption><span><i class="ley-cabeza"></i> Cabeza hidrofílica: atrae al agua</span>' +
      '<span><i class="ley-cola"></i> Cola hidrofóbica: atrae a la grasa</span></figcaption>' +
      "</figure>"
    );
  }

  function diagramaPH() {
    const marcas = [
      { ph: 2.3, txt: "🍋 limón" },
      { ph: 7, txt: "💧 agua" },
      { ph: 8.3, txt: "🧂 bicarbonato" },
    ];
    let ticks = "";
    for (let i = 0; i <= 14; i += 1) {
      ticks += '<span style="left:' + (i / 14) * 100 + '%">' + (i % 2 === 0 ? i : "") + "</span>";
    }
    return (
      '<figure class="diagrama diagrama-ph">' +
      '<p class="diagrama-titulo">Color del té de flor de guisante de mariposa según el pH</p>' +
      '<div class="ph-escala">' +
      '<div class="ph-barra" role="img" aria-label="Escala de pH: rosado en ácido, morado cerca de 4, azul cerca de neutro y verdoso en básico"></div>' +
      '<div class="ph-ticks">' + ticks + "</div>" +
      '<div class="ph-marcas">' +
      marcas
        .map(function (m) {
          return '<span style="left:' + (m.ph / 14) * 100 + '%">' + m.txt + "</span>";
        })
        .join("") +
      "</div></div>" +
      '<div class="ph-zonas"><span>Ácido</span><span>Neutro</span><span>Básico</span></div>' +
      '<figcaption>Valores aproximados: el tono exacto depende de la concentración del té.</figcaption>' +
      "</figure>"
    );
  }

  /* ---------- Temporizadores ---------- */
  const temporizadores = {};
  let audio = null;

  function limpiarTemporizadores() {
    Object.keys(temporizadores).forEach(function (k) {
      clearInterval(temporizadores[k].intervalo);
      delete temporizadores[k];
    });
  }

  function htmlTemporizador(clave, minutos) {
    const seg = Math.round(minutos * 60);
    temporizadores[clave] = { total: seg, restante: seg, intervalo: null, finEn: 0 };
    return (
      '<div class="temporizador" data-timer="' + clave + '">' +
      '<span class="reloj" aria-hidden="true">⏲️</span>' +
      '<span class="tiempo" role="timer" aria-live="off">' + duracion(seg) + "</span>" +
      '<button type="button" class="btn-mini" data-timer-accion="iniciar">▶ Iniciar</button>' +
      '<button type="button" class="btn-mini btn-suave" data-timer-accion="reiniciar" aria-label="Reiniciar temporizador">↺</button>' +
      '<span class="aviso" aria-live="polite"></span>' +
      "</div>"
    );
  }

  function pintarTemporizador(clave) {
    const t = temporizadores[clave];
    const el = app.querySelector('[data-timer="' + clave + '"]');
    if (!t || !el) return;
    el.querySelector(".tiempo").textContent = duracion(t.restante);
    const btn = el.querySelector('[data-timer-accion="iniciar"], [data-timer-accion="pausar"]');
    if (t.intervalo) {
      btn.dataset.timerAccion = "pausar";
      btn.textContent = "⏸ Pausa";
    } else {
      btn.dataset.timerAccion = "iniciar";
      btn.textContent = t.restante < t.total && t.restante > 0 ? "▶ Seguir" : "▶ Iniciar";
    }
    el.classList.toggle("corriendo", !!t.intervalo);
  }

  function accionTemporizador(clave, accion) {
    const t = temporizadores[clave];
    if (!t) return;
    const el = app.querySelector('[data-timer="' + clave + '"]');
    if (accion === "iniciar") {
      prepararAudio();
      if (t.restante <= 0) t.restante = t.total;
      el.classList.remove("listo");
      el.querySelector(".aviso").textContent = "";
      t.finEn = Date.now() + t.restante * 1000;
      t.intervalo = setInterval(function () {
        t.restante = Math.max(0, Math.ceil((t.finEn - Date.now()) / 1000));
        if (t.restante === 0) terminar(clave);
        pintarTemporizador(clave);
      }, 250);
    } else if (accion === "pausar") {
      clearInterval(t.intervalo);
      t.intervalo = null;
    } else if (accion === "reiniciar") {
      clearInterval(t.intervalo);
      t.intervalo = null;
      t.restante = t.total;
      el.classList.remove("listo");
      el.querySelector(".aviso").textContent = "";
    }
    pintarTemporizador(clave);
  }

  function terminar(clave) {
    const t = temporizadores[clave];
    clearInterval(t.intervalo);
    t.intervalo = null;
    const el = app.querySelector('[data-timer="' + clave + '"]');
    if (el) {
      el.classList.add("listo");
      el.querySelector(".aviso").textContent = "¡Tiempo! ✨";
    }
    sonar();
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }

  function prepararAudio() {
    if (audio) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audio = new Ctx();
    } catch (e) {
      audio = null;
    }
  }

  function sonar() {
    if (!audio) return;
    try {
      [0, 0.25, 0.5].forEach(function (retraso, i) {
        const osc = audio.createOscillator();
        const vol = audio.createGain();
        osc.type = "sine";
        osc.frequency.value = [880, 1046, 1318][i];
        vol.gain.setValueAtTime(0.0001, audio.currentTime + retraso);
        vol.gain.exponentialRampToValueAtTime(0.25, audio.currentTime + retraso + 0.02);
        vol.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + retraso + 0.22);
        osc.connect(vol).connect(audio.destination);
        osc.start(audio.currentTime + retraso);
        osc.stop(audio.currentTime + retraso + 0.25);
      });
    } catch (e) {
      /* sin sonido */
    }
  }

  /* ---------- Efecto de corazoncitos ---------- */
  function chispitas(x, y) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const iconos = ["💖", "✨", "💜", "⭐", "🫧"];
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("span");
      s.className = "chispita";
      s.textContent = iconos[i % iconos.length];
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", (Math.random() * 160 - 80).toFixed(0) + "px");
      s.style.setProperty("--dy", (-60 - Math.random() * 90).toFixed(0) + "px");
      s.style.setProperty("--rot", (Math.random() * 80 - 40).toFixed(0) + "deg");
      document.body.appendChild(s);
      setTimeout(function () {
        s.remove();
      }, 1100);
    }
  }

  /* ---------- Páginas ---------- */
  function pagina(html, clase) {
    return '<div class="pagina ' + (clase || "") + '">' + html + "</div>";
  }

  function vistaInicio() {
    const procesos = recetas.map(function (r) {
      return r.proceso;
    });
    return pagina(
      '<section class="portada">' +
        '<div class="portada-texto">' +
        '<p class="etiqueta-mini">✨ Proyecto final de Química ✨</p>' +
        '<h1>Laboratorio de Cocina <span class="no-romper">🧪🍰</span></h1>' +
        '<p class="lema">Cocinar es hacer química: cada receta es un experimento que te puedes comer. Mezclas reactivos, controlas la temperatura y observas cómo aparecen burbujas, colores y aromas nuevos.</p>' +
        '<div class="portada-botones">' +
        '<a class="btn btn-grande" href="#/recetas">Ver las recetas 🍓</a>' +
        '<a class="btn btn-suave" href="#/glosario">Glosario 📖</a>' +
        "</div>" +
        "</div>" +
        '<div class="portada-ilustracion">' +
        SVG_MATRAZ +
        svgMolecula("flota flota-1") +
        svgMolecula("flota flota-2") +
        '<span class="brillo brillo-1" aria-hidden="true">✨</span>' +
        '<span class="brillo brillo-2" aria-hidden="true">💖</span>' +
        '<span class="brillo brillo-3" aria-hidden="true">⭐</span>' +
        "</div>" +
        "</section>" +
        '<section class="como-usar">' +
        '<h2>¿Cómo usar este cuaderno?</h2>' +
        '<div class="tarjetas-info">' +
        '<div class="info rosa"><span class="info-emoji">🔬</span><h3>Mira la química</h3><p>En los pasos importantes, toca “¿Qué está pasando químicamente?” para ver la explicación.</p></div>' +
        '<div class="info menta"><span class="info-emoji">⏲️</span><h3>Usa los temporizadores</h3><p>Los pasos con tiempo tienen su propio reloj. Te avisa con un sonido cuando termina.</p></div>' +
        '<div class="info lila"><span class="info-emoji">🧠</span><h3>Pon a prueba lo aprendido</h3><p>Cada receta termina con un mini quiz de opción múltiple.</p></div>' +
        "</div>" +
        "</section>" +
        '<section class="procesos-resumen">' +
        "<h2>" + recetas.length + " recetas, " + new Set(procesos).size + " procesos químicos</h2>" +
        '<div class="nubes-procesos">' +
        recetas
          .map(function (r) {
            return (
              '<a class="pastilla ' + colorDe(r) + '" href="#/receta/' + encodeURIComponent(r.id) + '">' +
              esc(r.emoji) + " " + esc(r.proceso) +
              "</a>"
            );
          })
          .join("") +
        "</div>" +
        "</section>",
      "pagina-inicio"
    );
  }

  let filtroActual = "Todos";

  function tarjetaReceta(r) {
    return (
      '<a class="tarjeta ' + colorDe(r) + '" href="#/receta/' + encodeURIComponent(r.id) + '">' +
      '<div class="tarjeta-cabeza">' +
      '<span class="tarjeta-emoji" aria-hidden="true">' + esc(r.emoji) + "</span>" +
      '<span class="cinta" aria-hidden="true"></span>' +
      "</div>" +
      '<div class="tarjeta-cuerpo">' +
      '<span class="etiqueta-proceso ' + colorDe(r) + '">🧪 ' + esc(r.proceso) + "</span>" +
      "<h3>" + esc(r.nombre) + "</h3>" +
      '<p class="tarjeta-resumen">' + fmt(r.resumen) + "</p>" +
      '<div class="tarjeta-meta">' +
      '<span>⏱️ ' + esc(r.tiempo) + "</span>" +
      "<span>" + estrellas(r.dificultad) + "</span>" +
      "</div>" +
      "</div>" +
      "</a>"
    );
  }

  function htmlGaleria() {
    const lista = recetas.filter(function (r) {
      return filtroActual === "Todos" || r.proceso === filtroActual;
    });
    return (
      '<p class="conteo" aria-live="polite">' +
      (lista.length === 1 ? "1 receta" : lista.length + " recetas") +
      (filtroActual === "Todos" ? "" : " con " + esc(filtroActual)) +
      "</p>" +
      '<div class="galeria">' + lista.map(tarjetaReceta).join("") + "</div>"
    );
  }

  function vistaRecetas() {
    const procesos = ["Todos"];
    recetas.forEach(function (r) {
      if (procesos.indexOf(r.proceso) < 0) procesos.push(r.proceso);
    });
    if (procesos.indexOf(filtroActual) < 0) filtroActual = "Todos";
    return pagina(
      '<header class="cabecera-seccion">' +
        "<h1>Recetario 🍰</h1>" +
        "<p>Elige una receta o filtra por el proceso químico que quieres estudiar.</p>" +
        "</header>" +
        '<div class="filtros" role="group" aria-label="Filtrar por proceso químico">' +
        procesos
          .map(function (p) {
            const activo = p === filtroActual;
            return (
              '<button type="button" class="chip' + (activo ? " activo" : "") + '" data-filtro="' + esc(p) + '" aria-pressed="' + activo + '">' +
              (p === "Todos" ? "✨ Todos" : esc(p)) +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        '<div id="galeria">' + htmlGaleria() + "</div>"
    );
  }

  function badgeCambio(tipo) {
    const t = normalizar(tipo || "");
    if (t.indexOf("ambos") >= 0 || (t.indexOf("fisico") >= 0 && t.indexOf("quimico") >= 0)) {
      return '<span class="badge lila">🧊⚗️ Cambio físico y químico</span>';
    }
    if (t.indexOf("fisico") >= 0) return '<span class="badge menta">🧊 Cambio físico</span>';
    return '<span class="badge rosa">⚗️ Cambio químico</span>';
  }

  function vistaReceta(id) {
    const i = recetas.findIndex(function (r) {
      return r.id === id;
    });
    if (i < 0) return vista404("No encontramos esa receta 🥺");
    const r = recetas[i];
    const q = r.quimica || {};
    const color = colorDe(r);
    const marcados = leer("ing:" + r.id) || [];
    const ingredientes = r.ingredientes || [];
    const pasos = r.pasos || [];

    let html =
      '<a class="volver" href="#/recetas">← Volver al recetario</a>' +
      '<header class="receta-cabecera ' + color + '">' +
      '<div class="receta-emoji" aria-hidden="true">' + esc(r.emoji) + "</div>" +
      '<div class="receta-titulos">' +
      '<span class="etiqueta-proceso blanco">🧪 ' + esc(r.proceso) + "</span>" +
      "<h1>" + esc(r.nombre) + "</h1>" +
      "<p>" + fmt(r.resumen) + "</p>" +
      '<div class="receta-meta">' +
      '<span class="pildora">⏱️ ' + esc(r.tiempo) + "</span>" +
      (r.porciones ? '<span class="pildora">🍽️ ' + esc(r.porciones) + "</span>" : "") +
      '<span class="pildora">' + estrellas(r.dificultad) + " " + DIFICULTAD[Math.max(1, Math.min(3, Number(r.dificultad) || 1))] + "</span>" +
      "</div>" +
      "</div>" +
      "</header>";

    if (r.seguridad) {
      html += '<div class="aviso-seguridad" role="note"><strong>⚠️ Seguridad:</strong> ' + fmt(r.seguridad) + "</div>";
    }

    // Ingredientes + pasos
    html +=
      '<div class="receta-cuerpo">' +
      '<section class="cuaderno ingredientes" aria-labelledby="t-ing">' +
      '<h2 id="t-ing">🧺 Ingredientes</h2>' +
      '<p class="progreso-ing" aria-live="polite"></p>' +
      '<ul class="lista-ing">' +
      ingredientes
        .map(function (ing, j) {
          return (
            '<li><label class="check">' +
            '<input type="checkbox" data-ing="' + j + '"' + (marcados[j] ? " checked" : "") + ">" +
            '<span class="casilla" aria-hidden="true"></span>' +
            '<span class="check-texto">' + fmt(ing) + "</span>" +
            "</label></li>"
          );
        })
        .join("") +
      "</ul>" +
      '<button type="button" class="btn-mini btn-suave" data-ing-reiniciar>Desmarcar todo</button>' +
      "</section>" +
      '<section class="pasos" aria-labelledby="t-pasos">' +
      '<h2 id="t-pasos">👩‍🍳 Paso a paso</h2>' +
      "<ol>" +
      pasos
        .map(function (p, j) {
          let li = '<li class="paso' + (p.quimica ? " tiene-quimica" : "") + '">' +
            '<span class="paso-num" aria-hidden="true">' + (j + 1) + "</span>" +
            '<div class="paso-contenido">' +
            "<p>" + fmt(p.texto) + "</p>";
          if (p.temporizador) li += htmlTemporizador(r.id + "-" + j, Number(p.temporizador));
          if (p.quimica) {
            const pid = "q-" + j;
            li +=
              '<button type="button" class="btn-quimica" aria-expanded="false" aria-controls="' + pid + '" data-quimica-toggle>' +
              '🔬 ¿Qué está pasando químicamente? <span class="flechita" aria-hidden="true">▾</span></button>' +
              '<div class="panel-quimica" id="' + pid + '"><div class="panel-interior"><div class="panel-caja">' +
              svgMolecula("mini") + "<p>" + fmt(p.quimica) + "</p>" +
              "</div></div></div>";
          }
          return li + "</div></li>";
        })
        .join("") +
      "</ol>" +
      (r.consejo ? '<div class="consejo"><strong>💡 Consejo:</strong> ' + fmt(r.consejo) + "</div>" : "") +
      "</section>" +
      "</div>";

    // La química detrás
    html +=
      '<section class="quimica-detras" aria-labelledby="t-quim">' +
      '<h2 id="t-quim">⚗️ La química detrás</h2>' +
      '<div class="quim-grid">' +
      '<article class="quim-tarjeta proceso-tarjeta ' + color + '">' +
      '<p class="mini-titulo">Proceso</p>' +
      "<h3>" + esc(q.proceso || r.proceso) + "</h3>" +
      badgeCambio(q.tipoCambio) +
      (q.tipoCambioNota ? '<p class="nota-cambio">' + fmt(q.tipoCambioNota) + "</p>" : "") +
      "</article>" +
      '<article class="quim-tarjeta explicacion">' +
      '<p class="mini-titulo">Explicación sencilla</p>' +
      "<p>" + fmt(q.explicacion) + "</p>" +
      "</article>" +
      "</div>";

    if (q.ecuacion || q.ecuacionNota || q.diagrama) {
      html += '<article class="quim-tarjeta ecuacion-tarjeta">' +
        '<p class="mini-titulo">' + (q.ecuacion ? (q.esquema ? "Esquema de la reacción" : "Ecuación química") : "¿Y la ecuación?") + "</p>";
      if (q.ecuacion) {
        html += '<div class="ecuacion">' + formula(q.ecuacion) + "</div>";
        if (q.ecuacionLeyenda) html += '<p class="ecuacion-leyenda">' + fmt(q.ecuacionLeyenda) + "</p>";
        if (q.esquema) html += '<p class="ecuacion-leyenda"><em>Es un esquema en palabras, no una ecuación balanceada.</em></p>';
      }
      if (q.ecuacionNota) html += '<p class="nota-simplificacion">📌 ' + fmt(q.ecuacionNota) + "</p>";
      if (q.diagrama === "lecitina") html += svgLecitina();
      if (q.diagrama === "ph") html += diagramaPH();
      html += "</article>";
    }

    html += '<div class="quim-grid">';
    if (q.evidencias && q.evidencias.length) {
      html +=
        '<article class="quim-tarjeta">' +
        '<p class="mini-titulo">👀 Evidencias de la reacción</p>' +
        '<ul class="evidencias">' +
        q.evidencias
          .map(function (e) {
            return '<li><span class="ev-icono" aria-hidden="true">' + esc(e.icono || "✨") + "</span><span>" + fmt(e.texto) + "</span></li>";
          })
          .join("") +
        "</ul></article>";
    }
    if (q.factores && q.factores.length) {
      html +=
        '<article class="quim-tarjeta">' +
        '<p class="mini-titulo">🎛️ Factores que la afectan</p>' +
        '<ul class="factores">' +
        q.factores
          .map(function (f) {
            return (
              '<li><span class="ev-icono" aria-hidden="true">' + esc(f.icono || "•") + "</span><span><strong>" +
              esc(f.nombre) + ":</strong> " + fmt(f.texto) + "</span></li>"
            );
          })
          .join("") +
        "</ul></article>";
    }
    html += "</div>";

    if (q.comparacion) {
      html +=
        '<article class="quim-tarjeta comparacion">' +
        '<p class="mini-titulo">⚖️ Comparación</p>' +
        "<h3>" + esc(q.comparacion.titulo) + "</h3>" +
        '<div class="comparacion-cols">' +
        (q.comparacion.columnas || [])
          .map(function (c) {
            return (
              '<div class="comparacion-col"><h4>' + esc(c.titulo) + "</h4><ul>" +
              (c.items || []).map(function (it) {
                return "<li>" + fmt(it) + "</li>";
              }).join("") +
              "</ul></div>"
            );
          })
          .join("") +
        "</div></article>";
    }

    if (q.notaExtra) {
      html += '<article class="quim-tarjeta nota-extra"><h3>' + esc(q.notaExtra.titulo) + "</h3><p>" + fmt(q.notaExtra.texto) + "</p></article>";
    }

    if (q.datoCurioso) {
      html += '<article class="dato-curioso"><span class="bombilla" aria-hidden="true">💡</span><div><h3>Dato curioso</h3><p>' + fmt(q.datoCurioso) + "</p></div></article>";
    }
    html += "</section>";

    // Quiz
    if (r.quiz && r.quiz.length) {
      html +=
        '<section class="quiz" aria-labelledby="t-quiz" data-total="' + r.quiz.length + '">' +
        '<h2 id="t-quiz">🧠 Mini quiz</h2>' +
        '<p class="quiz-intro">' + r.quiz.length + " preguntas para ver cuánto aprendiste.</p>" +
        r.quiz
          .map(function (p, j) {
            return (
              '<fieldset class="pregunta" data-pregunta="' + j + '">' +
              "<legend><span class=\"preg-num\">" + (j + 1) + "</span> " + fmt(p.pregunta) + "</legend>" +
              '<div class="opciones">' +
              (p.opciones || [])
                .map(function (o, k) {
                  return '<button type="button" class="opcion" data-opcion="' + k + '"><span class="letra">' + "ABCDEF"[k] + "</span> " + fmt(o) + "</button>";
                })
                .join("") +
              "</div>" +
              '<div class="retro" aria-live="polite"></div>' +
              "</fieldset>"
            );
          })
          .join("") +
        '<div class="resultado" aria-live="polite"></div>' +
        "</section>";
    }

    // Navegación entre recetas
    const ant = recetas[(i - 1 + recetas.length) % recetas.length];
    const sig = recetas[(i + 1) % recetas.length];
    html +=
      '<nav class="nav-recetas" aria-label="Otras recetas">' +
      '<a href="#/receta/' + encodeURIComponent(ant.id) + '" class="btn btn-suave">← ' + esc(ant.emoji) + " " + esc(ant.nombre) + "</a>" +
      '<a href="#/receta/' + encodeURIComponent(sig.id) + '" class="btn btn-suave">' + esc(sig.emoji) + " " + esc(sig.nombre) + " →</a>" +
      "</nav>";

    return pagina(html, "pagina-receta " + color);
  }

  function vistaGlosario() {
    const ordenado = glosario.slice().sort(function (a, b) {
      return a.termino.localeCompare(b.termino, "es");
    });
    return pagina(
      '<header class="cabecera-seccion">' +
        "<h1>Glosario 📖</h1>" +
        "<p>Las palabras clave de la química en la cocina, explicadas en simple.</p>" +
        "</header>" +
        '<div class="buscador"><span aria-hidden="true">🔎</span>' +
        '<input type="search" id="buscar-glosario" placeholder="Buscar un término..." aria-label="Buscar en el glosario" autocomplete="off"></div>' +
        '<p class="conteo" id="conteo-glosario" aria-live="polite">' + ordenado.length + " términos</p>" +
        '<div class="glosario">' +
        ordenado
          .map(function (g) {
            const receta = g.receta && recetas.find(function (r) {
              return r.id === g.receta;
            });
            return (
              '<article class="termino" data-buscar="' + esc(normalizar(g.termino + " " + g.definicion)) + '">' +
              '<span class="termino-emoji" aria-hidden="true">' + esc(g.emoji || "🧪") + "</span>" +
              "<div><h3>" + esc(g.termino) + "</h3>" +
              "<p>" + fmt(g.definicion) + "</p>" +
              (g.ejemplo ? '<p class="ejemplo"><strong>Ejemplo:</strong> ' + fmt(g.ejemplo) + "</p>" : "") +
              (receta ? '<a class="ver-receta" href="#/receta/' + encodeURIComponent(receta.id) + '">' + esc(receta.emoji) + " Ver en " + esc(receta.nombre) + " →</a>" : "") +
              "</div></article>"
            );
          })
          .join("") +
        "</div>" +
        '<p class="sin-resultados" hidden>No encontramos ese término 🥺 Prueba con otra palabra.</p>'
    );
  }

  function vistaSobre() {
    const p = proyecto;
    const campos = [
      ["👩‍🔬", "Autor/a", p.autor],
      ["🏫", "Colegio", p.colegio],
      ["📚", "Materia", p.materia],
      ["🎒", "Curso", p.curso],
      ["🧑‍🏫", "Profesor/a", p.profesor],
      ["📅", "Fecha", p.fecha],
    ].filter(function (c) {
      return c[2];
    });

    return pagina(
      '<header class="cabecera-seccion">' +
        "<h1>Sobre el proyecto 🎓</h1>" +
        "</header>" +
        '<section class="cuaderno hoja-proyecto">' +
        '<span class="cinta cinta-proyecto" aria-hidden="true"></span>' +
        '<h2>Laboratorio de Cocina 🧪🍰</h2>' +
        '<dl class="datos-proyecto">' +
        campos
          .map(function (c) {
            return "<div><dt>" + c[0] + " " + c[1] + "</dt><dd>" + esc(c[2]) + "</dd></div>";
          })
          .join("") +
        "</dl>" +
        (p.descripcion ? "<h3>¿De qué se trata?</h3><p>" + fmt(p.descripcion) + "</p>" : "") +
        (p.objetivos && p.objetivos.length
          ? "<h3>Objetivos</h3><ul class=\"lista-linda\">" + p.objetivos.map(function (o) {
              return "<li>" + fmt(o) + "</li>";
            }).join("") + "</ul>"
          : "") +
        "<h3>Recetas y procesos</h3>" +
        '<div class="tabla-envoltura"><table class="tabla-procesos">' +
        "<thead><tr><th>Receta</th><th>Proceso químico</th><th>Tipo de cambio</th></tr></thead><tbody>" +
        recetas
          .map(function (r) {
            return (
              '<tr><td><a href="#/receta/' + encodeURIComponent(r.id) + '">' + esc(r.emoji) + " " + esc(r.nombre) + "</a></td>" +
              "<td>" + esc((r.quimica && r.quimica.proceso) || r.proceso) + "</td>" +
              "<td>" + badgeCambio(r.quimica && r.quimica.tipoCambio) + "</td></tr>"
            );
          })
          .join("") +
        "</tbody></table></div>" +
        (p.fuentes && p.fuentes.length
          ? "<h3>Fuentes</h3><ul class=\"lista-linda\">" + p.fuentes.map(function (f) {
              return "<li>" + fmt(f) + "</li>";
            }).join("") + "</ul>"
          : "") +
        '<p class="nota-simplificacion">📌 Algunas explicaciones están simplificadas para el nivel de secundaria; cada receta indica cuándo una ecuación o idea es una simplificación.</p>' +
        "</section>" +
        '<p class="pista-editar">✏️ Para cambiar tus datos, edita el archivo <code>datos/proyecto.js</code>.</p>'
    );
  }

  function vista404(msg) {
    return pagina(
      '<section class="vacio">' + svgMolecula("grande") +
        "<h1>" + esc(msg || "Esta página no existe 🥺") + "</h1>" +
        '<a class="btn" href="#/recetas">Ir al recetario</a></section>'
    );
  }

  function vistaErrorDatos() {
    return pagina(
      '<section class="vacio">' + svgMolecula("grande") +
        "<h1>Ups, no se pudieron cargar las recetas 🥺</h1>" +
        "<p>Revisa el archivo <code>datos/recetas.js</code>: puede faltar una coma, una comilla o un corchete. " +
        "Abre la consola del navegador (tecla F12) para ver en qué línea está el error.</p></section>"
    );
  }

  /* ---------- Interacción ---------- */
  function actualizarProgresoIngredientes() {
    const cajas = app.querySelectorAll("[data-ing]");
    const el = app.querySelector(".progreso-ing");
    if (!el || !cajas.length) return;
    const listos = Array.prototype.filter.call(cajas, function (c) {
      return c.checked;
    }).length;
    el.textContent =
      listos === cajas.length ? "¡Todo listo para cocinar! 🎉" : listos + " de " + cajas.length + " listos";
    el.classList.toggle("completo", listos === cajas.length);
  }

  function idRecetaActual() {
    const m = location.hash.match(/^#\/receta\/(.+)$/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function guardarIngredientes() {
    const id = idRecetaActual();
    if (!id) return;
    guardar(
      "ing:" + id,
      Array.prototype.map.call(app.querySelectorAll("[data-ing]"), function (c) {
        return c.checked;
      })
    );
  }

  function responder(boton) {
    const fs = boton.closest(".pregunta");
    if (fs.classList.contains("respondida")) return;
    const id = idRecetaActual();
    const r = recetas.find(function (x) {
      return x.id === id;
    });
    const j = Number(fs.dataset.pregunta);
    const p = r.quiz[j];
    const k = Number(boton.dataset.opcion);
    const ok = k === Number(p.correcta);
    fs.classList.add("respondida", ok ? "bien" : "mal");
    fs.querySelectorAll(".opcion").forEach(function (b) {
      b.disabled = true;
      if (Number(b.dataset.opcion) === Number(p.correcta)) b.classList.add("correcta");
    });
    if (!ok) boton.classList.add("incorrecta");
    fs.querySelector(".retro").innerHTML =
      '<p class="retro-caja ' + (ok ? "ok" : "no") + '">' +
      (ok ? "<strong>¡Correcto! 🎉</strong> " : "<strong>Casi... 💭</strong> La respuesta es la " + "ABCDEF"[p.correcta] + ". ") +
      fmt(p.explicacion || "") +
      "</p>";
    if (ok) {
      const rect = boton.getBoundingClientRect();
      chispitas(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    const quiz = fs.closest(".quiz");
    const total = Number(quiz.dataset.total);
    const respondidas = quiz.querySelectorAll(".pregunta.respondida").length;
    if (respondidas === total) {
      const buenas = quiz.querySelectorAll(".pregunta.bien").length;
      const mensaje =
        buenas === total
          ? "¡Perfecto! Eres una estrella de la química 🌟"
          : buenas >= total / 2
          ? "¡Muy bien! Ya casi dominas este tema 💪"
          : "¡Sigue practicando! Vuelve a leer “La química detrás” 📚";
      quiz.querySelector(".resultado").innerHTML =
        '<div class="resultado-caja' + (buenas === total ? " perfecto" : "") + '">' +
        '<p class="puntaje">' + buenas + " / " + total + "</p>" +
        "<p>" + mensaje + "</p>" +
        '<button type="button" class="btn" data-quiz-reiniciar>Intentar de nuevo ↺</button>' +
        "</div>";
    }
  }

  function reiniciarQuiz(quiz) {
    quiz.querySelectorAll(".pregunta").forEach(function (fs) {
      fs.classList.remove("respondida", "bien", "mal");
      fs.querySelector(".retro").innerHTML = "";
      fs.querySelectorAll(".opcion").forEach(function (b) {
        b.disabled = false;
        b.classList.remove("correcta", "incorrecta");
      });
    });
    quiz.querySelector(".resultado").innerHTML = "";
    quiz.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  app.addEventListener("click", function (e) {
    const filtro = e.target.closest("[data-filtro]");
    if (filtro) {
      filtroActual = filtro.dataset.filtro;
      app.querySelectorAll("[data-filtro]").forEach(function (b) {
        const activo = b.dataset.filtro === filtroActual;
        b.classList.toggle("activo", activo);
        b.setAttribute("aria-pressed", activo);
      });
      document.getElementById("galeria").innerHTML = htmlGaleria();
      return;
    }

    const toggle = e.target.closest("[data-quimica-toggle]");
    if (toggle) {
      const abierto = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!abierto));
      document.getElementById(toggle.getAttribute("aria-controls")).classList.toggle("abierto", !abierto);
      return;
    }

    const timerBtn = e.target.closest("[data-timer-accion]");
    if (timerBtn) {
      accionTemporizador(timerBtn.closest("[data-timer]").dataset.timer, timerBtn.dataset.timerAccion);
      return;
    }

    const opcion = e.target.closest("[data-opcion]");
    if (opcion) {
      responder(opcion);
      return;
    }

    const reiniciar = e.target.closest("[data-quiz-reiniciar]");
    if (reiniciar) {
      reiniciarQuiz(reiniciar.closest(".quiz"));
      return;
    }

    if (e.target.closest("[data-ing-reiniciar]")) {
      app.querySelectorAll("[data-ing]").forEach(function (c) {
        c.checked = false;
      });
      guardarIngredientes();
      actualizarProgresoIngredientes();
    }
  });

  app.addEventListener("change", function (e) {
    if (e.target.matches("[data-ing]")) {
      guardarIngredientes();
      actualizarProgresoIngredientes();
    }
  });

  app.addEventListener("input", function (e) {
    if (e.target.id !== "buscar-glosario") return;
    const q = normalizar(e.target.value.trim());
    let visibles = 0;
    app.querySelectorAll(".termino").forEach(function (t) {
      const ver = !q || t.dataset.buscar.indexOf(q) >= 0;
      t.hidden = !ver;
      if (ver) visibles++;
    });
    document.getElementById("conteo-glosario").textContent = visibles === 1 ? "1 término" : visibles + " términos";
    app.querySelector(".sin-resultados").hidden = visibles > 0;
  });

  /* ---------- Rutas ---------- */
  function marcarMenu(seccion) {
    document.querySelectorAll("[data-ruta]").forEach(function (a) {
      const activo = a.dataset.ruta === seccion;
      a.classList.toggle("activo", activo);
      if (activo) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function enrutar() {
    limpiarTemporizadores();
    if (!recetas) {
      app.innerHTML = vistaErrorDatos();
      return;
    }
    const partes = location.hash.replace(/^#\/?/, "").split("/");
    const seccion = partes[0] || "";
    let html;
    let menu = "";
    let titulo = "Laboratorio de Cocina 🧪🍰";

    if (seccion === "") {
      html = vistaInicio();
      menu = "inicio";
    } else if (seccion === "recetas") {
      html = vistaRecetas();
      menu = "recetas";
      titulo = "Recetas · " + titulo;
    } else if (seccion === "receta") {
      const id = decodeURIComponent(partes.slice(1).join("/"));
      html = vistaReceta(id);
      menu = "recetas";
      const r = recetas.find(function (x) {
        return x.id === id;
      });
      if (r) titulo = r.nombre + " · Laboratorio de Cocina";
    } else if (seccion === "glosario") {
      html = vistaGlosario();
      menu = "glosario";
      titulo = "Glosario · " + titulo;
    } else if (seccion === "sobre") {
      html = vistaSobre();
      menu = "sobre";
      titulo = "Sobre el proyecto · " + titulo;
    } else {
      html = vista404();
    }

    app.innerHTML = html;
    document.title = titulo;
    marcarMenu(menu);
    actualizarProgresoIngredientes();
    window.scrollTo(0, 0);
  }

  /* ---------- Burbujas del fondo ---------- */
  function crearBurbujas() {
    const capa = document.querySelector(".burbujas-fondo");
    if (!capa) return;
    const colores = ["rosa", "lila", "menta", "celeste", "durazno"];
    for (let i = 0; i < 14; i++) {
      const b = document.createElement("span");
      const tam = 10 + Math.random() * 34;
      b.className = "burbuja " + colores[i % colores.length];
      b.style.width = b.style.height = tam.toFixed(0) + "px";
      b.style.left = (Math.random() * 100).toFixed(1) + "%";
      b.style.animationDuration = (14 + Math.random() * 16).toFixed(1) + "s";
      b.style.animationDelay = (-Math.random() * 30).toFixed(1) + "s";
      capa.appendChild(b);
    }
  }

  // El enlace "Saltar al contenido" no debe cambiar la ruta.
  const saltar = document.querySelector(".saltar");
  if (saltar) {
    saltar.addEventListener("click", function (e) {
      e.preventDefault();
      app.focus();
    });
  }

  if (recetas) revisarRecetas();
  crearBurbujas();
  window.addEventListener("hashchange", enrutar);
  enrutar();
})();
