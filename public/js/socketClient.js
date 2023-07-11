//Así inicializamos un cliente socket cuando configuramos correctamente sus opciones:
const socket = io();

//referencias del HTML
const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const button = document.querySelector('#enviar');


socket.on('connect',()=>{
    lblOnline.style.display='';
    lblOffline.style.display='none';
    console.log('conectado');
});

button.addEventListener('click',()=>{
    const message = document.querySelector('#message').value;
    socket.emit('message',message);
});


socket.on('response',res=>{
    const responseContainer = document.querySelector('#response');
    responseContainer.innerHTML = '<br>'+ res;
    console.log(res);
});

socket.on('all-message',(message,id)=>{
    console.log(message);
    window.alert(id);
});

socket.on('disconnect',()=>{
    lblOnline.style.display='none';
    lblOffline.style.display='';
    console.log('Desconectado');
});


