const Station = require('../models/station.model');
const Zone = require('../models/zone.model');
const Route = require('../models/route.model');
const zoneController = require('./zone.controller');

const stationController = {};

stationController.createStation = async (req, res) => {

    const {name, address, zone, routes } = req.body;
    if (!req.body) {
        res.status(404).send({
            message: 'La información de la estación no debe ser vacia!.'
        });  
        
        return;
    }

    if (!req.body.zone){
        res.status(404).send({
            message: "Es necesario indicar la zona a la que pertenece la estación"
        });

        return;
    }

    const station = new Station({
        name,
        address,
        zone,
        routes,
    });

    await station.save(station)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || "Ocurrió un error creando la nueva estación."
            });
        }
    );
}

stationController.addRouteToStation = async (req, res) => {

    const id = req.params.id;

    const { route } = req.body;

    await Station.findByIdAndUpdate(id, {
        $push: {routes: route}},
        {new: true, useFindAndModify: false}
    ).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al agregar la ruta a la estación."
        })
    });
}

stationController.findAllStations = async (req, res) => {

    const name = req.query.name;

    var condition = name ? {name: { $regex: new RegExp(name), $option: "i"}}: {};

    await Station.find(condition, function (err, stations) {
        Zone.populate(stations, {path: "zone"}, function(err, stations){
            res.status(200).send(stations);
        });
    });
}

stationController.findOneStation = async (req, res) => {
    const id = req.params.id;

    await Station.findById(id, function (err, station){
        Zone.populate(station, {path: "zone"}, function(err, station){
            if(!station){
                res.status(404).send({
                    message: `No se encotró la estación con el id ${id}.`
                });
            }
            else {
                res.status(200).send(station);
            }
        });
    })
}

stationController.updateStation = async (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        res.status(404).send({
            message: "La nueva información no debe ser vacía!."
        });
    }

    await Station.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo actualizar la estación con Id = ${id}.`
                });
            }
            else {
                res.send({
                    message: "Se actualizó la estación satisfactoriamente!."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `Ocurrió un error al momento de modificar la estación con Id = ${id}`
            });
        }
    );

}

stationController.deleteStation = async (req, res) => {

    const id = req.params.id;

    await Station.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo eliminar la estación con el Id =  ${id}.`
                });
            }
            else {
                res.send({
                    message: "Se eliminó la estación satisfactoriamente!."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Ocurrió un error al momento de eliminar la estación con Id = ${id}`
            });
        }
    );
}


stationController.deleteAllStations = async (req, res) => {

    await Station.deleteMany({})
        .then((data) => {
            res.send({message: `${data.deletedCount} estacion(es) eliminadas!.`});
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar las estaciones."
            });
        }
    );

}

module.exports = stationController;
