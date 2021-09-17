


const cors = require('cors')
const express = require('express');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/users';
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }
    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use( express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use( this.usuariosPath, require('../routes/user.routes'));
    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port);
        });
    }
}


module.exports = Server;

