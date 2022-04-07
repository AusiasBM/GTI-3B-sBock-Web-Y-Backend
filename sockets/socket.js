
const {io} = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    
    console.log('Cliente conectado')

    client.on('disconnect', () => { 
        console.log('Cliente desconectado') 
    }); // 


    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje!!!!', payload)

    //     io.emit('mensaje', {admin: 'Nuevo Mensaje'}); // emite un mensaje a todos los clientes conectados

    // });


});