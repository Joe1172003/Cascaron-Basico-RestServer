




const { Router } = require('express');
const { usuariosGet,
        usuariosPost, 
        usuarosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/user.controller');

const router = Router();

router.get('/', usuariosGet)
router.post('/', usuariosPost)
router.put('/:id', usuarosPut)
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)





module.exports = router;