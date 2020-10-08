const db = require('../models');
const Zone = db.zones;

exports.createZone = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'Content can not be empty!.'});

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
                    err.message || "Some error has ocurred while creating zone."
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
                    err.message || "Some error has ocurred while retriveing the Zones."
            });
        }
    );
};

exports.findOneZone = (req, res) => {

    const id = req.params.id;

    Zone.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({message: `Not found the Zone with id = ${id}`});
            }
            else {
                res.send(data);
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `An error has ocurred while retrieving the Zone with id = ${id}`
            });
        }
    );
};

exports.updateZone = (req, res) => {

    if (!req.body) {
        res.send(404).send({
            message: "Data update can't be empty!."
        });
    }

    const id = req.params.id;

    Zone.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Zone with id = ${id}`
                });
            } else {
                res.send({message: "Topic was update succesfully!." , data});
            }
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || `An error has been ocurred while updating Zone with id ${id}`
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
                    message: `Cannot delete Zone with id = ${id}. Maybe Zone wasn't exists`
                });
            }
            else {
                res.send({
                    message: "Zone was deleted succesfully!."
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Could not delete Topic with id = ${id}`
            });
        }
    );
};


exports.deleteAllZones = (req, res) => {

    Zone.deleteMany({})
        .then((data) => {
            res.send({message: `${data.deletedCount} Zone's were deleted succesfully!.`});
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all Topics."
            });
        }
    );
};
