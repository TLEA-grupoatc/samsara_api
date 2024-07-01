module.exports = app => {
    app.io.on('connection', (client) => {
        console.log("Usuario conectado");        

        client.on('disconnect', () => {                        
            console.log("Usuario desconectado");
        });

        client.on('SHOW_ALERTS', (data, callback)=> {            
            client.broadcast.emit('SHOW_ALERTS', data);
        });

        // client.on('SHOW_SEUS', (data, callback)=> {            
        //     client.broadcast.emit('SHOW_SEUS', data);
        // });
    });   

    return app;
}