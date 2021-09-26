



const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req= request, res=response, next) => {

    const token = req.header('Authorization');
    if( !token ){
        return res.status(401).send({message: 'Ups! No hay token en la petición'});
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            res.status(401).send({message: 'Ups! Token no valido :: Usuario No existe en DB...'})
        }
        // verificar si el uid tiene estado en => tru
        if(usuario.estado === false){
            res.status(401).send({message: 'Ups! Token no valido :: false'});
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        res.status(401).send({message:'Ups! Token No válido'})
    }
}


module.exports = {
    validarJWT
};