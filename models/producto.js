



const { Schema, model } =  require('mongoose');


const ProductoSchema = Schema({
    nombre:{type:String, require:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario', require:true},
    estado:{type:Boolean, require:true, default:true},
    precio:{type:Number, default:0},
    categoria:{type: Schema.Types.ObjectId, ref:'Categoria', require:true},
    descripcion:{type:String},
    disponible:{type:Boolean, require:true, default:true}
});

ProductoSchema.methods.toJSON = function(){
    
    const {__v,_id, estado, ...data} = this.toObject();
    return data;

}

module.exports = model( 'Producto',ProductoSchema);
