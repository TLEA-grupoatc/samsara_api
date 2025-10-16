module.exports = app => {
    const io = app.io;

    io.on('connection', (socket) => {

      socket.on('salida-creada', () => {
        socket.broadcast.emit('salida-recargarSalidas');
        socket.broadcast.emit('salida-recargarUnidadEnCaseta');
      });

      socket.on('salida-autorizacion-salida-hallazgo', () => {
        socket.broadcast.emit('salida-recargarSalidas');
      });

      // socket.on('salida-autorzacion-con-omision', () => {
      //   socket.broadcast.emit('salida-recargarUnidadesEnBase');
      // });
      
      socket.on('salida-confirmada', () => {
        socket.broadcast.emit('salida-recargarSalidas');
      });

      socket.on('salida-UnidadConfirmadaEnCaseta', () => {
        socket.broadcast.emit('salida-recargarUnidadEnCaseta');
      });

      socket.on('salida-unidadEnCasetaCancelada', () => {
        socket.broadcast.emit('salida-recargarUnidadEnCaseta');
        socket.broadcast.emit('salida-recargarUnidadesEnBase');
      });
      
      // console.log(socket.id);
    });
};
