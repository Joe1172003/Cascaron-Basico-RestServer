const { response } = require("express");
const { body } = require("express-validator");
const {Producto} = require('../models');

// ::obtenerProducto - paginado - total - populate
const obtenerProductos = async(req, res=response) =>{

    const { limite=5, desde = 0} = req.query;
    const query = { estado: true};

    const [ total,  producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate({ path: 'usuario', select: 'nombre' })
        .populate({ path: 'categoria', select: 'nombre' })
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        total,
        producto
    })
}

// ::obtenerProducto {id} 
const obtenerProductoId = async(req,res=response) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate({path:'usuario', select:'nombre'})
    .populate({path:'categoria', select:'nombre'});

    return res.status(200).send(producto);
}

// ::Agregar Producto
const agregarProducto = async(req, res=response) =>{
    
    const producto = new Producto();
    const {estado, usuario, ...data} = req.body;
    
    producto.nombre = data.nombre.toUpperCase();
    producto.descripcion = data.descripcion;
    producto.usuario =  req.usuario._id;
    producto.categoria = data.categoria;
    producto.precio = data.precio;
    
         Producto.find({nombre: producto.nombre}, async(err, productos)=>{

            if(err) return res.status(400).send({message:'Bad Request'});
            if(productos && productos.length >= 1){
                return res.status(400).send({message:`El Producto ${data.nombre} ya existe en la BD!..`})
            }
                await producto.save((err,productoGuardado)=>{
                    if(err) return res.status(400).send({message:'Bad Request'});
                    return res.json({
                        productoGuardado
                    })
                }); 
        });    
}

// ::Actualizar Producto
const actualizarProducto = (req,res=response) =>{
    const { id } = req.params;
    const { estado, disponible, ...otros } = req.body;

    otros.nombre = otros.nombre.toUpperCase();
    otros.usuario = req.usuario._id

    Producto.findById(id, async(err, producto)=>{
        //Bad request
        if(err) return res.status(404).send( {message: 'Bad request!'} );
        
        //Producto => false
        if(!producto.estado){
            return res.status(402).send({message: `Ups! producto :: ${producto.nombre} :: esta de baja`});
        }
        //Actualizar Producto
        const productoModify =await Producto.findByIdAndUpdate( id, otros, {new:true})
        .populate({path:'categoria', select:'nombre'});
        res.json({
            productoModify
        });
    });
}

// ::Borrar Producto
const productoDelete = async(req, res=response) =>{

    const { id } = req.params;
    const productoDelete = await Producto.findByIdAndUpdate(id, {estado: false});
    
    res.json({
        productoDelete
    })
}
module.exports = {
    agregarProducto,
    obtenerProductos,
    obtenerProductoId,
    actualizarProducto,
    productoDelete
}