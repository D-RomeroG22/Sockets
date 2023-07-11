import  Express  from 'express';
import 'dotenv/config';
import cors  from 'cors';
import http from 'http';
import { Server } from "socket.io";

//Importamos los routers:


//importamos la conexión a la base de datos


//controlador para los sockets
import { socketController } from '../sockets/sockets.controller.js';


/*
Qué son los webSockets:


Los webSockets son un conjunto de herramientas (como http servers) que permiten a un servidor y sus clientes
tener interacciones más confiables y con permanencia en la conexión, esto hace que los clientes
puedan retornar su conexión en el lugar/estado en el que lo dejaron, para ello existen algunas Librerías
famosas de NODEjs (npm) como 'socket.io' que implementan estas funcionalidades 



? DOCUMENTACIÓN DE SOCKET.IO: 
https://socket.io/docs/v4/server-initialization/
*/
class Servidor {
    constructor(){
        
        this.app = Express(); //creamos la instancia de la app
        this.port = process.env.PORT || 3000; //creamos el puerto
        //Creamos un servidor con la lib http de node que use la plantilla de la app de express
        this.server = http.createServer(this.app);
        //así creamos el cliente socket.io:
        this.io = new Server(this.server);


        //rutas de la app:
        this.paths = {}
        
        //creamos la conexión a la base de datos
    
        
        //Este orden es importante, primero se inicializan los middleware's generales y luego las rutas
        this.middleware();//Middleware's creación
        this.routes(); //inicializamos las rutas que tendrá el servidor


        // Métodos para los sockets
        this.sockets();
    }


    middleware(){
        //CORS documentación de cors: https://www.npmjs.com/package/cors#usage
        this.app.use(cors());

        //Aquí detallamos qué carpeta queremos usar como la carpeta pública
        this.app.use(Express.static('public')); 

        //middleware para la carga de archivos (cualquiera)
    }


    routes(){
        /*
       En esta función estamos haciendo un llamado con 'app.use' diciendo que use 
       la dirección (string) de 'this.usersPath' y que llame TODO lo que halla en ella, 
       donde nosotros en el archivo 'users.js' de la carpeta routes estamos exportando las rutas
       de los usuarios
       por ende, cuando alguien consulte a esa dirección en 'usersPath' y consulte con un método
       si el método existe y está permitido en el CORS, obtendrá una respuesta
        */
    }

    sockets(){
        this.io.on('connection',socketController);


    }
    
    //este método NO se inicializa, solo se llama cuando querramos montar el servidor
    listen(){
        //? a diferencia de la RestApi aquí vamos a usar 'this.server' (ver el constructor)
        //? para levantar el servidor con el socket.io
        this.server.listen(this.port,()=>{
            console.log('Listen server to port',this.port);
        });
    }
}


// Exportaciones
export default Servidor;