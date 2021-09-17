'use strict'

const { response } = require('express')



const usuariosGet = (req, res = response) => {
  
  // obtener los query ? 
  const {q, nombre='No name', key, page='1', limit=5} = req.query

    res.json({
        mgs: 'get API - controller',
        nombre,
        key,
        q,
        page,
        limit
    });

  };

  const usuariosPost = (req, res = response) => {
    
    const body = req.body; 

    res.json({
        mgs: 'post API - controller',
        body
    });
  };
  
  const usuarosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        mgs: 'put API - controller',
        id
    });
  };
  
  const usuariosPatch = (req, res = response) => {
    res.json({
        mgs: 'patch API - controller'
    });
  };

  const usuariosDelete = (req, res = response) => {
    
    res.json({
        mgs: 'delete API - controller'
    });
  };
  
  


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuarosPut,
    usuariosPatch,
    usuariosDelete
  }