module.exports = app => {
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
  const OpenAI = require('openai');
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const Sequelize = require('sequelize');
  const { literal } = require('sequelize');
  const liquidacion = app.database.models.Liquidaciones;
  const podeope = app.database.models.PonderacionOperador;
  const Op = Sequelize.Op;

  app.preguntarLiquidaciones = async (req, res) => {
    try {
      const pregunta = req.params.pregunta;

      if(!pregunta) {
        return res.status(400).json({ error: 'Falta la pregunta' });
      }

      const systemPrompt = `
        Eres un desarrollador senior experto en Node.js y Sequelize.
        Tu única tarea es traducir la pregunta del usuario en una consulta de Sequelize.

        CONTEXTO DE BASE DE DATOS:
        Asume que ya existe un modelo de Sequelize definido así:
        const Liquidaciones = sequelize.define('Liquidaciones', {
          id_liquidacion: { type: DataTypes.INTEGER, primaryKey: true },
          operador: { type: DataTypes.STRING },
          monto: { type: DataTypes.FLOAT },
          fecha: { type: DataTypes.STRING }, // Formato 'YYYY-MM-DD HH:mm:ss'
          estado: { type: DataTypes.STRING }, // Valores: 'OCULTO', 'COMPLETO', 'CANCELADO', 'PENDIENTE DE FIRMA', 'EN PROCESO', 'POR REVISAR', 'PENDIENTE DE PAGO', 'RECHAZADO', 'POR AUTORIZAR COBRO DE DIFERENCIA', 'REVISION DE DIFERENCIA'
          folio: { type: DataTypes.STRING }, // Formato 'MTY-XXXXXX', 'MTY2-XXXXXX', 'MTY3-XXXXXX', 'MTY4-XXXXXX', 'MTY5-XXXXXX'
          terminal: { type: DataTypes.STRING }, // Formato 'MTY', 'MTY2', 'MTY3', 'MTY4', 'MTY5'
          diferencia_diesel: { type: DataTypes.FLOAT },
          diferenciakilometros: { type: DataTypes.FLOAT }
        });

        VARIABLES DISPONIBLES:
        La función que ejecutará tu código ya te provee las variables:
        - 'Liquidaciones': El modelo de Sequelize.
        - 'sequelize': La instancia de Sequelize (para 'fn' y 'col').
        - 'Op': El objeto 'Op' de Sequelize (para [Op.like], [Op.gte], etc.).

        REGLAS DE TRADUCCIÓN:
        1. 'pendiente de pago', 'para pago' -> significa { estado: 'PENDIENTE DE PAGO' }
        1. 'pendiente de firma', 'para firma' -> significa { estado: 'PENDIENTE DE FIRMA' }
        2. 'rechazadas' -> significa { estado: 'RECHAZADO' }
        2. 'en rechazo' -> significa { estado: 'RECHAZADO' }
        3. 'pagadas' -> significa { estado: 'COMPLETO' }
        3. 'proceso', 'en proceso' -> significa { estado: 'COMPLETO' }
        4. 'de [nombre]' (ej: "de hugo guerrero") -> significa { operador: { [Op.like]: '%hugo guerrero%' } }
        5. 'del mes' -> Asume el mes actual. Si hoy es Octubre (10) de 2025, usa { fecha: { [Op.like]: '2025-10-%' } }
        6. 'de la semana' -> Asume la semana actual. Si hoy es 2025-10-15, usa { fecha: { [Op.like]: '2025-10-1%' } }
        7. 'liquidador con mas liquidaciones' -> Debes usar 'sequelize.fn', 'sequelize.col', 'group' y 'order'.

        REGLAS DE SALIDA:
        - Genera ÚNICAMENTE el código de la consulta.
        - NO incluyas 'await', 'const datos =', comentarios, ni explicaciones.
        - NO uses bloques de código \`\`\`.
        - Tu salida debe ser una expresión de Sequelize que devuelva una promesa, lista para ser insertada en \`return \${codigo};\`.

        EJEMPLOS DE SALIDA:
        Pregunta: cuales son rechazadas
        Salida: Liquidaciones.findAll({ where: { estado: 'RECHAZADO' } })

        Pregunta: liquidacion de hugo guerrero para pago
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' }, estado: 'PENDIENTE DE PAGO' } })

        Pregunta: liquidacion de hugo guerrero para firma
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' }, estado: 'PENDIENTE DE FIRMA' } })

        Pregunta: liquidaciones de hugo guerrero
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' } } })

        Pregunta: reporte de liquidaciones del mes
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' } } })

        Pregunta: reporte de liquidaciones de la semana
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' } } })

        Pregunta: ¿Cual es el estatus de la liquidación de HUGO GUERRERO?
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%HUGO GUERRERO%' } } })

        Pregunta: ¿Cuantos operadores se liquidaron la semana anterior de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-1%' }, terminal: 'MTY5' } })

        Pregunta: ¿Cuantos operadores se han liquidado esta semana de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' }, terminal: 'MTY5' } })

        Pregunta: ¿Cuantos operadores tienen liquidación pendiente por firmar de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { estado: 'PENDIENTE DE FIRMA', terminal: 'MTY5' } })

        Pregunta: ¿Cuantos operadores tienen liquidación pendiente por pago de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { estado: 'PENDIENTE DE PAGO', terminal: 'MTY5' } })

        Pregunta: ¿Cuales son los motivos de rechazo en liquidacion mas frecuentes de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { estado: 'RECHAZADO', terminal: 'MTY5' } })

        Pregunta: liquidador con mas liquidaciones
        Salida: Liquidaciones.findAll({
          attributes: ['operador', [sequelize.fn('COUNT', sequelize.col('usuario')), 'total']],
          group: ['operador'],
          order: [[sequelize.fn('COUNT', sequelize.col('usuario')), 'DESC']],
          limit: 1
        })
      `;

      const chatCompletion =  await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: pregunta }
          ],
          temperature: 0 // Esencial para que siga las reglas estrictamente
      });

      const codigo = chatCompletion.choices[0].message.content.trim();

      // Filtro de seguridad
      if(/destroy|drop|update|delete|insert/i.test(codigo)) {
          return res.status(400).json({ error: 'Consulta no permitida.' });
      }

      // Si el código está vacío o es inválido, puede fallar aquí
      if(!codigo || !codigo.startsWith("Liquidaciones.")) {
        if(codigo.includes("Promise.resolve([])")) {
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
    } 
    catch (error) {
      console.error('Error en la ruta:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  };


  
  app.preguntarPonderacionOp = async (req, res) => {
    try {
      const pregunta = req.params.pregunta;

      if(!pregunta) {
        return res.status(400).json({ error: 'Falta la pregunta' });
      }

      const systemPrompt = `
        Eres un desarrollador senior experto en Node.js y Sequelize.
        Tu única tarea es traducir la pregunta del usuario en una consulta de Sequelize.

        CONTEXTO DE BASE DE DATOS:
        Asume que ya existe un modelo de Sequelize definido así:
        const Liquidaciones = sequelize.define('Liquidaciones', {
          id_liquidacion: { type: DataTypes.INTEGER, primaryKey: true },
          operador: { type: DataTypes.STRING },
          monto: { type: DataTypes.FLOAT },
          fecha: { type: DataTypes.STRING }, // Formato 'YYYY-MM-DD HH:mm:ss'
          estado: { type: DataTypes.STRING }, // Valores: 'OCULTO', 'COMPLETO', 'CANCELADO', 'PENDIENTE DE FIRMA', 'EN PROCESO', 'POR REVISAR', 'PENDIENTE DE PAGO', 'RECHAZADO', 'POR AUTORIZAR COBRO DE DIFERENCIA', 'REVISION DE DIFERENCIA'
          folio: { type: DataTypes.STRING }, // Formato 'MTY-XXXXXX', 'MTY2-XXXXXX', 'MTY3-XXXXXX', 'MTY4-XXXXXX', 'MTY5-XXXXXX'
          terminal: { type: DataTypes.STRING }, // Formato 'MTY', 'MTY2', 'MTY3', 'MTY4', 'MTY5'
          diferencia_diesel: { type: DataTypes.FLOAT },
          diferenciakilometros: { type: DataTypes.FLOAT }
        });

        VARIABLES DISPONIBLES:
        La función que ejecutará tu código ya te provee las variables:
        - 'Liquidaciones': El modelo de Sequelize.
        - 'sequelize': La instancia de Sequelize (para 'fn' y 'col').
        - 'Op': El objeto 'Op' de Sequelize (para [Op.like], [Op.gte], etc.).

        REGLAS DE TRADUCCIÓN:
        1. 'pendiente de pago', 'para pago' -> significa { estado: 'PENDIENTE DE PAGO' }
        1. 'pendiente de firma', 'para firma' -> significa { estado: 'PENDIENTE DE FIRMA' }
        2. 'rechazadas' -> significa { estado: 'RECHAZADO' }
        2. 'en rechazo' -> significa { estado: 'RECHAZADO' }
        3. 'pagadas' -> significa { estado: 'COMPLETO' }
        3. 'proceso', 'en proceso' -> significa { estado: 'COMPLETO' }
        4. 'de [nombre]' (ej: "de hugo guerrero") -> significa { operador: { [Op.like]: '%hugo guerrero%' } }
        5. 'del mes' -> Asume el mes actual. Si hoy es Octubre (10) de 2025, usa { fecha: { [Op.like]: '2025-10-%' } }
        6. 'de la semana' -> Asume la semana actual. Si hoy es 2025-10-15, usa { fecha: { [Op.like]: '2025-10-1%' } }
        7. 'liquidador con mas liquidaciones' -> Debes usar 'sequelize.fn', 'sequelize.col', 'group' y 'order'.

        REGLAS DE SALIDA:
        - Genera ÚNICAMENTE el código de la consulta.
        - NO incluyas 'await', 'const datos =', comentarios, ni explicaciones.
        - NO uses bloques de código \`\`\`.
        - Tu salida debe ser una expresión de Sequelize que devuelva una promesa, lista para ser insertada en \`return \${codigo};\`.

        EJEMPLOS DE SALIDA:
        Pregunta: cuales son rechazadas
        Salida: Liquidaciones.findAll({ where: { estado: 'RECHAZADO' } })

        Pregunta: liquidacion de hugo guerrero para pago
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' }, estado: 'PENDIENTE DE PAGO' } })

        Pregunta: liquidacion de hugo guerrero para firma
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' }, estado: 'PENDIENTE DE FIRMA' } })

        Pregunta: liquidaciones de hugo guerrero
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%hugo guerrero%' } } })

        Pregunta: reporte de liquidaciones del mes
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' } } })

        Pregunta: reporte de liquidaciones de la semana
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' } } })

        Pregunta: ¿Cual es el estatus de la liquidación de HUGO GUERRERO?
        Salida: Liquidaciones.findAll({ where: { operador: { [Op.like]: '%HUGO GUERRERO%' } } })

        Pregunta: ¿Cuantos operadores se liquidaron la semana anterior de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-1%' }, terminal: 'MTY5' } })

        Pregunta: ¿Cuantos operadores se han liquidado esta semana de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { fecha: { [Op.like]: '%2025-10-%' }, terminal: 'MTY5' } })

        Pregunta: ¿Cuantos operadores tienen liquidación pendiente por firmar de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { estado: 'PENDIENTE DE FIRMA', terminal: 'MTY5' } })

        Pregunta: ¿Cuantos operadores tienen liquidación pendiente por pago de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { estado: 'PENDIENTE DE PAGO', terminal: 'MTY5' } })

        Pregunta: ¿Cuales son los motivos de rechazo en liquidacion mas frecuentes de la unidad 5?
        Salida: Liquidaciones.findAll({ where: { estado: 'RECHAZADO', terminal: 'MTY5' } })

        Pregunta: liquidador con mas liquidaciones
        Salida: Liquidaciones.findAll({
          attributes: ['operador', [sequelize.fn('COUNT', sequelize.col('usuario')), 'total']],
          group: ['operador'],
          order: [[sequelize.fn('COUNT', sequelize.col('usuario')), 'DESC']],
          limit: 1
        })
      `;

      const chatCompletion =  await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: pregunta }
          ],
          temperature: 0 // Esencial para que siga las reglas estrictamente
      });

      const codigo = chatCompletion.choices[0].message.content.trim();

      // Filtro de seguridad
      if(/destroy|drop|update|delete|insert/i.test(codigo)) {
          return res.status(400).json({ error: 'Consulta no permitida.' });
      }

      // Si el código está vacío o es inválido, puede fallar aquí
      if(!codigo || !codigo.startsWith("Liquidaciones.")) {
        if(codigo.includes("Promise.resolve([])")) {
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
    } 
    catch (error) {
      console.error('Error en la ruta:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  };
  
  return app;
};
