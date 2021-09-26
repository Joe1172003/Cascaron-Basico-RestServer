const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");



const login =  async (req,res= response) =>{
    const {correo, password} = req.body
    try {
        // Verficar si el email existe
        const usuario = await Usuario.findOne( {correo } );
        if(!usuario){
            return res.status(400).send({message: 'Ups! Credenciales Incorrectas!..'})
        }
        //Verificar si el usuario esta activo
        if(usuario.estado === false){
            return res.status(400).send({message: 'Ups! Usuario Debaja!..'})
        }
        //Verificar la contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario.password);
        // true => ok false => password I
        if(!validarPassword){
            return res.status(400).send({message: 'Ups! Credenciales Incorrectas!.. -C'})
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id);
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(err);
        return res.status(500).send({message: 'Ups! Algo salio mal. Hable con el Administrador'})    
    }

}

module.exports = {
    login
}