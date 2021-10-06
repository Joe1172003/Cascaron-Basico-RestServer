//Exportaciones de Node
const { Router } = require('express');
const { check } = require('express-validator');
const { agregarProducto,
        obtenerProductos,
        obtenerProductoId,
        actualizarProducto,
        productoDelete
    } = require('../controllers/productos');
const { productoExiste } = require('../helpers/db-validators');
const { adminRole } = require('../middleware');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validator');


const router = Router();

// :: Rutas :: Producto
router.post('/',[
    validarJWT,
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('precio','Precio debe ser un numero').isNumeric(),
    validarCampos],agregarProducto);

// :: Rutas :: Obtener Producto    
router.get('/',obtenerProductos);

// :: Rutas :: Obtener Producto Id
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    validarCampos,
    check('id').custom(productoExiste),
    validarCampos
],obtenerProductoId);

// :: Rutas :: Modificar Producto
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('id','No es un id de mongo').isMongoId(),
    validarCampos,
    check('id').custom(productoExiste),
    validarCampos
],actualizarProducto);

// :: Rutas :: Eliminar Producto
router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(productoExiste),
    validarCampos
], productoDelete)
module.exports = router;