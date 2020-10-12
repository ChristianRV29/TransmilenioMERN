var { Schema, model } = require('mongoose');

var Station = model('Station');

 var routeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    stations: [{
        type: Schema.ObjectId,
        ref: "Station"
    }]
 }, {timestamps: true});

 module.exports = model("Route", routeSchema);