const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validator');

const router = Router();
router.post('/login',[
    check('correo','El correo debe de ser obligatorio').isEmail(),
    check('password','La constraseña debe de ser correcta').not().isEmpty(),
    validarCampos
], login);


module.exports = router;