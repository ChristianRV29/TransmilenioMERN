var {Schema, model} = require('mongoose');

var Zone = model('Zone');

var stationSchema = new Schema ({
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
},{timestamps: true});

module.exports = model("Station", stationSchema);

//  module.exports = mongoose => {
    
//     var schema = mongoose.Schema({
//         name: {
//            type: String,
//            required: true,
//         },
//         zone: {
//            type: Schema.ObjectId, 
//            ref: "Zone"
//         }
//       },
//         {timestamps: true}
//     );

//     schema.method("toJSON", function(){

//       const {__v, _id, _name, ...object} = this.toObject();

//       object.id = _id;

//       return object;
//   });

//   const Station = mongoose.model("station", schema);

//   return Station;

//  };