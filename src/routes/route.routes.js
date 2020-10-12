const router = require('express').Router();


router.route('/mostrarRutas').get((req, res) => {
    res.send('Estoy mostando las rutas de transmilenio');
});

module.exports = router;