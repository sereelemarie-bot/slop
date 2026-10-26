/* =====================================================================
   🧪 RECETAS DEL LABORATORIO DE COCINA
   ---------------------------------------------------------------------
   Aquí están todas las recetas. Puedes editarlas o agregar nuevas.
   Cada receta es un bloque { ... } separado por comas dentro de [ ... ].

   ✏️ TRUCOS DE ESCRITURA
   - Fórmulas dentro del texto: escríbelas entre llaves y se verán con
     subíndices. Ejemplo: "libera {CO2}" se ve como "libera CO₂".
   - Cargas eléctricas: usa ^. Ejemplo: {H^+} → H⁺, {Al^3+} → Al³⁺
   - En el campo "ecuacion" no hacen falta llaves. Flechas:
        ->            flecha normal           →
        <=>           reacción reversible     ⇌
        -[calor]->    flecha con texto encima (catalizador o condición)
   - Coeficientes: deja un espacio antes de la fórmula: "2 CO2".

   🎨 Colores disponibles: "rosa", "lila", "menta", "durazno",
      "celeste", "amarillo".
   ⭐ Dificultad: 1 (fácil), 2 (media) o 3 (difícil).
   ⏲️ Temporizador en un paso: temporizador: 5   (son minutos)

   Hay una plantilla vacía al final de este archivo para copiar.
   ===================================================================== */

