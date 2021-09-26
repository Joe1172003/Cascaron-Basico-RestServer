const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSigIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validator');

const router = Router();


router.post('/login',[
    check('correo','El correo debe de ser obligatorio').isEmail(),
    check('password','La constraseña debe de ser correcta').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSigIn);

module.exports = router;