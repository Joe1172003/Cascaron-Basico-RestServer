'use strict'

const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {
  
  // obtener los query ? 
  const {limite = 5, desde = 0} = req.query;
  const retirados = { estado: true};

  const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments(retirados),
    Usuario.find(retirados)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

    res.json({
      total,
      usuarios
    });

  };

  const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol} = req.body; 
    const usuario = new Usuario({ nombre, correo, password, rol});

    // * Encriptar la contraseña
  
    // vueltas de incriptación
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt);

    //* Guardar en DB
    await usuario.save();

    res.json({
        mgs: 'post API - controller',
        usuario
    });
  };
  
  const usuarosPut = async(req, res = response) => {
    
    const id = req.params.id;
    const {_id, password, google, correo, ...parametros} = req.body;

    if( password ) { 
      const salt = bcryptjs.genSaltSync(10);
      parametros.password = bcryptjs.hashSync( password, salt);
    }

    const usuarioModify = await Usuario.findByIdAndUpdate( id, parametros )
    res.json(usuarioModify);
  };
  
  const usuariosPatch = (req, res = response) => {
    res.json({
        mgs: 'patch API - controller'
    });
  };

  const usuariosDelete = async(req, res = response) => {
    
    const { id }  = req.params;
    
    //Notes: no es aconsejable borrar el usuario debido a que puedo perder la integridad referencial del usuario
    //const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    res.json(usuario);
  };
  
  


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuarosPut,
    usuariosDelete,
    usuariosPatch
  }