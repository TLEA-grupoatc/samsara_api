module.exports = app => {

    const moment = require('moment');    
    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');

    app.RecibirArchivosActualizarEvidencias = (req, res, next) => {
        
        const fechaActual = moment().format('DD_MM_yyyy_HH_mm_ss');
        const idpickandup = req.params.idpickandup;
        const id_evidencias = req.params.id_evidencias;

        const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/evidenciasunidades');
        
        if (!fs.existsSync(evidenciaEntregadasPath)) {
            fs.mkdirSync(evidenciaEntregadasPath, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: (req, file, cb) => cb(null, 'uploads/evidenciasunidades/'),
            filename: (req, file, cb) => cb(null, file.fieldname + '-' + fechaActual + '-' + idpickandup + '-' + id_evidencias + path.extname(file.originalname))
        });

        const upload = multer({ storage });

        upload.any()(req, res, function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    }

    return app;
}