module.exports = app => {

    const moment = require('moment');
    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');

    app.RecibirEvidenciaCheckListEntrada = (req, res, next) => {
        
        const fechaActual = moment().format('DD_MM_yyyy_HH_mm_ss');

        const evidenciaEntregaPath = path.join(__dirname, '../../uploads/fotos_checklist');

        if (!fs.existsSync(evidenciaEntregaPath)) {
            fs.mkdirSync(evidenciaEntregaPath, { recursive: true });
        }

        try {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => cb(null, 'uploads/fotos_checklist/'),
                filename: (req, file, cb) => cb(null, file.fieldname + '-' + fechaActual + path.extname(file.originalname) )
            });
    
            const upload = multer({ storage });
    
            upload.any()(req, res, function (err) {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                next();
            });
        } catch (err) {
            console.error('Error middleware RecibirEvidenciaCheckListEntrada:', err);
            return response.status(500).json({ 
                OK: false,
                msg: err,
            });
        }

    }

    return app;
}
