module.exports = app => {
  const io = app.io;

  io.on('connection', (socket) => {

    //AL crear o actualizar una programacion se emite el mensaje
    socket.on('programacionHecha', () => {
      //recarga tanto la vista general como la tabla
      socket.broadcast.emit('agenda-recargarProgramaciones');

      socket.broadcast.emit('entrada-recargarAgenda');
    });

  });
};