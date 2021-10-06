


const cors = require('cors')
const express = require('express');
const { dbConection } = require('../db/config');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            usuarios:   '/api/users',
            productos:  '/api/productos',
        }
  
        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConection();
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
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use( this.paths.usuarios, require('../routes/user.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port);
        });
    }
}


module.exports = Server;

