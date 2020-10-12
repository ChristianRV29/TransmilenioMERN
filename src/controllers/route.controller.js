const Route = require('../models/route.model');

const routerController = {};

routerController.createRoute = async (req, res) => { 

    const {name} = req.body;

    console.log(`Que recibo como name ${name}`);

    if (!req.body) {
        res.status(404).send({
            message: "La información de la ruta no debe ser vacía."
        });
        return;
    }

    const route = new Route({
        name,
    });

    await route.save(route)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrió un error creando la nueva ruta."
            });
        }
    );
}


routerController.addStationToRoute = async (req, res) => {

    const id = req.params.id;

    const { station } = req.body;

    await Route.findByIdAndUpdate(id, {
        $push: {stations: station}},
        {new: true, useFindAndModify: false}
    ).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al agregar la ruta a la estación."
        })
    });
}

routerController.findAllRoutes = async (req, res) => {

    const name = req.query.name;

    var condition = name ? {name: { $regex: new RegExp(name), $option: "i"}}: {};

    await Route.find(condition)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error obteniendo las zonas."
                }
            );
        }
    );

    // await Route.find(condition, function (err, routes) {
    //     Station.populate(routes, {path: "station"}, function(err, routes){
    //         res.status(200).send(routes);
    //     });
    // });
}

routerController.findOneRoute = async (req, res) => {
    const id = req.params.id;

    await Station.findById(id, function (err, route){
        Route.populate(route, {path: "station"}, function(err, route){
            if(!route){
                res.status(404).send({
                    message: `No se encotró la ruta con el id ${id}.`
                });
            }
            else {
                res.status(200).send(route);
            }
        });
    })
}

routerController.updateRoute = async (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        res.status(404).send({
            message: "La nueva información no debe ser vacía!."
        });
    }

    await Route.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo actualizar la ruta con Id = ${id}.`
                });
            }
            else {
                res.send({
                    message: "Se actualizó la ruta satisfactoriamente!."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `Ocurrió un error al momento de modificar la ruta con Id = ${id}`
            });
        }
    );

}

routerController.deleteRoute = async (req, res) => {

    const id = req.params.id;

    await Route.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo eliminar la ruta con el Id =  ${id}.`
                });
            }
            else {
                res.send({
                    message: "Se eliminó la ruta satisfactoriamente!."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Ocurrió un error al momento de eliminar la ruta con Id = ${id}`
            });
        }
    );
}


routerController.deleteAllRoutes = async (req, res) => {

    await Route.deleteMany({})
        .then((data) => {
            res.send({message: `${data.deletedCount} ruta(s) eliminadas!.`});
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar las estaciones."
            });
        }
    );

}


module.exports = routerController;