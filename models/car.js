const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CarSchema = new Schema({
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  //keeping it simple with just name instead of models
  carName       : { type: String, required: true },
  //Is the lease 30k, 36k, 48k, 60k
  totAllotMiles : { type: Number, required: true },
  //What does the Odometer currently read? This is very important!
  currentOdom   : { type: Number, required: true},
  //Lease duration in months
  leaseDurationMonths : { type: Number, required: true },
  //Date the lease expires
  leaseExpires  : { type: Date, required: true},
  //User wants to show their car
  imageUrl      : { type: String, required: false},

});

// CarSchema.virtual('timeRemaining').get(function () {
//   let remaining = moment(this.deadline).fromNow(true).split(' ');
//   let [days, unit] = remaining;
//   return { days, unit };
// });
//
// CarSchema.virtual('inputFormattedDate').get(function(){
//   return moment(this.deadline).format('YYYY-MM-DD');
// });

CarSchema.methods.belongsTo = function(user){
  return this._creator.equals(user._id);
}


const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
