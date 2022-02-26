const {Router} = require('express');
const router = Router();
const {getActas, getActa, createActa, editActa, deleteActa, descargarActa} = require('../controller/acta.controller');

router.get('/actas', getActas);
router.get('/acta/:idActa', getActa);
router.post('/acta', createActa);
router.put('/acta/:idActa', editActa);
router.delete('/acta/:idActa', deleteActa);
router.get('/descargaracta/:idActa', descargarActa);

module.exports = router;