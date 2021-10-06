const {Schema, model} = require('mongoose');
const usuario = require('./usuario');


const categoriaSchema = new Schema({
    nombre: { type: String, required: true},
    estado: { type: Boolean, default: true, required: true},
    usuario:{ type: Schema.Types.ObjectId, ref:'Usuario', required:true}
});

categoriaSchema.methods.toJSON = function(){
    
    const {__v, estado, ...data} = this.toObject();
    return data;

}
module.exports = model('Categoria', categoriaSchema)