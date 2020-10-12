const Zone = require('../models/zone.model');

const zonesController = {};

zonesController.createZone = async (req, res) => {

    const { name, description } = req.body;
    if (!req.body) {
        res.status(400).send({message: 'La información de la zona no debe ser vacia!.'});

        return;
    }
    const zone = new Zone({
        name,
        description,
    });

    await zone.save(zone)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || "Ocurrió un error creando la nueva zona."
            });
        }
    );
}

zonesController.findAllZones = async (req, res) => {
    const name = req.query.name;

    var condition = name ? {name: { $regex: new RegExp(name), $option: "i"}} : {};

    await Zone.find(condition)
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
}

zonesController.findOneZone = async (req, res) => {

    const id = req.params.id;

    await Zone.findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({message: `No se encontró la zona con el Id = ${id}`});
                }
                else {
                    res.send(data);
                }
            }).catch((err) => {
                res.status(500).send({
                    message: 
                        err.message || `Ocurrió un error mientras se obtenida la zona con el Id = ${id}`
                }
            );
        }
    );
}

zonesController.updateZone = async (req, res) => {
    if (!req.body) {
        res.send(404).send({
            message: "La nueva información no debe ser vacia!."
        });
    }

    const id = req.params.id;

    await Zone.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            
            if (!data) {
                res.status(404).send({
                    message: `No se pudo actualizar la zona con Id = ${id}.`
                });
            } else {
                res.send({message: "La zona se actualizó satisfactoriamente!." , data});
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `Ocurrió un error al momento de modificar la zona con Id = ${id}`
            });
        }
    );
}

zonesController.deleteZone = async (req, res) => {

    const id = req.params.id;

    await Zone.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo eliminar la zona con Id = ${id}. Tal vez la zona no existe.`
                });
            }
            else {
                res.send({
                    message: "Zona eliminada satisfactoriamente."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `No se pudo eliminar la zona con Id =  = ${id}.`
            });
        }
    );

}

zonesController.deleteAllZones = async (req, res) => {

    Zone.deleteMany({})
        .then((data) => {
            res.send({message: `${data.deletedCount} zonas eliminadas!.`});
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar las zonas."
            });
        }
    );
}


module.exports = zonesController;
/*
const db = require('../models');
const Zone = db.zones;

exports.createZone = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'La información de la zona no debe ser vacia!.'});

        return;
    }
    const zone = new Zone({
        name: req.body.name        
    });

    zone.save(zone)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || "Ocurrió un error creando la nueva zona."
            });
        }
    );
};

exports.findAllZones = (req, res) => {

    const name = req.query.name;

    var condition = name ? {name: { $regex: new RegExp(name), $option: "i"}} : {};

    Zone.find(condition)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error obteniendo las zonas."
            });
        }
    );
};

exports.findOneZone = (req, res) => {

    const id = req.params.id;

    Zone.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({message: `No se encontró la zona con el Id = ${id}`});
            }
            else {
                res.send(data);
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `Ocurrió un error mientras se obtenida la zona con el Id = ${id}`
            });
        }
    );
};

exports.updateZone = (req, res) => {

    if (!req.body) {
        res.send(404).send({
            message: "La nueva información no debe ser vacia!."
        });
    }

    const id = req.params.id;

    Zone.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            
            if (!data) {
                res.status(404).send({
                    message: `No se pudo actualizar la zona con Id = ${id}.`
                });
            } else {
                res.send({message: "La zona se actualizó satisfactoriamente!." , data});
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `Ocurrió un error al momento de modificar la zona con Id = ${id}`
            });
        }
    );
};

exports.deleteZone = (req, res) => {

    const id = req.params.id;

    Zone.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo eliminar la zona con Id = ${id}. Tal vez la zona no existe.`
                });
            }
            else {
                res.send({
                    message: "Zona eliminada satisfactoriamente."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `No se pudo eliminar la zona con Id =  = ${id}.`
            });
        }
    );
};


exports.deleteAllZones = (req, res) => {

    Zone.deleteMany({})
        .then((data) => {
            res.send({message: `${data.deletedCount} zonas eliminadas!.`});
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar las zonas."
            });
        }
    );
};
*/