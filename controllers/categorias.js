const { response } = require("express");
const { Categoria } = require('../models');

// obtenerCategoria - paginado - total - populate
const obtenerCategorias = async(req, res=response) =>{

    const { limite=5, desde = 0} = req.query;
    const query = { estado: true};

    const [ total,  categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate({ path: 'usuario', select: 'nombre' })
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        total,
        categoria
    })
}


// obtenerCategoria - populate {}
const obtenerCategoriaId = async(req, res=response) =>{
    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate({path:'usuario', select:'nombre'});

    res.json({
        categoria
    })
}

const crearCategoria = async(req, res = response) => {
    
    const nombre  = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre})
    
    if(categoriaDB){

        return res.status(400).send({message:`Categoria :: ${nombre} :: ya existe!..`})
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria( data );

    //Guardar DB
    await categoria.save();
    res.status(200).json(categoria)

}

// Actualizar {id } Categoria
const updateCategoria = (req, res=response) =>{
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    
    Categoria.findById(id, async(err,resp)=>{

        if(err) return res.status(404).send({message: 'Error'});
        if(resp.estado === false){
            return res.status(404).send({message: 'Ups! categoria de baja'});
        } 
        
        const categoriaModify = await Categoria.findByIdAndUpdate(id, data, {new: true});
        res.json({
            categoriaModify
        });

    })
    
}

// borrar {id } categoria 
const categoriasDelete = async(req, res=response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
    
    res.json({
        categoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaId,
    updateCategoria,
    categoriasDelete
}

