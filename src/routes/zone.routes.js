module.exports = app => {

    const zoneController = require('../controllers/zone.controller');

    var router = require('express').Router();

    router.post('/createZone', zoneController.createZone);

    router.put('/updateZone/:id', zoneController.updateZone);

    router.get('/getZone', zoneController.findOneZone);

    router.get('/getAllZones', zoneController.findAllZones);

    router.delete('/deleteZone/:id', zoneController.deleteZone);

    router.delete('/deleteAllZones', zoneController.deleteAllZones);

    app.use('/api/zones', router);


};