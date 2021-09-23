



const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {type:String, require: true},
    correo: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    estado:{type:Boolean, default:true},
    google:{type:Boolean, default:false},
    rol:{ type:String, require: true},
    img: {type: String}

});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema);  