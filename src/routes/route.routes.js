const router = require('express').Router();

const {
    createRoute,
    findAllRoutes,
    findOneRoute,
    updateRoute,
    deleteAllRoutes,
    deleteRoute,
} = require('../controllers/route.controller');

router.route('/crearRuta').post(createRoute);
router.route('/mostrarRutas').get(findAllRoutes);
router.route('/mostrarRuta/:id').get(findOneRoute);
router.route('/modificarRuta/:id').put(updateRoute);
router.route('/eliminarRuta/:id').delete(deleteRoute);
router.route('/eliminarRutas').delete(deleteAllRoutes);

router.route('/mostrarRutas').get((req, res) => {
    res.send('Estoy mostando las rutas de transmilenio');
});

module.exports = router;