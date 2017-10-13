const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DriveSchema = new Schema({
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  //keeping it simple with just name instead of models
  driveName       : { type: String, required: true },
  //Is the lease 30k, 36k, 48k, 60k
  originAddress : { type: String, required: true },
  //What does the Odometer currently read? This is very important!
  destinationAddress   : { type: String, required: true},
  //Lease duration in months
  distance : { type: Number, required: true },
  //Date the lease expires
  amountTaken  : { type: Number, required: true},

});





const Drive = mongoose.model('Drive', DriveSchema);
module.exports = Drive;
