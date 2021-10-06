



const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

/* Usuario */

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos `);
    }
}

const emailExiste = async( correo = '') => {
    
    const existeEmail = await Usuario.findOne({correo});
    
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya esta registrado..!!`);
    }     
 
}

const usuarioExiste = async( id ) => {
    
    const existeUsuario = await Usuario.findById(id);
    
    if(!existeUsuario){
        throw new Error(`El id no existe: ${id}`);
    }     
 
}

/* Categorias */

const categoriaExiste = async( id ) => {
    
    const existeCategoria = await Categoria.findById(id);
    
    if(!existeCategoria){
        throw new Error(`el id: ${id} no existe`);
    }     
 
}

/* Productos */

const productoExiste = async( id ) => {
    
    const existeProducto = await Producto.findById(id);
    
    if(!existeProducto){
        throw new Error(`el id: ${id} no existe`);
    }     
 
}

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste,
    productoExiste
}