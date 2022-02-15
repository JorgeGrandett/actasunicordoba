const {Router} = require('express');
const router = Router();
const {getUsuarios, getUsuario, createUsuario, editUsuario, deleteUsuario} = require('../controller/usuario.controller');

router.get('/usuarios', getUsuarios);
router.get('/usuario/:cedula', getUsuario);
router.post('/usuario', createUsuario);
router.put('/usuario/:cedula', editUsuario);
router.delete('/usuario/:cedula', deleteUsuario);

module.exports = router;