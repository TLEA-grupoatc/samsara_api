module.exports = app => {
    const io = app.io;

    io.on('connection', (socket) => {

      socket.on('EntradaHecha', () => {
        socket.broadcast.emit('entrada-recargarEntradas');

        socket.broadcast.emit('evidencias-entradasSinEvidencias');

        //Actualizar las unidades para salida
        socket.broadcast.emit('salida-recargarUnidadesEnBase');
      });

      socket.on('Entrada-UnidadConfirmadaEnCaseta', () => {
        socket.broadcast.emit('entrada-recargarUnidadEnCaseta');
      });

      socket.on('entrada-unidadEnCasetaCancelada', () => {
        socket.broadcast.emit('entrada-recargarUnidadEnCaseta');
      });

      socket.on('entrada-EnCasetaCancelada-programada', () => {
        socket.broadcast.emit('entrada-limpiarUnidadEnCaseta');
      });      
      
    });
};
