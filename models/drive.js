const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Car = require('./car');
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
  //associated car
  carId : {type: Schema.Types.ObjectId, ref: 'Car', required: true},

  weeklyDistance: {type: Number, value: this.amountTaken * this.distance},
});

DriveSchema.methods.belongsTo = function(user){
  return this._creator.equals(user._id);
}

DriveSchema.virtual('carUsed').get(function(car) {
  return this.carId.equals(car._id);
  console.log(carUsed);
})



DriveSchema.virtual('dailyAverage').get(function(){
  return Math.ceil(this.distance * this.amountTaken / 7);
})

DriveSchema.virtual('weeklyDist').get(function(){
  return this.distance * this.amountTaken;
})

DriveSchema.virtual('estimatedMonthlyDistance').get(function(){
  return Math.ceil(this.dailyAverage * 30);
})

DriveSchema.virtual('estimatedYearlyDistance').get(function(){
  return this.estimatedMonthlyDistance * 12;
})

DriveSchema.virtual('reduceRoutes').get(function(){
  const routesArray = [];

})

const Drive = mongoose.model('Drive', DriveSchema);
module.exports = Drive;
