const { Schema, model} = require('mongoose');

const zoneSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },  
}, {timestamps: true});

module.exports = model('Zone', zoneSchema);
