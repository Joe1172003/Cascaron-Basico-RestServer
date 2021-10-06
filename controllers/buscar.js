// Exportaciones
const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async(termino='', res=response) =>{

    const esMongoId = ObjectId.isValid( termino ); // TRUE :: FALSE  
    // :: Mongo Id
    if( esMongoId ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: (usuario) ? [ usuario ] : []
        })
    }

    const regex = new RegExp( termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    const total = await Usuario.count({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });
    
    return res.json({
        results: {
            usuarios,
            total
        }
    })
}

const buscarCategoria = async(termino='', res=response) =>{

    const esMongoId = ObjectId.isValid( termino ); // TRUE :: FALSE  
    // :: Mongo Id
    if( esMongoId ){
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: (categoria) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, $and: [{estado: true}] });

    const total = await Categoria.count({ nombre: regex, $and: [{estado: true}] });
    
    return res.json({
        results: {
            categorias,
            total
        }
    })
}

const buscarProducto = async(termino='', req, res=response) =>{

    const {precioMax} = req.query;

    const esMongoId = ObjectId.isValid( termino ); // TRUE :: FALSE  
    // :: Mongo Id
    if( esMongoId ){
        const producto = await Producto.findById( termino )
        .populate({path: 'categoria', select: 'nombre' });
        return res.json({
            results: (producto) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino, 'i');
    const productos = await Producto.find({$or:[
        {nombre: regex},
        {precio:{ $gte: precioMax } }]
        , $and: [{estado: true}] })
    .populate({path: 'categoria', select: 'nombre' });
    const total = await Producto.count({ nombre: regex, $and: [{estado: true}] });
    
    return res.json({
        results: {
            productos,
            total
        }
    })
}

const buscar = (req, res=response) =>{

    const { coleccion, termino } = req.params;
    
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).send({message: `Las colecciones permitidas son: ${ coleccionesPermitidas}`});
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res)
            break;
        case 'productos':
            buscarProducto(termino, req ,res)
            break;
        default: res.status(500).send({message: 'Ups! Error server'});
    }

  
}


module.exports = {
    buscar
}