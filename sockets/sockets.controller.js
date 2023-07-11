
//Vamos a dividir nuestros eventos de sockets en un archivo independiente, para mantener un orden
//esto con el fin de que el código no se haga muy extenso y pesado de seguir

//el controlador recibe un socket que lo ejecuta para cada evento
const socketController = (socket)=>{
    console.log('Cliente conectado');
    socket.on('disconnect',()=>{
        console.log('cliente desconectado',socket.id);
    });

    socket.on('message',payload=>{
        console.log(payload);
        socket.emit('response','Message from the server');

        /*
        La propiedad 'broadcast' ofrece la posibilidad de que el socket que dispara el evento, pueda
         enviar algo (mensaje,datos,objetos) a TODOS los demás sockets excepto a él mismo, esto es útil
         cuando queremos enviar mensajes a varios usuarios pero sin mandarlo hacía el original
        */
        socket.broadcast.emit('all-message','Alguien envió un mensaje',socket.id);
    });
    
}




export {socketController};