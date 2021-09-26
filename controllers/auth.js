const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



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

const googleSigIn = async(req, res=response) => {
    const {id_token} = req.body;

    try {
        const { nombre, img, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: '',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario en DB => estado: false

        if(usuario.estado == false){
            return res.status(400).json({ message: 'Ups! Usuario de baja' })
        }
        
        // Generar Token
        const token = await generarJWT( usuario.id);
        res.json({
            usuario,
            token
        })
        console.log(usuario);
            
    } catch (error) {
        ok: false
        res.status(500).send({message: 'Ups! Token no se pudo verificar'});
    }
}

module.exports = {
    login,
    googleSigIn
}