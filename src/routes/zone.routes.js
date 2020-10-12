const router = require('express').Router();
const { 
    createZone, 
    findAllZones, 
    findOneZone,
    updateZone,
    deleteZone,
    deleteAllZones } = require('../controllers/zone.controller');

router.route('/crearZona').post(createZone);
router.route('/mostrarZonas').get(findAllZones);
router.route('/mostrarZona/:id').get(findOneZone);
router.route('/actualizarZona/:id').put(updateZone);
router.route('/eliminarZona/:id').delete(deleteZone);
router.route('/eliminarZonas').delete(deleteAllZones);

module.exports = router;
