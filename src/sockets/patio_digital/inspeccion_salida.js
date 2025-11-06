module.exports = app => {
    const io = app.io;

    io.on('connection', (socket) => { 
      
        socket.on('FOSA_INSPECCION_SALIDA_EVIDENCIA_CARGADA', () => {
            socket.broadcast.emit('FOSA_INSPECCION_SALIDA_ACTUALIZADA');
        });
    });
};

