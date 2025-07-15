module.exports = app => {
    const io = app.io;

    io.on('connection', (socket) => { 
      
    socket.on('evidencias-confirmacionEntrada', () => {
        socket.broadcast.emit('evidencias-entradasSinEvidencias');
        socket.broadcast.emit('evidencias-evidenciasPendientes');

        //Actualizar las unidades para salida
        socket.broadcast.emit('salida-recargarUnidadesEnBase');
    });

    socket.on('evidencias-registroActualizado', () => {
        socket.broadcast.emit('evidencias-evidenciasPendientes');
    });

    });
};
