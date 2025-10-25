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
      const pregunta = req.params.pregunta;
      if(!pregunta) return res.status(400).json({ error: 'Falta la pregunta' });

      const schema = `Tabla Liquidaciones: id_liquidacion(INT), operador(STRING), monto(FLOAT), fecha(STRING), estado(STRING), folio(STRING)`;
      // const systemPrompt = `Eres un asistente que convierte preguntas a código Sequelize. Genera solo el código JS sin explicaciones.`;
      const systemPrompt = `Quiero que actúes como un desarrollador senior experto en Node.js, Sequelize y MySQL. Eres el arquitecto principal y mantenedor de un sistema de gestión de 'liquidaciones'. Tu trabajo es ayudarme a mí (que soy un gerente o usuario de negocio) a obtener datos del sistema.

Contexto Técnico: El backend está en Node.js con Sequelize, conectado a una base de datos MySQL.

Modelos de Datos Supuestos (Tablas): Para tus respuestas, asume que tenemos los siguientes modelos de Sequelize:

Usuario:

id (numérico)

nombre (string, ej: "Hugo")

apellido (string, ej: "Guerrero")

rol (string, ej: 'liquidador', 'admin')

Liquidacion:

id (numérico)

monto (decimal)

fecha_creacion (datetime)

fecha_pago (datetime, puede ser null)

estatus (string, con valores: 'pendiente', 'pagada', 'rechazada')

usuarioId (foreign key a Usuario. Este es el 'liquidador')

Asociaciones de Sequelize:

Usuario.hasMany(Liquidacion, { foreignKey: 'usuarioId' })

Liquidacion.belongsTo(Usuario, { as: 'liquidador', foreignKey: 'usuarioId' })

Tu Tarea: Yo te haré preguntas en lenguaje natural, de forma coloquial. Tú debes:

Entender mi pregunta.

Traducirla mentalmente a la consulta de Sequelize (usando Op, fn, col, where, include, group, order, etc.) necesaria para obtener esa información.

Darme una respuesta directa y humanizada a mi pregunta.

Importante: Después de tu respuesta, muéstrame el fragmento de código de Sequelize que usarías para generar esa respuesta, dentro de un bloque de código.

Ejemplo de cómo debes responder:

Mi Pregunta: "Oye, ¿cuáles liquidaciones están pendientes de pago?"

Tu Respuesta: "¡Hola! Claro, revisando el sistema, las liquidaciones que están marcadas como 'pendientes' son la #1045 ($2,500) y la #1046 ($1,200).

JavaScript

const { Op } = require('sequelize');

const pendientes = await Liquidacion.findAll({
  where: {
    estatus: 'pendiente'
  },
  attributes: ['id', 'monto']
});
Empieza ahora. Estás listo para mi primera pregunta.`;

      const chat = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt + '\n' + schema },
          { role: 'user', content: pregunta }
        ],
        temperature: 0
      });
      const codigo = chat.choices[0].message.content.trim();

      if(/destroy|drop|update|delete|insert/i.test(codigo)) {
        return res.status(400).json({ error: 'Consulta no permitida.' });
      }

      const fn = new AsyncFunction(
        'Liquidaciones', 'sequelize', 'Op',
        `'use strict';\nreturn (async () => { return ${codigo}; })();`
      );
      const datos = await fn(liquidacion, Sequelize, Sequelize.Op);

      // res.json({ ok: true, code: codigo, datos });
      res.json({ ok: true, respuesta: datos });
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  return app;
};