const RECETAS = [
  /* -------------------------------------------------------------- */
  {
    id: "pancakes",
    nombre: "Pancakes esponjosos",
    emoji: "🥞",
    color: "rosa",
    proceso: "Reacción ácido-base",
    tiempo: "25 min",
    porciones: "8 pancakes",
    dificultad: 1,
    resumen:
      "Suaves, altos y llenos de burbujitas. El secreto es una reacción entre el bicarbonato y el ácido del yogur.",
    ingredientes: [
      "1½ tazas (190 g) de harina de trigo",
      "1 taza (240 g) de yogur natural sin azúcar",
      "½ taza (120 ml) de leche",
      "1 huevo",
      "2 cucharadas de azúcar",
      "¾ cucharadita de bicarbonato de sodio",
      "¼ cucharadita de sal",
      "2 cucharadas (30 g) de mantequilla derretida, y un poco más para la sartén",
      "1 cucharada de jugo de limón",
      "1 cucharadita de esencia de vainilla (opcional)",
    ],
    pasos: [
      {
        texto: "En un bol grande mezcla la harina, el azúcar, el bicarbonato y la sal.",
      },
      {
        texto:
          "En otro bol bate el yogur, la leche, el huevo, la mantequilla derretida, el jugo de limón y la vainilla.",
      },
      {
        texto:
          "Vierte los líquidos sobre los ingredientes secos y mezcla con una espátula solo hasta que no veas harina seca. Unos grumitos están bien.",
        quimica:
          "¡Aquí empieza la reacción! Al mojarse, el bicarbonato ({NaHCO3}) se encuentra con el ácido láctico del yogur y el ácido cítrico del limón. Reaccionan y liberan dióxido de carbono ({CO2}), un gas que forma burbujitas en la masa. Si mezclas demasiado, se desarrolla el gluten de la harina y los pancakes salen duros.",
      },
      {
        texto: "Deja reposar la masa 5 minutos.",
        temporizador: 5,
        quimica:
          "Durante el reposo la harina absorbe líquido y el {CO2} sigue formando burbujas. No esperes mucho más: el bicarbonato reacciona apenas se moja, y si la masa espera media hora, gran parte del gas se escapa.",
      },
      {
        texto: "Calienta una sartén a fuego medio-bajo y engrásala con un poquito de mantequilla.",
      },
      {
        texto:
          "Vierte ¼ de taza de masa por pancake. Cocina unos 2 minutos, hasta que aparezcan burbujas en la superficie y los bordes se vean secos.",
        temporizador: 2,
        quimica:
          "Con el calor, el gas de las burbujas se expande y la masa sube. Al mismo tiempo, las proteínas del huevo y el almidón de la harina se cocinan y se vuelven firmes, así las burbujas quedan atrapadas como en una esponja. Las burbujas que revientan arriba te avisan que es hora de dar vuelta.",
      },
      {
        texto: "Dale vuelta y cocina 1 a 2 minutos más, hasta que esté dorado por ambos lados.",
        temporizador: 2,
        quimica:
          "El color dorado viene de otra reacción: la reacción de Maillard, entre los azúcares y las proteínas de la masa. ¡Es la misma que dora las galletas!",
      },
      {
        texto: "Sirve con fruta, miel o lo que más te guste.",
      },
    ],
    quimica: {
      proceso: "Reacción ácido-base (neutralización)",
      tipoCambio: "químico",
      tipoCambioNota: "Se forman sustancias nuevas: dióxido de carbono, agua y una sal.",
      explicacion:
        "El bicarbonato de sodio es una base. Cuando se disuelve en el líquido de la masa y se encuentra con un ácido, como el ácido láctico del yogur, reacciona con los iones {H^+} que ese ácido libera. Los productos son agua, una sal y dióxido de carbono, que es un gas. El gas queda atrapado en la masa en forma de burbujas y el calor de la sartén las agranda. Cuando la masa se cocina, las burbujas quedan fijas y por eso el pancake es esponjoso.",
      ecuacion: "NaHCO3 + H^+ -> Na^+ + H2O + CO2",
      ecuacionLeyenda: "bicarbonato de sodio + ácido → ion sodio + agua + dióxido de carbono",
      ecuacionNota:
        "Simplificación: en realidad primero se forma ácido carbónico ({H2CO3}), que es inestable y enseguida se separa en {H2O} y {CO2}. Escribimos el ácido como {H^+} porque cualquier ácido sirve: láctico, cítrico, acético (vinagre)...",
      evidencias: [
        { icono: "🫧", texto: "Burbujas en la masa y en la superficie del pancake (liberación de gas)" },
        { icono: "⬆️", texto: "La masa aumenta de volumen" },
        { icono: "🧽", texto: "Cambio de textura: de líquida a esponjosa" },
      ],
      factores: [
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto:
            "El calor acelera la reacción y expande el gas. Si la sartén está muy fría, el gas se escapa antes de que la masa se cocine y el pancake queda plano.",
        },
        {
          icono: "🍋",
          nombre: "pH (cantidad de ácido)",
          texto:
            "Necesitas suficiente ácido para todo el bicarbonato. Si sobra bicarbonato, el pancake sabe a jabón o a metal y se ve más oscuro.",
        },
        {
          icono: "⏱️",
          nombre: "Tiempo",
          texto: "El bicarbonato reacciona apenas se moja. Cocina la masa pronto para no perder el gas.",
        },
      ],
      datoCurioso:
        "El polvo de hornear es bicarbonato que ya trae su propio ácido en polvo, más un poco de almidón para mantenerlos secos. Por eso solo reacciona cuando le agregas líquido. Muchos son de “doble acción”: una parte reacciona al mojarse y otra con el calor del horno.",
    },
    quiz: [
      {
        pregunta: "¿Qué gas forma las burbujas de los pancakes?",
        opciones: ["Oxígeno ({O2})", "Dióxido de carbono ({CO2})", "Hidrógeno ({H2})", "Nitrógeno ({N2})"],
        correcta: 1,
        explicacion: "El bicarbonato reacciona con el ácido y libera {CO2}, que queda atrapado en la masa.",
      },
      {
        pregunta: "¿Para qué lleva yogur y limón la receta?",
        opciones: [
          "Para darle color amarillo",
          "Aportan el ácido que reacciona con el bicarbonato",
          "Para que la masa no se pegue en la sartén",
          "Para que la masa quede más líquida",
        ],
        correcta: 1,
        explicacion: "El bicarbonato es una base: necesita un ácido para reaccionar y liberar el gas.",
      },
      {
        pregunta: "Si pones mucho bicarbonato y poco ácido, ¿qué pasa?",
        opciones: [
          "Los pancakes saben a jabón o a metal",
          "Los pancakes quedan más dulces",
          "No cambia nada",
          "La masa se vuelve verde",
        ],
        correcta: 0,
        explicacion:
          "El bicarbonato que no reaccionó deja un sabor amargo, como a jabón, porque es una base.",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "pan",
    nombre: "Pan casero",
    emoji: "🍞",
    color: "durazno",
    proceso: "Fermentación",
    tiempo: "3 h",
    porciones: "1 pan grande",
    dificultad: 2,
    resumen:
      "Unos hongos microscópicos hacen el trabajo por ti: se comen el azúcar y llenan la masa de gas.",
    ingredientes: [
      "500 g (4 tazas) de harina de trigo",
      "7 g (1 sobre) de levadura seca instantánea",
      "300 ml de agua tibia (unos 37 °C, como la temperatura del cuerpo)",
      "1 cucharada (12 g) de azúcar",
      "1½ cucharaditas (9 g) de sal",
      "2 cucharadas (30 ml) de aceite de oliva o vegetal",
    ],
    pasos: [
      {
        texto:
          "En un bol mezcla el agua tibia, el azúcar y la levadura. Espera unos 10 minutos hasta que se forme espuma. (Con levadura instantánea este paso es opcional, pero sirve para comprobar que está viva.)",
        temporizador: 10,
        quimica:
          "La levadura (Saccharomyces cerevisiae) es un hongo microscópico vivo. Con el agua tibia se activa y empieza a comerse el azúcar. La espuma es {CO2} que produce al fermentar. Si no aparece espuma, la levadura puede estar vieja o el agua estaba demasiado caliente.",
      },
      {
        texto: "Agrega la harina, la sal y el aceite. Mezcla hasta formar una masa.",
      },
      {
        texto:
          "Amasa sobre la mesa enharinada durante 10 minutos, hasta que la masa esté lisa y elástica.",
        temporizador: 10,
        quimica:
          "Al amasar, dos proteínas de la harina (la glutenina y la gliadina) se unen con el agua y forman el gluten: una red elástica. La red funcionará como un globo que atrapa el gas de la levadura.",
      },
      {
        texto:
          "Pon la masa en un bol aceitado, tápala con un paño y déjala en un lugar tibio durante 1 hora o hasta que duplique su tamaño.",
        temporizador: 60,
        quimica:
          "¡Aquí ocurre la fermentación alcohólica! Las enzimas de la levadura rompen el almidón y el azúcar en glucosa ({C6H12O6}). Después, la levadura transforma la glucosa en etanol ({C2H5OH}) y dióxido de carbono ({CO2}). El gas infla la red de gluten y la masa crece.",
      },
      {
        texto:
          "Presiona la masa para sacarle el aire, dale forma de bollo (o ponla en un molde) y déjala leudar otros 40 minutos.",
        temporizador: 40,
      },
      {
        texto:
          "Precalienta el horno a 200 °C. Hornea 30 a 35 minutos, hasta que esté dorado y suene hueco al golpear la base.",
        temporizador: 30,
        quimica:
          "En el horno pasan muchas cosas: el gas se expande y el pan crece un poco más; cerca de los 60 °C la levadura muere; el etanol se evapora (por eso el pan no tiene alcohol); el almidón absorbe agua y las proteínas se vuelven firmes. La costra se dora gracias a la reacción de Maillard.",
      },
      {
        texto: "Deja enfriar el pan sobre una rejilla al menos 20 minutos antes de cortarlo.",
        temporizador: 20,
      },
    ],
    quimica: {
      proceso: "Fermentación alcohólica",
      tipoCambio: "químico",
      tipoCambioNota: "La glucosa se transforma en sustancias nuevas: etanol y dióxido de carbono.",
      explicacion:
        "La levadura es un ser vivo: un hongo de una sola célula. Dentro de la masa hay poco oxígeno, así que la levadura obtiene energía fermentando la glucosa. Sus enzimas funcionan como catalizadores y convierten cada molécula de glucosa en dos de etanol y dos de dióxido de carbono. El {CO2} queda atrapado en la red de gluten y hace crecer la masa. En el horno, el etanol se evapora y el gas se expande, dejando los agujeritos (alvéolos) de la miga.",
      ecuacion: "C6H12O6 -[enzimas de la levadura]-> 2 C2H5OH + 2 CO2",
      ecuacionLeyenda: "glucosa → etanol + dióxido de carbono",
      ecuacionNota:
        "Simplificación: esta ecuación resume más de diez reacciones seguidas, cada una con su propia enzima. Además, la harina tiene sobre todo almidón: primero otras enzimas lo rompen en azúcares más pequeños y recién entonces la levadura los fermenta.",
      evidencias: [
        { icono: "🫧", texto: "Espuma y burbujas; agujeritos (alvéolos) en la miga" },
        { icono: "⬆️", texto: "La masa duplica su volumen (liberación de gas)" },
        { icono: "👃", texto: "Olor a levadura y un poquito a alcohol" },
        { icono: "🟤", texto: "Costra dorada al hornear (reacción de Maillard)" },
      ],
      factores: [
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto:
            "La levadura trabaja mejor entre 25 y 35 °C. Con frío es muy lenta y sobre unos 50 °C empieza a morir.",
        },
        {
          icono: "🧂",
          nombre: "Sal y azúcar",
          texto:
            "Un poco de azúcar alimenta a la levadura. Mucha sal o mucha azúcar le quitan agua y la frenan.",
        },
        {
          icono: "⏱️",
          nombre: "Tiempo",
          texto:
            "Más tiempo de fermentación da más sabor. Si te pasas, la red de gluten se rompe y el pan se desinfla.",
        },
      ],
      datoCurioso:
        "La levadura del pan es la misma especie que se usa para hacer cerveza: Saccharomyces cerevisiae. En la cerveza se busca el alcohol; en el pan se busca el gas, y el alcohol se evapora en el horno.",
    },
    quiz: [
      {
        pregunta: "¿Qué ser vivo hace la fermentación en el pan?",
        opciones: ["Una bacteria", "La levadura, que es un hongo", "Un alga", "Ninguno, es solo la harina"],
        correcta: 1,
        explicacion: "La levadura Saccharomyces cerevisiae es un hongo microscópico de una sola célula.",
      },
      {
        pregunta: "¿Cuáles son los productos de la fermentación alcohólica?",
        opciones: [
          "Glucosa y agua",
          "Etanol y dióxido de carbono",
          "Oxígeno y agua",
          "Almidón y sal",
        ],
        correcta: 1,
        explicacion: "{C6H12O6} → 2 {C2H5OH} + 2 {CO2}: la glucosa es el reactivo; el etanol y el {CO2} son los productos.",
      },
      {
        pregunta: "¿Por qué el pan horneado no tiene alcohol?",
        opciones: [
          "La levadura nunca produce alcohol",
          "El etanol se evapora con el calor del horno",
          "La sal neutraliza el alcohol",
          "El gluten absorbe el alcohol",
        ],
        correcta: 1,
        explicacion: "El etanol hierve a unos 78 °C, mucho menos que la temperatura del horno, así que se evapora.",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "galletas",
    nombre: "Galletas doraditas",
    emoji: "🍪",
    color: "amarillo",
    proceso: "Reacción de Maillard",
    tiempo: "30 min",
    porciones: "20 galletas",
    dificultad: 1,
    resumen:
      "Bordes crujientes, centro suave y un aroma a tostado que llena la casa. Ese olor es química pura.",
    ingredientes: [
      "115 g (½ taza) de mantequilla a temperatura ambiente",
      "100 g (½ taza) de azúcar morena",
      "50 g (¼ taza) de azúcar blanca",
      "1 huevo",
      "1 cucharadita de esencia de vainilla",
      "190 g (1½ tazas) de harina de trigo",
      "½ cucharadita de bicarbonato de sodio",
      "¼ cucharadita de sal",
      "150 g (1 taza) de chispas de chocolate",
    ],
    pasos: [
      { texto: "Precalienta el horno a 180 °C y cubre una bandeja con papel de horno." },
      {
        texto:
          "Bate la mantequilla con los dos azúcares hasta que la mezcla esté cremosa y más clara, unos 3 minutos.",
        temporizador: 3,
        quimica:
          "Al batir, los cristalitos de azúcar abren pequeños huecos en la mantequilla y atrapan aire. Es un cambio físico, pero esas burbujitas ayudan a que las galletas no queden duras.",
      },
      { texto: "Agrega el huevo y la vainilla, y bate hasta integrar." },
      {
        texto:
          "En otro bol mezcla la harina, el bicarbonato y la sal. Incorpóralos a la mezcla de mantequilla y al final agrega las chispas de chocolate.",
        quimica:
          "La azúcar morena tiene melaza, que es un poco ácida. El bicarbonato reacciona con ella y libera {CO2}. El bicarbonato que sobra hace la masa un poco más básica (sube el pH), y un pH básico acelera la reacción de Maillard: más bicarbonato, galletas más doradas.",
      },
      { texto: "Forma bolitas de unos 3 cm y colócalas en la bandeja, separadas 5 cm entre sí." },
      {
        texto:
          "Hornea de 10 a 12 minutos, hasta que los bordes estén dorados y el centro todavía se vea suave.",
        temporizador: 11,
        quimica:
          "Primero se evapora el agua de la superficie. Cuando la superficie pasa los 140 °C aproximadamente, los azúcares reductores (como la glucosa y la fructosa) reaccionan con los aminoácidos de las proteínas del huevo, la harina y la mantequilla. Esa es la reacción de Maillard: produce pigmentos marrones llamados melanoidinas y cientos de moléculas con aroma a tostado.",
      },
      {
        texto:
          "Déjalas 5 minutos en la bandeja (se terminan de cocinar con el calor) y luego pásalas a una rejilla.",
        temporizador: 5,
      },
    ],
    quimica: {
      proceso: "Reacción de Maillard",
      tipoCambio: "químico",
      tipoCambioNota:
        "Se forman cientos de sustancias nuevas con color, aroma y sabor. Una galleta dorada no puede volver a ser masa cruda.",
      explicacion:
        "La reacción de Maillard ocurre cuando un azúcar reductor (como la glucosa) reacciona con un aminoácido, que es la pieza con la que se arman las proteínas. Necesita calor y poca agua, por eso pasa en la superficie de la galleta y no en el centro húmedo. Se vuelve rápida aproximadamente entre 140 y 165 °C. Produce pigmentos marrones (melanoidinas) y moléculas con aroma a tostado, nuez y galleta. Es la misma reacción que dora el pan, la carne asada y el café tostado.",
      ecuacion: "azúcar reductor + aminoácido -[calor]-> melanoidinas (color) + aromas + H2O",
      esquema: true,
      ecuacionNota:
        "La reacción de Maillard no tiene una sola ecuación: es una red de cientos de reacciones que cambian según el azúcar y el aminoácido que participen. Este esquema muestra solo la idea general. Ojo: el azúcar de mesa (sacarosa) no es un azúcar reductor, pero con calor y humedad una parte se separa en glucosa y fructosa, que sí lo son. La azúcar morena ya trae algo de ellas.",
      evidencias: [
        { icono: "🟤", texto: "Cambio de color: de crema pálido a dorado y marrón" },
        { icono: "👃", texto: "Olor a tostado y a galleta recién hecha" },
        { icono: "🍪", texto: "Cambio de textura: bordes crujientes, centro suave" },
      ],
      factores: [
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto:
            "A menos de 120 °C la reacción es muy lenta. En el horno a 180 °C la superficie llega pronto a la zona de Maillard. Si la temperatura es muy alta, se quema.",
        },
        {
          icono: "🧪",
          nombre: "pH",
          texto: "Un medio básico (más bicarbonato) la acelera; un medio ácido la frena.",
        },
        {
          icono: "💧",
          nombre: "Humedad",
          texto:
            "Mientras haya agua, la temperatura no pasa mucho de 100 °C. La superficie tiene que secarse primero para dorarse.",
        },
        {
          icono: "⏱️",
          nombre: "Tiempo",
          texto: "Un minuto de más en el horno cambia mucho el color y el sabor.",
        },
      ],
      comparacion: {
        titulo: "¿Maillard o caramelización? No son lo mismo",
        columnas: [
          {
            titulo: "🍪 Reacción de Maillard",
            items: [
              "Necesita azúcar reductor + aminoácidos (proteínas)",
              "Rápida desde unos 140 °C (y muy lenta a menos)",
              "Sabor tostado y complejo, a veces salado",
              "Ejemplos: galletas, pan, carne asada, café",
            ],
          },
          {
            titulo: "🍯 Caramelización",
            items: [
              "Solo necesita azúcar",
              "La sacarosa carameliza desde unos 160 °C",
              "Sabor dulce, tostado y algo amargo",
              "Ejemplos: caramelo, flan, azúcar quemada",
            ],
          },
        ],
      },
      datoCurioso:
        "Se llama así por el químico francés Louis-Camille Maillard, que la describió en 1912. Él estudiaba cómo se unen los aminoácidos, no la cocina. Décadas después, la industria de alimentos descubrió que su reacción explicaba el sabor de casi todo lo tostado.",
    },
    quiz: [
      {
        pregunta: "¿Qué sustancias reaccionan en la reacción de Maillard?",
        opciones: [
          "Azúcares reductores y aminoácidos",
          "Solo azúcar",
          "Agua y sal",
          "Grasa y oxígeno",
        ],
        correcta: 0,
        explicacion: "Maillard necesita las dos cosas: un azúcar reductor y un aminoácido (de las proteínas).",
      },
      {
        pregunta: "¿Cuál es la diferencia principal entre Maillard y caramelización?",
        opciones: [
          "Son la misma reacción con otro nombre",
          "Maillard necesita proteínas; la caramelización solo azúcar",
          "La caramelización necesita levadura",
          "Maillard solo ocurre en frío",
        ],
        correcta: 1,
        explicacion: "La caramelización es solo azúcar + calor. Maillard necesita además aminoácidos.",
      },
      {
        pregunta: "¿Por qué el centro de la galleta queda más claro que los bordes?",
        opciones: [
          "Tiene más agua y no llega a la temperatura de Maillard",
          "El centro no tiene azúcar",
          "El chocolate impide la reacción",
          "El centro tiene más sal",
        ],
        correcta: 0,
        explicacion: "El agua mantiene la temperatura cerca de 100 °C. Los bordes se secan antes y se doran.",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "caramelo",
    nombre: "Salsa de caramelo",
    emoji: "🍯",
    color: "durazno",
    proceso: "Caramelización",
    tiempo: "20 min",
    porciones: "1 frasco pequeño (unos 300 ml)",
    dificultad: 3,
    resumen:
      "Solo azúcar y calor, y aparecen color dorado, aroma tostado y sabor a caramelo. Un experimento que se come con cuchara.",
    seguridad:
      "El caramelo llega a más de 170 °C: quema mucho más que el agua hirviendo. Hazlo con un adulto, usa una olla de fondo grueso y no toques ni pruebes el caramelo caliente.",
    ingredientes: [
      "200 g (1 taza) de azúcar blanca",
      "60 ml (¼ taza) de agua",
      "Unas gotas de jugo de limón",
      "120 ml (½ taza) de crema de leche (nata), tibia o a temperatura ambiente",
      "30 g (2 cucharadas) de mantequilla",
      "1 pizca de sal",
    ],
    pasos: [
      {
        texto:
          "Pon el azúcar, el agua y las gotas de limón en una olla de fondo grueso. Calienta a fuego medio, moviendo la olla (sin cuchara), hasta que el azúcar se disuelva.",
        quimica:
          "Disolver azúcar en agua es un cambio físico: las moléculas de sacarosa se separan y se reparten en el agua, pero siguen siendo sacarosa. El ácido del limón ayuda a que una parte de la sacarosa se divida en glucosa y fructosa, y eso evita que el azúcar vuelva a formar cristales.",
      },
      {
        texto: "Deja hervir sin revolver. Verás muchas burbujas mientras el agua se evapora.",
        quimica:
          "Estas burbujas son vapor de agua, no un gas nuevo: todavía es un cambio físico. A medida que el agua se va, el jarabe se concentra y su temperatura sube por encima de 100 °C.",
      },
      {
        texto:
          "Cuando el jarabe empiece a tomar color, mueve la olla con suavidad para que se dore parejo. Retíralo del fuego cuando tenga color ámbar (unos 170 °C).",
        quimica:
          "¡Ahora sí hay química! Por encima de unos 160 °C la sacarosa se descompone: sus moléculas pierden agua, se rompen y los fragmentos se unen formando moléculas nuevas de color marrón (caramelanos, carameleno y caramelino) y aromas como el diacetilo, que huele a mantequilla. Eso es la caramelización.",
      },
      {
        texto:
          "Fuera del fuego, agrega la crema de a poco y con cuidado: va a burbujear muchísimo. Revuelve con una cuchara de mango largo.",
        quimica:
          "La crema está mucho más fría que el caramelo, así que su agua hierve de golpe y forma mucho vapor. Por eso burbujea tanto. Además, baja la temperatura y detiene la caramelización.",
      },
      { texto: "Agrega la mantequilla y la sal, y revuelve hasta que la salsa quede lisa." },
      {
        texto:
          "Deja enfriar 10 minutos antes de usar: al enfriarse se espesa. Guárdala en un frasco en el refrigerador hasta 2 semanas.",
        temporizador: 10,
      },
    ],
    quimica: {
      proceso: "Caramelización",
      tipoCambio: "químico",
      tipoCambioNota:
        "Disolver el azúcar y evaporar el agua son cambios físicos. La caramelización, en cambio, forma sustancias nuevas que ya no pueden volver a ser azúcar.",
      explicacion:
        "La caramelización es lo que le pasa al azúcar cuando la calientas mucho sin proteínas. La sacarosa del azúcar de mesa empieza a descomponerse cerca de los 160 °C: sus moléculas pierden agua, se rompen y los fragmentos se vuelven a unir de otras formas. Así se forman moléculas grandes de color marrón y moléculas pequeñas con aroma a caramelo, tostado y mantequilla. Entre 160 y 180 °C el color pasa de amarillo claro a ámbar. Si sigues calentando, el caramelo se vuelve amargo y al final se quema y queda carbón.",
      ecuacion: "2 C12H22O11 -[calor]-> C24H36O18 + 4 H2O",
      ecuacionLeyenda: "sacarosa → caramelano + agua",
      ecuacionNota:
        "Simplificación: esta ecuación muestra solo la formación del caramelano, uno de los muchos productos. La caramelización real incluye la separación de la sacarosa en glucosa y fructosa, la pérdida de agua y la formación de cientos de compuestos distintos.",
      evidencias: [
        { icono: "🟤", texto: "Cambio de color: transparente → amarillo → ámbar → marrón" },
        { icono: "👃", texto: "Olor a caramelo y tostado (y a quemado si te pasas)" },
        { icono: "🍯", texto: "Cambio de textura: el jarabe se vuelve espeso y pegajoso" },
        { icono: "💨", texto: "Se libera vapor de agua" },
      ],
      factores: [
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto:
            "Es la clave. Por debajo de unos 160 °C casi no hay color; por encima de unos 190 °C se quema muy rápido.",
        },
        {
          icono: "🍋",
          nombre: "pH",
          texto:
            "Un poco de ácido ayuda a dividir la sacarosa en glucosa y fructosa. La fructosa carameliza a menor temperatura y la mezcla forma menos cristales.",
        },
        {
          icono: "⏱️",
          nombre: "Tiempo",
          texto: "Al final el color cambia en segundos. No te alejes de la olla.",
        },
        {
          icono: "🥄",
          nombre: "Revolver",
          texto: "Si revuelves al inicio, se pueden formar cristales y el caramelo queda arenoso.",
        },
      ],
      comparacion: {
        titulo: "¿Caramelización o Maillard?",
        columnas: [
          {
            titulo: "🍯 Caramelización",
            items: [
              "Solo necesita azúcar",
              "La sacarosa carameliza desde unos 160 °C",
              "Sabor dulce, tostado y algo amargo",
              "Ejemplos: este caramelo, el de un flan",
            ],
          },
          {
            titulo: "🍪 Reacción de Maillard",
            items: [
              "Necesita azúcar reductor + aminoácidos (proteínas)",
              "Rápida desde unos 140 °C (y muy lenta a menos)",
              "Sabor tostado y complejo",
              "Ejemplos: galletas, pan, dulce de leche",
            ],
          },
        ],
      },
      notaExtra: {
        titulo: "¿Y el dulce de leche? 🤔",
        texto:
          "Al dulce de leche a veces lo llaman “caramelo de leche”, pero su color viene sobre todo de la reacción de Maillard, no de la caramelización. Se cocina cerca de los 100 °C, muy por debajo de la temperatura a la que carameliza la sacarosa, y la leche aporta proteínas (caseína) y lactosa, que es un azúcar reductor. Se parecen en color, pero se doran por caminos químicos diferentes.",
      },
      datoCurioso:
        "El colorante caramelo (en las etiquetas aparece como E150) es el que da color a las bebidas cola y a muchas salsas. Se fabrica caramelizando azúcar de forma controlada.",
    },
    quiz: [
      {
        pregunta: "¿Qué se necesita para que ocurra la caramelización?",
        opciones: ["Solo azúcar y calor", "Azúcar y proteínas", "Levadura", "Agua fría"],
        correcta: 0,
        explicacion: "La caramelización solo necesita azúcar y mucho calor. Si hay proteínas, ocurre Maillard.",
      },
      {
        pregunta: "Al inicio, cuando el jarabe hierve, ¿qué son las burbujas?",
        opciones: [
          "Vapor de agua (un cambio físico)",
          "Dióxido de carbono",
          "Oxígeno que sale del azúcar",
          "Etanol",
        ],
        correcta: 0,
        explicacion: "Primero se evapora el agua. La química empieza después, cuando el azúcar pasa los 160 °C.",
      },
      {
        pregunta: "El color marrón del dulce de leche viene principalmente de...",
        opciones: [
          "La reacción de Maillard",
          "La caramelización",
          "Un colorante",
          "La fermentación",
        ],
        correcta: 0,
        explicacion:
          "Se cocina cerca de 100 °C y la leche tiene proteínas y lactosa: condiciones perfectas para Maillard.",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "mayonesa",
    nombre: "Mayonesa casera",
    emoji: "🥚",
    color: "amarillo",
    proceso: "Emulsión",
    tiempo: "10 min",
    porciones: "1 taza",
    dificultad: 2,
    resumen:
      "Aceite y agua no se mezclan... a menos que tengas una yema de huevo y mucha paciencia batiendo.",
    seguridad:
      "La mayonesa casera lleva yema cruda. Usa huevos pasteurizados, guárdala en el refrigerador y cómela en 2 o 3 días.",
    ingredientes: [
      "1 yema de huevo pasteurizado, a temperatura ambiente",
      "1 cucharadita de mostaza",
      "1 cucharada de jugo de limón (o vinagre)",
      "250 ml (1 taza) de aceite neutro (girasol o canola)",
      "¼ cucharadita de sal",
    ],
    pasos: [
      {
        texto:
          "En un bol pon la yema, la mostaza, la sal y la mitad del jugo de limón. Bate con un batidor de mano hasta mezclar.",
        quimica:
          "La yema tiene lecitina, un emulsionante natural. La mostaza también ayuda, porque tiene sustancias que estabilizan las gotitas.",
      },
      {
        texto:
          "Agrega el aceite gota a gota mientras bates sin parar. Después de 2 o 3 cucharadas de aceite, la mezcla se pondrá espesa.",
        quimica:
          "Al batir, el aceite se rompe en gotitas diminutas. La lecitina se acomoda alrededor de cada gota: su “cola”, que atrae la grasa, se mete en el aceite, y su “cabeza”, que atrae el agua, queda hacia afuera. Así las gotas no se vuelven a juntar. Al principio ve muy lento, porque todavía hay poca emulsión que reciba el aceite.",
      },
      {
        texto:
          "Cuando la mezcla ya esté espesa, agrega el resto del aceite en un hilo fino, sin dejar de batir.",
        quimica:
          "La mezcla se vuelve opaca y blanquecina porque millones de gotitas de aceite desvían la luz en todas direcciones. Por el mismo motivo la leche, que también es una emulsión, se ve blanca.",
      },
      {
        texto:
          "Añade el resto del limón, prueba y ajusta la sal. Si quedó muy espesa, agrega una cucharadita de agua.",
      },
      { texto: "Guárdala en un frasco limpio en el refrigerador." },
    ],
    consejo:
      "¿Se cortó (se separó en aceite y líquido)? Pon una yema nueva en otro bol y agrega la mayonesa cortada de a poquito, batiendo como al principio. ¡Se recupera!",
    quimica: {
      proceso: "Emulsión",
      tipoCambio: "físico",
      tipoCambioNota:
        "El aceite y el agua no se transforman en otras sustancias: solo se reparten en gotitas muy pequeñas. Si la emulsión se rompe, vuelves a tener aceite y agua separados.",
      explicacion:
        "El aceite y el agua no se mezclan porque sus moléculas son muy diferentes: el agua es polar y el aceite no. Una emulsión es una mezcla en la que un líquido queda repartido en gotitas diminutas dentro de otro. En la mayonesa, las gotitas de aceite quedan dentro de un poquito de agua (la del limón y la yema). La lecitina de la yema es una molécula anfipática: una parte atrae al agua (hidrofílica) y otra atrae a la grasa (hidrofóbica). Por eso forma una capa protectora alrededor de cada gota y evita que se vuelvan a juntar.",
      ecuacionNota:
        "Aquí no hay ecuación química porque no se forman sustancias nuevas. Mira el dibujo: así se acomoda la lecitina alrededor de una gota de aceite.",
      diagrama: "lecitina",
      evidencias: [
        { icono: "🧈", texto: "Cambio de textura: de líquido a crema espesa" },
        { icono: "🤍", texto: "Cambio de color: de amarillo transparente a opaco y pálido" },
        { icono: "🚫", texto: "Las fases no se separan en capas" },
      ],
      factores: [
        {
          icono: "⏱️",
          nombre: "Velocidad",
          texto:
            "Si agregas el aceite muy rápido al principio, la lecitina no alcanza a cubrir las gotas, se juntan y la mayonesa se corta.",
        },
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto: "Con ingredientes muy fríos el aceite está más espeso y cuesta romperlo en gotas.",
        },
        {
          icono: "💧",
          nombre: "Proporción",
          texto:
            "Necesitas suficiente agua para rodear las gotas. Con mucho aceite y muy poca agua, la emulsión se rompe.",
        },
      ],
      datoCurioso:
        "Una sola yema tiene lecitina suficiente para emulsionar varios litros de aceite, siempre que también agregues agua. Lo que pone el límite en la mayonesa es el agua, ¡no la yema!",
    },
    quiz: [
      {
        pregunta: "¿Qué tipo de cambio es hacer mayonesa?",
        opciones: [
          "Físico: el aceite solo se reparte en gotitas",
          "Químico: el aceite se convierte en otra sustancia",
          "Nuclear",
          "Una fermentación",
        ],
        correcta: 0,
        explicacion: "No aparecen sustancias nuevas. Por eso, si se corta, vuelves a ver aceite y agua.",
      },
      {
        pregunta: "¿Qué hace la lecitina de la yema?",
        opciones: [
          "Rodea las gotas: una parte atrae al agua y otra a la grasa",
          "Disuelve el aceite y forma una sustancia nueva",
          "Le da el color amarillo",
          "Hace que el aceite se evapore",
        ],
        correcta: 0,
        explicacion: "Es una molécula anfipática: hace de puente entre el agua y el aceite.",
      },
      {
        pregunta: "¿Por qué se corta si agregas el aceite muy rápido al inicio?",
        opciones: [
          "Las gotas quedan grandes y sin cubrir, y se vuelven a juntar",
          "El aceite se calienta y se quema",
          "La yema se cocina",
          "La sal reacciona con el aceite",
        ],
        correcta: 0,
        explicacion: "La lecitina necesita tiempo para cubrir cada gota. Gota a gota al principio, ¡siempre!",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "merengues",
    nombre: "Merengues",
    emoji: "☁️",
    color: "lila",
    proceso: "Desnaturalización",
    tiempo: "2 h",
    porciones: "25 merengues pequeños",
    dificultad: 2,
    resumen:
      "Nubecitas crujientes hechas con claras batidas. Las proteínas se desenrollan y atrapan millones de burbujas.",
    ingredientes: [
      "3 claras de huevo (unos 100 g), a temperatura ambiente",
      "200 g (1 taza) de azúcar blanca fina",
      "½ cucharadita de jugo de limón (o ¼ cucharadita de cremor tártaro)",
      "½ cucharadita de esencia de vainilla (opcional)",
    ],
    pasos: [
      { texto: "Precalienta el horno a 100 °C y cubre una bandeja con papel de horno." },
      {
        texto:
          "Separa las claras con cuidado: no debe caer nada de yema. Usa un bol muy limpio y seco, mejor de vidrio o de metal.",
        quimica:
          "La grasa de la yema se mete entre las proteínas y les impide formar la espuma. Los bols de plástico pueden guardar restos de grasa aunque se vean limpios.",
      },
      {
        texto: "Bate las claras con el limón a velocidad media hasta formar picos suaves, unos 3 minutos.",
        temporizador: 3,
        quimica:
          "Las proteínas de la clara (como la ovoalbúmina) son cadenas enrolladas como ovillos de lana. El batidor y el aire las estiran y desenrollan: se desnaturalizan. Sus partes que rechazan el agua se acomodan hacia el aire y las proteínas se unen entre sí, formando una red alrededor de cada burbuja. El ácido del limón baja el pH y evita que las proteínas se unan demasiado, así la espuma no se seca ni se corta.",
      },
      {
        texto:
          "Agrega el azúcar de a una cucharada mientras sigues batiendo a velocidad alta. Bate hasta que el merengue esté brillante y firme, y no sientas granitos al frotar un poco entre los dedos (unos 7 minutos).",
        temporizador: 7,
        quimica:
          "El azúcar se disuelve en el agua de la clara y la vuelve más espesa, como un jarabe. Así el líquido no escurre de las paredes de las burbujas y la espuma se mantiene estable.",
      },
      {
        texto: "Agrega la vainilla, mezcla y forma los merengues con una manga pastelera o con dos cucharas.",
      },
      {
        texto:
          "Hornea 1 hora y 30 minutos a 100 °C. Apaga el horno y déjalos adentro, con la puerta entreabierta, hasta que se enfríen.",
        temporizador: 90,
        quimica:
          "A 100 °C los merengues no se doran: se secan. El agua se evapora y las proteínas terminan de coagular, así la espuma queda fija y crujiente. Si el horno está más caliente, aparece la reacción de Maillard y se ponen color beige.",
      },
    ],
    quimica: {
      proceso: "Desnaturalización de proteínas",
      tipoCambio: "ambos",
      tipoCambioNota:
        "Meter aire y evaporar agua son cambios físicos. La desnaturalización cambia la forma de las proteínas de manera permanente. En secundaria se suele considerar un cambio químico, aunque los enlaces entre los aminoácidos no se rompen: la proteína cambia su forma, no sus átomos. ¡Buen tema para debatir en clase!",
      explicacion:
        "Las proteínas son cadenas largas de aminoácidos plegadas con una forma específica. Cuando bates la clara, la fuerza del batidor y el contacto con el aire las desenrollan: eso se llama desnaturalización. Las proteínas desenrolladas se unen entre sí y forman una red que rodea las burbujas de aire, como una telaraña. El azúcar espesa el líquido y el ácido del limón regula cómo se unen las proteínas, así la espuma es más estable. En el horno, el agua se evapora y la red se endurece.",
      ecuacion: "proteína plegada (ovillo) -[batido + aire]-> proteína desnaturalizada (estirada)",
      esquema: true,
      ecuacionNota:
        "Esquema: la desnaturalización no se escribe con fórmulas, porque la proteína no cambia sus átomos, solo su forma.",
      evidencias: [
        { icono: "🫧", texto: "Burbujas de aire atrapadas en la espuma" },
        { icono: "⬆️", texto: "El volumen aumenta hasta 6 a 8 veces" },
        { icono: "🤍", texto: "Cambio de color: de transparente a blanco brillante" },
        { icono: "☁️", texto: "Cambio de textura: de líquido a espuma firme que forma picos" },
      ],
      factores: [
        {
          icono: "🧈",
          nombre: "Grasa",
          texto: "Una gotita de yema o un bol grasoso pueden arruinar la espuma.",
        },
        {
          icono: "🍋",
          nombre: "pH",
          texto: "Un poco de ácido (limón o cremor tártaro) estabiliza la espuma.",
        },
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto: "Las claras a temperatura ambiente se baten más rápido y dan más volumen que las frías.",
        },
        {
          icono: "⏱️",
          nombre: "Tiempo de batido",
          texto:
            "Si bates de más, la red se vuelve rígida, se rompe y suelta líquido: la espuma se “corta”.",
        },
      ],
      datoCurioso:
        "Los pasteleros franceses usan bols de cobre desde hace siglos para batir claras. Los iones de cobre se unen a una proteína de la clara (la conalbúmina) y la vuelven más estable, así la espuma casi no se corta.",
    },
    quiz: [
      {
        pregunta: "¿Qué significa que una proteína se desnaturaliza?",
        opciones: [
          "Cambia su forma: se desenrolla",
          "Se convierte en azúcar",
          "Se derrite como el hielo",
          "Se multiplica",
        ],
        correcta: 0,
        explicacion: "La proteína mantiene sus aminoácidos, pero pierde la forma plegada que tenía.",
      },
      {
        pregunta: "¿Por qué el bol tiene que estar sin nada de grasa?",
        opciones: [
          "La grasa impide que las proteínas formen la red de la espuma",
          "La grasa hace que el merengue sea salado",
          "La grasa cocina las claras",
          "No importa, es una superstición",
        ],
        correcta: 0,
        explicacion: "Las moléculas de grasa se meten entre las proteínas y las burbujas no se sostienen.",
      },
      {
        pregunta: "¿Para qué sirven las gotas de limón?",
        opciones: [
          "Bajan el pH y estabilizan la espuma",
          "Le dan color amarillo",
          "Hacen que se dore más rápido",
          "Disuelven el azúcar",
        ],
        correcta: 0,
        explicacion: "El ácido evita que las proteínas se unan demasiado y la espuma se seque.",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "limonada",
    nombre: "Limonada que cambia de color",
    emoji: "🍹",
    color: "celeste",
    proceso: "Indicador de pH",
    tiempo: "15 min",
    porciones: "4 vasos",
    dificultad: 1,
    resumen:
      "Empieza azul y se vuelve rosada cuando le pones limón. Ideal para mostrar en clase.",
    ingredientes: [
      "2 cucharadas de flores secas de guisante de mariposa (Clitoria ternatea), o ¼ de col morada picada",
      "500 ml (2 tazas) de agua caliente, sin que llegue a hervir",
      "500 ml (2 tazas) de agua fría",
      "Jugo de 4 limones (unos 120 ml)",
      "4 cucharadas de azúcar o miel (al gusto)",
      "Hielo",
      "1 pizca de bicarbonato de sodio (para el experimento extra)",
    ],
    pasos: [
      {
        texto:
          "Pon las flores en el agua caliente y déjalas reposar 5 minutos, hasta que el agua esté azul intenso. (Si usas col morada, hiérvela 10 minutos: el agua quedará morada).",
        temporizador: 5,
        quimica:
          "El agua caliente extrae las antocianinas, los pigmentos de las flores. Esta extracción es un cambio físico: el pigmento pasa de la flor al agua sin transformarse.",
      },
      {
        texto:
          "Cuela el té, agrégale el azúcar, revuelve y déjalo enfriar. Luego mézclalo con el agua fría. (El té de col morada sirve mejor como experimento que como bebida: sabe a repollo 😅).",
      },
      { texto: "Exprime los limones en una jarrita aparte." },
      { texto: "Llena los vasos con hielo y sirve el té azul. ¡Todavía no agregues el limón!" },
      {
        texto:
          "Frente a tu público, vierte el jugo de limón en cada vaso y mira cómo cambia de azul a morado y luego a rosado.",
        quimica:
          "El limón tiene ácido cítrico ({C6H8O7}). Al agregarlo, el pH baja y las moléculas de antocianina reciben iones {H^+}. Ese pequeño cambio en su estructura cambia qué colores de luz absorben, y por eso ves otro color. Cuanto más limón, más ácido y más rosado.",
      },
      {
        texto:
          "Experimento extra: en un vaso con té azul (este vaso es solo para mirar), agrega una pizca de bicarbonato. ¿De qué color se pone? Después agrégale limón.",
        quimica:
          "El bicarbonato es una base: sube el pH. La antocianina pierde iones {H^+} y se vuelve de un azul más verdoso. Si después agregas limón, vuelve a cambiar: es una reacción reversible.",
      },
    ],
    quimica: {
      proceso: "Indicador ácido-base (pH)",
      tipoCambio: "químico",
      tipoCambioNota:
        "La antocianina cambia su estructura al ganar o perder iones H⁺, y por eso cambia de color. Es un cambio químico reversible: si cambias el pH otra vez, vuelve al color anterior. ¡No todos los cambios químicos son para siempre!",
      explicacion:
        "El pH mide qué tan ácida o básica es una sustancia, en una escala de 0 a 14: menos de 7 es ácido, 7 es neutro y más de 7 es básico. Las antocianinas son pigmentos naturales que funcionan como indicadores de pH: su color depende de cuántos iones {H^+} hay a su alrededor. En el té de flor de guisante de mariposa, la antocianina es azul cuando el pH es casi neutro. El jugo de limón tiene un pH de 2 a 3; al agregarlo, la antocianina gana iones {H^+}, cambia su forma y se vuelve morada y luego rosada.",
      ecuacion: "antocianina (azul) + H^+ <=> antocianina-H^+ (rosada)",
      esquema: true,
      ecuacionNota:
        "Esquema simplificado: las antocianinas tienen varias formas según el pH, y cada forma tiene su color. Usamos la doble flecha (⇌) porque la reacción puede ir en los dos sentidos.",
      diagrama: "ph",
      evidencias: [
        { icono: "🎨", texto: "Cambio de color: azul → morado → rosado" },
        { icono: "🔁", texto: "El cambio se revierte si subes el pH con bicarbonato" },
      ],
      factores: [
        {
          icono: "🧪",
          nombre: "pH",
          texto: "Es el factor principal: decide qué forma tiene la antocianina y, por lo tanto, su color.",
        },
        {
          icono: "💧",
          nombre: "Concentración",
          texto: "Más flores o menos agua dan colores más intensos.",
        },
        {
          icono: "🌡️",
          nombre: "Temperatura y luz",
          texto: "El calor prolongado y la luz del sol degradan las antocianinas y el color se apaga.",
        },
      ],
      datoCurioso:
        "Con agua de col morada puedes armar tu propia escala de pH: en vinagre se pone rosada, en agua queda morada y con bicarbonato se vuelve azul verdosa. Las mismas familias de pigmentos dan color a los arándanos, las uvas y las frambuesas.",
    },
    quiz: [
      {
        pregunta: "Una sustancia con pH menor que 7 es...",
        opciones: ["Ácida", "Básica", "Neutra", "Siempre caliente"],
        correcta: 0,
        explicacion: "En la escala de pH: menos de 7 es ácido, 7 es neutro y más de 7 es básico.",
      },
      {
        pregunta: "¿Por qué la limonada cambia de color?",
        opciones: [
          "El ácido del limón cambia la estructura de las antocianinas",
          "El limón trae colorante rosado",
          "El hielo enfría el pigmento",
          "El azúcar reacciona con el agua",
        ],
        correcta: 0,
        explicacion: "Al bajar el pH, las antocianinas ganan iones {H^+} y absorben otros colores de luz.",
      },
      {
        pregunta: "Si a la limonada rosada le agregas bicarbonato, ¿qué esperas?",
        opciones: [
          "Que vuelva hacia morado o azul, porque es reversible",
          "Que se ponga negra",
          "Que no cambie nada",
          "Que se congele",
        ],
        correcta: 0,
        explicacion: "El bicarbonato es una base: sube el pH y la antocianina vuelve a su forma azul.",
      },
    ],
  },

  /* -------------------------------------------------------------- */
  {
    id: "gelatina",
    nombre: "Gelatina de frutas",
    emoji: "🍓",
    color: "menta",
    proceso: "Gelificación",
    tiempo: "4 h 30 min",
    porciones: "6 vasitos",
    dificultad: 1,
    resumen:
      "Un líquido que se vuelve sólido y tembloroso al enfriarse. Y un misterio: ¿por qué la piña fresca lo arruina?",
    ingredientes: [
      "2 sobres (14 g) de gelatina sin sabor",
      "60 ml (¼ taza) de agua fría",
      "500 ml (2 tazas) de jugo de fruta (uva, naranja o manzana)",
      "2 a 3 cucharadas de azúcar (opcional, según el jugo)",
      "1½ tazas de fruta picada: fresas, uvas, mandarina, durazno en almíbar o piña de lata",
      "🚫 No uses piña, papaya ni kiwi frescos (lee el dato curioso 💡)",
    ],
    pasos: [
      {
        texto: "Espolvorea la gelatina sobre el agua fría y espera 5 minutos sin revolver.",
        temporizador: 5,
        quimica:
          "Esto se llama hidratar. Los gránulos de gelatina absorben agua y se hinchan. Si los echas directo en un líquido caliente, se forman grumos.",
      },
      { texto: "Calienta la mitad del jugo con el azúcar hasta que esté bien caliente, pero sin hervir." },
      {
        texto: "Retira del fuego, agrega la gelatina hidratada y revuelve hasta que se disuelva por completo.",
        quimica:
          "Con el calor, las largas cadenas de proteína de la gelatina se separan y se mueven libres en el líquido, como fideos sueltos en una sopa. Por ahora sigue siendo un líquido.",
      },
      { texto: "Agrega el resto del jugo, frío, y mezcla. Vierte en vasitos o en un molde." },
      {
        texto: "Refrigera 30 minutos, hasta que empiece a espesar, y entonces agrega la fruta.",
        temporizador: 30,
        quimica:
          "Si agregas la fruta cuando la gelatina está muy líquida, flota. Cuando ya espesó un poco, la red empezó a formarse y sostiene la fruta en su lugar.",
      },
      {
        texto: "Refrigera al menos 4 horas, hasta que esté firme.",
        temporizador: 240,
        quimica:
          "Al enfriarse, las cadenas de proteína vuelven a enrollarse en parte y se unen entre sí en algunos puntos. Así forman una red tridimensional que atrapa el agua, como una esponja diminuta. Eso es la gelificación.",
      },
    ],
    quimica: {
      proceso: "Gelificación",
      tipoCambio: "físico",
      tipoCambioNota:
        "Cuajar la gelatina es un cambio físico reversible: si la calientas se derrite y si la enfrías vuelve a cuajar. (Fabricar la gelatina a partir del colágeno sí es un cambio químico: una hidrólisis que se hace en la fábrica).",
      explicacion:
        "La gelatina se obtiene del colágeno, una proteína de la piel y los huesos de los animales. En la fábrica, el colágeno se hidroliza en parte: sus fibras largas se rompen en cadenas más cortas que se disuelven en agua caliente. Al enfriarse, esas cadenas se enredan y se unen en algunos puntos, formando una red tridimensional que atrapa el agua. Así un líquido se convierte en un gel: un sólido blandito que es casi todo agua. La gelatina se derrite cerca de los 35 °C, un poco menos que la temperatura de tu boca, por eso se deshace al comerla.",
      ecuacion: "proteína + H2O -[bromelina o papaína]-> péptidos + aminoácidos",
      ecuacionLeyenda: "La hidrólisis que hacen las enzimas de la piña y la papaya",
      esquema: true,
      ecuacionNota:
        "La gelificación en sí no tiene ecuación, porque es un cambio físico. Este esquema muestra lo que hacen las enzimas de la piña y la papaya: rompen las proteínas usando agua (hidrólisis). Las enzimas son catalizadores, por eso van sobre la flecha: participan, pero no se gastan.",
      evidencias: [
        { icono: "🍮", texto: "Cambio de textura: de líquido a sólido tembloroso" },
        { icono: "🔁", texto: "Es reversible: se derrite con calor y cuaja con frío" },
        { icono: "✨", texto: "Se mantiene transparente: el agua queda atrapada, no desaparece" },
      ],
      factores: [
        {
          icono: "🌡️",
          nombre: "Temperatura",
          texto: "Cuaja al enfriarse en el refrigerador y se derrite cerca de los 35 °C.",
        },
        {
          icono: "⚖️",
          nombre: "Concentración",
          texto: "Más gelatina por taza de líquido da un gel más firme.",
        },
        {
          icono: "🍍",
          nombre: "Enzimas",
          texto: "Las enzimas de algunas frutas frescas rompen las cadenas de proteína y la red no se forma.",
        },
        {
          icono: "🍋",
          nombre: "pH",
          texto: "Un líquido muy ácido debilita la red y el gel queda más blando.",
        },
        {
          icono: "⏱️",
          nombre: "Tiempo",
          texto: "La red se sigue fortaleciendo durante varias horas en el frío.",
        },
      ],
      datoCurioso:
        "La piña, la papaya y el kiwi frescos no dejan cuajar la gelatina. Tienen enzimas (bromelina, papaína y actinidina) que cortan las cadenas de proteína como tijeritas, así la red nunca se forma. ¡Pero la piña de lata sí funciona! Al envasarla la calientan, y el calor desnaturaliza esas enzimas.",
    },
    quiz: [
      {
        pregunta: "¿Qué atrapa la red de proteínas de la gelatina?",
        opciones: ["Agua", "Aire", "Aceite", "Dióxido de carbono"],
        correcta: 0,
        explicacion: "El gel es casi todo agua, atrapada dentro de una red de cadenas de proteína.",
      },
      {
        pregunta: "¿Por qué la piña fresca no deja cuajar la gelatina?",
        opciones: [
          "Sus enzimas rompen las proteínas de la gelatina",
          "Es demasiado dulce",
          "Tiene mucho aire",
          "Está muy fría",
        ],
        correcta: 0,
        explicacion: "La bromelina corta las cadenas de proteína y la red no se puede formar.",
      },
      {
        pregunta: "Que la gelatina cuaje en el refrigerador es un cambio...",
        opciones: [
          "Físico y reversible",
          "Químico e irreversible",
          "Una fermentación",
          "Una reacción ácido-base",
        ],
        correcta: 0,
        explicacion: "Si la calientas se vuelve líquida otra vez: no se formaron sustancias nuevas.",
      },
    ],
  },
];

/* =====================================================================
   📋 PLANTILLA PARA UNA RECETA NUEVA
   Copia todo lo que está entre /* y * / (sin las marcas), pégalo dentro
   de RECETAS justo antes del "];" de arriba, y pon una coma después de
   la receta anterior.
   =====================================================================

  {
    id: "mi-receta",                 // sin espacios ni tildes, debe ser único
    nombre: "Nombre de la receta",
    emoji: "🧁",
    color: "rosa",                   // rosa, lila, menta, durazno, celeste, amarillo
    proceso: "Nombre del proceso",   // se usa para los filtros de la galería
    tiempo: "30 min",
    porciones: "4 porciones",
    dificultad: 1,                   // 1, 2 o 3
    resumen: "Una frase corta y tierna sobre la receta.",
    seguridad: "",                   // opcional: aviso de seguridad
    ingredientes: [
      "Ingrediente 1",
      "Ingrediente 2",
    ],
    pasos: [
      { texto: "Paso sin química." },
      {
        texto: "Paso con química y temporizador.",
        temporizador: 10,            // opcional, en minutos
        quimica: "Explicación de lo que pasa. Fórmulas entre llaves: {CO2}.",
      },
    ],
    consejo: "",                     // opcional
    quimica: {
      proceso: "Nombre completo del proceso",
      tipoCambio: "químico",         // "químico", "físico" o "ambos"
      tipoCambioNota: "Por qué es ese tipo de cambio.",
      explicacion: "Explicación sencilla de 3 a 5 oraciones.",
      ecuacion: "A + B -> C",        // opcional
      ecuacionLeyenda: "",           // opcional: la ecuación en palabras
      esquema: false,                // true si es un esquema y no una ecuación balanceada
      ecuacionNota: "",              // opcional: aclaraciones o simplificaciones
      evidencias: [
        { icono: "🫧", texto: "Qué se observa" },
      ],
      factores: [
        { icono: "🌡️", nombre: "Temperatura", texto: "Cómo la afecta." },
      ],
      datoCurioso: "Algo sorprendente.",
    },
    quiz: [
      {
        pregunta: "¿Pregunta?",
        opciones: ["Opción A", "Opción B", "Opción C"],
        correcta: 0,                 // posición de la correcta: 0 es la primera
        explicacion: "Por qué es la correcta.",
      },
    ],
  },
*/
