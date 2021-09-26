const { response } = require("express");




const adminRole = (req, res=response, next) =>{
    
    if( !req.usuario ){
        return res.status(500).send({message: 'Ups! Se quiere verificar el role sin valida el token primero'});

    }
    const { rol, nombre } = req.usuario;
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).send({message: `Autorización Denegada :: El usuario ${ nombre } No tiene acceso a esta acción`})
    }
    next();

}

const tieneRole = ( ...roles ) =>{
    
    return (req, res=response, next) =>{

        if( !req.usuario ){
            return res.status(500).send({message: 'Ups! Se quiere verificar el role sin valida el token primero'});
        }
        
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).send({message: `Autorización Denegada:: El usuario ${ req.usuario.nombre } No tiene acceso a esta acción :: requiere: ${ roles }`});
        }

        next();
    }
}

module.exports = {
    adminRole,
    tieneRole
};  