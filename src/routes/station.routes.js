const router = require('express').Router();

const { 
    createStation, 
    findAllStations, 
    findOneStation, 
    updateStation,
    deleteStation,
    deleteAllStations,
    addRouteToStation } = require('../controllers/station.controller');

router.route('/crearEstacion').post(createStation);
router.route('/mostrarEstaciones').get(findAllStations);  
router.route('/mostrarEstacion/:id').get(findOneStation);
router.route('/modificarEstacion/:id').put(updateStation);
router.route('/eliminarEstacion/:id').delete(deleteStation);
router.route('/eliminarEstaciones').delete(deleteAllStations);

router.route('/agregarRutaAEstacion/:id').put(addRouteToStation);

module.exports = router;

