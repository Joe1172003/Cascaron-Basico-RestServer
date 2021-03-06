//Exportaciones de Node
const { Router } = require('express');
const { check } = require('express-validator');

//Mis Exportaciones :: Middleware Personalizados
const { esRoleValido, emailExiste, usuarioExiste } = require('../helpers/db-validators');
const {
    validarCampos,
    validarJWT,
    adminRole,
    tieneRole} = require('../middleware')

const { usuariosGet,
        usuariosPost, 
        usuarosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/user.controller');

//Rutas
const router = Router();

router.get('/', usuariosGet)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y mayor de 6 letras').isLength({ min:6 }),
    check('correo','correo no valido!').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    //adminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id valido..!!').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], usuariosDelete);


router.put('/:id',[
    check('id','No es un id valido..!!').isMongoId(),
    check('id').custom( usuarioExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarosPut)


router.patch('/', usuariosPatch)




//check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),


module.exports = router;