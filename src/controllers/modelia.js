module.exports = app => {
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
const OpenAI = require('openai');

const Sequelize = require('sequelize');
const { literal } = require('sequelize');
const liquidacion = app.database.models.Liquidaciones;
const Op = Sequelize.Op;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  app.preguntar = async (req, res) => {
    try {
    //   const pregunta = req.params.pregunta;
    //   if(!pregunta) return res.status(400).json({ error: 'Falta la pregunta' });

    //   const schema = `Tabla Liquidaciones: id_liquidacion(INT), operador(STRING), monto(FLOAT), fecha(STRING), estado(STRING), folio(STRING)`;
    //   const systemPrompt = `Eres un asistente que convierte preguntas a código Sequelize. Genera solo el código JS sin explicaciones.`;

    //   const chat = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       { role: 'system', content: systemPrompt + '\n' + schema },
    //       { role: 'user', content: pregunta }
    //     ],
    //     temperature: 0
    //   });
    //   const codigo = chat.choices[0].message.content.trim();

    //   if(/destroy|drop|update|delete|insert/i.test(codigo)) {
    //     return res.status(400).json({ error: 'Consulta no permitida.' });
    //   }

    //   const fn = new AsyncFunction(
    //     'Liquidaciones', 'sequelize', 'Op',
    //     `'use strict';\nreturn (async () => { return ${codigo}; })();`
    //   );
    //   const datos = await fn(liquidacion, Sequelize, Sequelize.Op);

    //   // res.json({ ok: true, code: codigo, datos });
    //   res.json({ ok: true, respuesta: datos });











    // --- COPIA Y PEGA ESTE CÓDIGO EN TU RUTA DE EXPRESS ---

// Asume que 'liquidacion' (el modelo), 'Sequelize' y 'AsyncFunction' están definidos fuera de esta ruta.
// const liquidacion = ...; // Tu modelo Sequelize 'Liquidaciones'
// const Sequelize = ...; // La instancia de Sequelize
// const { Op } = require('sequelize');
// const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
// const chat = ...; // Tu cliente de OpenAI/Gemini/etc.

try {
    const pregunta = req.params.pregunta;
    if (!pregunta) {
        return res.status(400).json({ error: 'Falta la pregunta' });
    }

    // ESTE ES EL NUEVO PROMPT DETALLADO
    // Define el modelo y las reglas de traducción.
    const systemPrompt = `
Eres un desarrollador senior experto en Node.js y Sequelize.
Tu única tarea es traducir la pregunta del usuario en una consulta de Sequelize.

CONTEXTO DE BASE DE DATOS:
Asume que ya existe un modelo de Sequelize definido así:
const Liquidaciones = sequelize.define('Liquidaciones', {
  id_liquidacion: { type: DataTypes.INTEGER, primaryKey: true },
  operador: { type: DataTypes.STRING },
  monto: { type: DataTypes.FLOAT },
  fecha: { type: DataTypes.STRING }, // Formato 'YYYY-MM-DD'
  estado: { type: DataTypes.STRING }, // Valores: 'pendiente', 'pagada', 'rechazada'
  folio: { type: DataTypes.STRING }
});

VARIABLES DISPONIBLES:
La función que ejecutará tu código ya te provee las variables:
- 'Liquidaciones': El modelo de Sequelize.
- 'sequelize': La instancia de Sequelize (para 'fn' y 'col').
- 'Op': El objeto 'Op' de Sequelize (para [Op.like], [Op.gte], etc.).

REGLAS DE TRADUCCIÓN:
1. 'pendiente de pago', 'para pago' -> significa { estado: 'pendiente' }
2. 'rechazadas' -> significa { estado: 'rechazada' }
3. 'pagadas' -> significa { estado: 'pagada' }
4. 'de [nombre]' (ej: "de hugo guerrero") -> significa { operador: { [Op.like]: '%hugo guerrero%' } }
5. 'del mes' -> Asume el mes actual. Si hoy es Octubre (10) de 2025, usa { fecha: { [Op.like]: '2025-10-%' } }
6. 'de la semana' -> No puedes procesar esto, devuelve una lista vacía: Promise.resolve([])
7. 'liquidador con mas liquidaciones' -> Debes usar 'sequelize.fn', 'sequelize.col', 'group' y 'order'.

REGLAS DE SALIDA:
- Genera ÚNICAMENTE el código de la consulta.
- NO incluyas 'await', 'const datos =', comentarios, ni explicaciones.
- NO uses bloques de código \`\`\`.
- Tu salida debe ser una expresión de Sequelize que devuelva una promesa, lista para ser insertada en \`return \${codigo};\`.

EJEMPLOS DE SALIDA:
Pregunta: cuales son rechazadas
Salida: Liquidaciones.findAll({ where: { estado: 'rechazada' } })

Pregunta: liquidacion de hugo guerrero para pago
Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' }, estado: 'pendiente' } })

Pregunta: reporte de liquidaciones del mes
Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' } } })

Pregunta: liquidador con mas liquidaciones
Salida: Liquidaciones.findAll({
  attributes: ['operador', [sequelize.fn('COUNT', sequelize.col('id_liquidacion')), 'total']],
  group: ['operador'],
  order: [[sequelize.fn('COUNT', sequelize.col('id_liquidacion')), 'DESC']],
  limit: 1
})
    `; // Fin del systemPrompt

    const chatCompletion =  await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: pregunta }
        ],
        temperature: 0 // Esencial para que siga las reglas estrictamente
    });

    const codigo = chatCompletion.choices[0].message.content.trim();

    // Filtro de seguridad (¡Muy bien hecho!)
    if (/destroy|drop|update|delete|insert/i.test(codigo)) {
        return res.status(400).json({ error: 'Consulta no permitida.' });
    }

    // Si el código está vacío o es inválido, puede fallar aquí
    if (!codigo || !codigo.startsWith("Liquidaciones.")) {
        if(codigo.includes("Promise.resolve([])")) {
             // Maneja el caso de "la semana"
             return res.json({ ok: true, respuesta: [] });
        }
        console.error("Respuesta de IA no válida:", codigo);
        return res.status(500).json({ error: 'Error al generar la consulta de IA.' });
    }

    const fn = new AsyncFunction(
        'Liquidaciones', 'sequelize', 'Op',
        `'use strict';\nreturn (async () => { return ${codigo}; })();`
    );

    // Asume que 'liquidacion' es tu modelo 'Liquidaciones' importado
    const datos = await fn(liquidacion, Sequelize, Sequelize.Op);

    res.json({ ok: true, respuesta: datos });

} catch (error) {
    console.error('Error en la ruta:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
}

// --- FIN DEL CÓDIGO ---
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  return app;
};
