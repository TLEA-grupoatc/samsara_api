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
      const systemPrompt = `Eres un asistente que convierte preguntas a código Sequelize. Genera solo el código JS sin explicaciones.`;

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
