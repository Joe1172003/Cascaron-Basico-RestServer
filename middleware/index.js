const validaCampos = require('../middleware/validator');
const validarJWT = require('../middleware/validar-jwt');
const validaRoles = require('../middleware/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validarJWT
}