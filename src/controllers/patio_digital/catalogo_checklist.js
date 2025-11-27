const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = app => {

    const CatalogoFamilia = app.database.models.CatalogoFamilia;
    const CatalogoComponente = app.database.models.CatalogoComponente;

    const CatalogoChecklist = app.database.models.CatalogoChecklist;
    
    const Sequelize = app.database.sequelize;
    const io = app.io;

    const saveBase64File = (base64Data, type, sucesivo) => {
        
        const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/documentos_catalogo_checklist');
    
        if (!fs.existsSync(evidenciaEntregadasPath)) {
        fs.mkdirSync(evidenciaEntregadasPath, { recursive: true });
        }
    
        const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
        throw new Error('Formato base64 inválido');
        }
    
        const DateFormated = moment().format('DD.MM.YYYY_hh.mm');
    
        const mimeType = matches[1];
        const extension = mimeType.split('/')[1];
    
        const buffer = Buffer.from(matches[2], 'base64');

        let filename = `${type}_${sucesivo}_${DateFormated}.${extension}`;
        
        const filePath = path.join(evidenciaEntregadasPath, filename);
        fs.writeFileSync(filePath, buffer);
        return filename;
    }

    
    app.obtenerSoloFamilias = async (req, res) => {

        try {

            const familias = await Sequelize.query(
                `
                    SELECT
                        id_familia,
                        nombre_familia
                    FROM
                        pd_catalogo_familia
                    WHERE
                        nombre_familia NOT IN ('INTERCAMBIOS', 'Pendiente');
                `,
                {
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return res.status(200).json(familias);

        } catch (error) {
            console.error('Error al obtener solo familias:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerSoloComponentes = async (req, res) => {

        try {

            const componentes = await Sequelize.query(
                `
                    SELECT
                        id_componente,
                        nombre_componente
                    FROM
                        pd_catalogo_componente
                    WHERE
                        nombre_componente NOT IN ('INTERCAMBIOS', 'Pendiente');
                `,
                {
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return res.status(200).json(componentes);

        } catch (error) {
            console.error('Error al obtener solo componentes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerFamilias = async (req, res) => {

        try {

            const familias = await CatalogoFamilia.findAll({
                order: [['activo', 'DESC']],
                include: [{
                    model: CatalogoComponente,
                    separate: true,
                    order: [['activo', 'DESC']],
                }],
            });

            // console.log(JSON.stringify(familias, null, 2));

            return res.status(200).json({
                OK: true,
                msg: 'Familias y componentes obtenidas correctamente',
                result: familias
            });

        } catch (error) {
            console.error('Error al obtener familia y componentes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerFamiliasActivas = async (req, res) => {

        try {

            const familias = await CatalogoFamilia.findAll({
                where: { activo: 1 },
                order: [['activo', 'DESC']],
                include: [{
                    model: CatalogoComponente,
                    where: { activo: 1 },
                    separate: true,
                    order: [['activo', 'DESC']],
                }],
            });

            // console.log(JSON.stringify(familias, null, 2));

            return res.status(200).json({
                OK: true,
                msg: 'Familias y componentes obtenidas correctamente',
                result: familias
            });

        } catch (error) {
            console.error('Error al obtener familia y componentes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.crearFamilia = async (req, res) => {

        let t;
        
        const { componentes, ...familia} = req.body;

        try {
            t = await Sequelize.transaction();

            const familiaData = {
                nombre_familia: familia.nombre_familia,
                fk_usuario_act: familia.fk_usuario_cre,
                activo: 1
            };

            const familiaCreada = await CatalogoFamilia.create(familiaData, { transaction: t });

            componentes.forEach(componente => {
                componente.fk_usuario_act = componente.fk_usuario_cre;
                componente.fk_familia = familiaCreada.id_familia;
                componente.activo = 1;
            });

            const componentesCreados = await CatalogoComponente.bulkCreate(componentes, { transaction: t });

            t.afterCommit(() => {
                app.getPdCatalgoFamiliasActivos();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Familia y componentes creados correctamente',
                result: componentesCreados
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al crear familia y componentes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarFamiliaComponentes = async (req, res) => {

        let t;

        const { familiaData, componentesNuevos, componentesEditados } = req.body;

        try {
            t = await Sequelize.transaction();

            for (const componente of componentesEditados) {
                const { id_componente, ...updateData } = componente; 
                    await CatalogoComponente.update(
                    updateData,
                    {
                        where: { id_componente: id_componente },
                        transaction: t
                    }
                );
            }

            await CatalogoComponente.bulkCreate(componentesNuevos, { transaction: t });

            if(familiaData.nombre_familia || familiaData.activo){
                await CatalogoFamilia.update(
                    familiaData,
                    {
                        where: {id_familia: familiaData.id_familia},
                        transaction: t
                    }
                )
            }

            t.afterCommit(() => {
                app.getPdCatalgoFamiliasActivos();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Actualizacion hecha correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al actualizar familia y componentes:', error);
            if (t) await t.rollback();
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.eliminarFamilia = async (req, res) => {

        const { id_familia } = req.body;
        let t

        try {
            t = await Sequelize.transaction();

            const componentes = await CatalogoComponente.findAll({
                attributes: ['id_componente'],
                where: { fk_familia: id_familia },
                transaction: t
            });

            const componentesData = JSON.parse(JSON.stringify(componentes));

            let idsComponentes = [];

            componentesData.map((componente) => {
                idsComponentes.push(componente.id_componente)                
            });

            await CatalogoComponente.update(
                { activo: 0 },
                {
                    where: {
                        id_componente: { [Op.in]: idsComponentes }
                    },
                    transaction: t
                }
            )

            await CatalogoFamilia.update(
                { activo: 0 },
                { where: { id_familia: id_familia }, transaction: t }
            );

            t.afterCommit(() => {
                app.getPdCatalgoFamiliasActivos();
            });

            await t.commit();

            return res.status(200).json({
                OK: true,
                msg: 'Familia eliminada correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al desactivar familia:', error);
            if (t) await t.rollback();
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.activarFamilia = async (req, res) => {

        let t;
        const { id_familia, ids_componentes } = req.body;

        try {
            t = await Sequelize.transaction();

            await CatalogoFamilia.update(
                { activo: 1},
                {
                    where: { id_familia: id_familia },
                    transaction: t
                }
            );

            await CatalogoComponente.update(
                { activo: 1},
                {
                    where: {
                        id_componente: { [Op.in]: ids_componentes }
                    },
                    transaction: t
                }
            );

            t.afterCommit(() => {
                app.getPdCatalgoFamiliasActivos();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Familia y componentes activados correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al activar familia y componentes:', error);
            if (t) await t.rollback();
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerChecklist = async (req, res) => {

        const checklist = req.params.checklist;

        try {

            const dataChecklists = await Sequelize.query(
                `
                SELECT
                    CH.id_check,
                    CH.nombre_checklist,
                    CH.descripcion_check,
                    CH.tipo_checklist,
                    CO.id_componente,
                    CO.nombre_componente,
                    FA.id_familia,
                    CH.posicion,
                    CH.requiere_posiciones,
                    FA.nombre_familia
                FROM
                    pd_catalogo_checklist CH
                    LEFT JOIN pd_catalogo_componente CO ON CH.fk_componente = CO.id_componente
                    LEFT JOIN pd_catalogo_familia FA ON CO.fk_familia = FA.id_familia
                WHERE
                    nombre_checklist = :checklist
                    AND CO.activo = 1
                ORDER BY
                    CH.posicion ASC;
                `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: { checklist: checklist }
                }
            );

            let estandar = [];
            let expres = [];
            
            dataChecklists.forEach((check) => {
                
                if(check.tipo_checklist === 1) {
                    estandar.push(check);
                } else {
                    expres.push(check);
                }
            });

            return res.status(200).json({
                OK: true,
                msg: 'Checklists obtenidos correctamente',
                result: null,
                estandar: estandar,
                expres: expres
            });

        } catch (error) {
            console.error('Error al obtener checklist:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarChecklist = async (req, res) => {

        let t;
        const checklist = req.body;
        
        try {
            t = await Sequelize.transaction();

            let porEliminar = [];
            let porActualizar = [];
            let porCrear = [];

            let sucesivo;

            checklist.forEach((check) => {
                if(check.activo === 1){

                    if(check.id_check){
                        if(check.documento_checklist){
                            check.documento_checklist = saveBase64File(check.documento_checklist, check.fk_componente, sucesivo);
                        }
                        porActualizar.push(check);
                        sucesivo++;
                    } else {
                        const { id_check, ...checkSinId } = check;
                        if(check.documento_checklist){
                            check.documento_checklist = saveBase64File(check.documento_checklist, checkSinId.fk_componente, sucesivo);
                        }
                        checkSinId.fk_usuario_cre = checkSinId.fk_usuario_act
                        porCrear.push(checkSinId);
                        sucesivo++;
                    }

                } else {
                    porEliminar.push(check.id_check);
                }
            });

            // console.log('eliminar', porEliminar)
            // console.log('crear', porCrear)
            // console.log('actualizar', porActualizar)

            await CatalogoChecklist.bulkCreate(porCrear, { transaction: t });

            porActualizar.forEach( async (check) => {
                const { id_check, ...dataCheck } = check;
                await CatalogoChecklist.update(
                    dataCheck,
                    {
                        where: { id_check: id_check },
                        transaction: t
                    }
                );
            });

            await CatalogoChecklist.destroy({
                where: {
                    id_check: { [Op.in]: porEliminar }
                },
                transaction: t
            });



            await t.commit();
            io.emit('PD_CATALOGO_CHECKLIST_ACTUALIZADO')
            return res.status(200).json({
                OK: true,
                msg: 'Checklist actualizado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al actualizar checklist:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    // app.crearFamilia = async (req, res) => {

    //     // let t;1

    //     try {
    //         // t = await Sequelize.transaction();

    //         // await t.commit();
    //         return res.status(200).json({
    //             OK: true,
    //             msg: '',
    //             result: null
    //         });

    //     } catch (error) {
    //         // if (t) await t.rollback();
    //         console.error('Error al :', error);
    //         return res.status(500).json({ 
    //             OK: false,
    //             msg: error,
    //         });
    //     }
    // }

    return app;
}
