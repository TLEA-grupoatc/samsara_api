module.exports = app => {
    app.io.on('connection', (client) => {
        console.log("Usuario conectado");        

        client.on('disconnect', () => {                        
            console.log("Usuario desconectado");
        });

        client.on('SHOW_ALERTS', (data, callback)=> {            
            client.broadcast.emit('SHOW_ALERTS', data);
        });

        client.on('SHOW_PRENOMINAS', (data, callback)=> {            
            client.broadcast.emit('SHOW_PRENOMINAS', data);
        });

        client.on('SHOW_LIQUIDACIONES', (data, callback)=> {            
            client.broadcast.emit('SHOW_LIQUIDACIONES', data);
        });

        client.on('SHOW_GASTOS', (data, callback)=> {            
            client.broadcast.emit('SHOW_GASTOS', data);
        });
    });   

    return app;
}