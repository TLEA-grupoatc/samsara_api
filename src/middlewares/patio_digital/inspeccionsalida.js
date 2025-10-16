module.exports = app => {

    const moment = require('moment');    
    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');

    app.recibirVideo = (req, res, next) => {
        
        const fechaActual = moment().format('DD_MM_yyyy_HH_mm_ss');

        const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/ev_inspeccion_salida');
        
        if (!fs.existsSync(evidenciaEntregadasPath)) {
            fs.mkdirSync(evidenciaEntregadasPath, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: (req, file, cb) => cb(null, 'uploads/ev_inspeccion_salida/'),
            filename: (req, file, cb) => cb(null, file.fieldname + '-' + fechaActual + path.extname(file.originalname))
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