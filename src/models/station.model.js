var { Schema, model } = require('mongoose');

var Zone = model('Zone');

var stationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zone: {
    type: Schema.ObjectId,
    ref: "Zone"
  },
  routes: [{
    type: Schema.ObjectId,
    ref: "Route"
  }]
}, { timestamps: true });

module.exports = model("Station", stationSchema);

