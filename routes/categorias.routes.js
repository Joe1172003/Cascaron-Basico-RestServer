// Exportaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validator');
const {validarJWT, adminRole} = require('../middleware');
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoriaId,
        updateCategoria,
        categoriasDelete } = require('../controllers/categorias');
const { categoriaExiste } = require('../helpers/db-validators');
const router = Router();


/*
 * {{url}}/api/categorias 
 */


// Obtener todas las categorias - public 
router.get('/', obtenerCategorias);
    
// Obtener una categoria {id} - public  
router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos],obtenerCategoriaId)

// Crear Categorias - privado - cualquier persona con un token valido 
router.post('/', [
    validarJWT,
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    validarCampos], crearCategoria)

// Actualizar - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('id','No es un { id } de Mongo').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], updateCategoria)

// Borrar Categorias - privado - [Admin]
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id','No es un { id } de Mongo').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], categoriasDelete )






module.exports = router;