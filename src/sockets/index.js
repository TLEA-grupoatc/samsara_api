module.exports = app => {
    app.io.on('connection', (client) => {
        console.log("Usuario conectado");        

        client.on('disconnect', () => {                        
            console.log("Usuario desconectado");
        });

        client.on('SHOW_ALERTS', (data, callback)=> {            
            client.broadcast.emit('SHOW_ALERTS', data);
        });

        client.on('SHOW_ALERTS_APLICADAS', (data, callback)=> {            
            client.broadcast.emit('SHOW_ALERTS_APLICADAS', data);
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

        client.on('SHOW_GASTOS_PORDEPOSITAR', (data, callback)=> {            
            client.broadcast.emit('SHOW_GASTOS_PORDEPOSITAR', data);
        });

        client.on('SHOW_CATALOGOS', (data, callback)=> {            
            client.broadcast.emit('SHOW_CATALOGOS', data);
        });


        client.on('SHOW_CERTIFICACIONES', (data, callback)=> {            
            client.broadcast.emit('SHOW_CERTIFICACIONES', data);
        });
    });   

    return app;
}