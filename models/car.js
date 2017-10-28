const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const moment = require('moment');
const Drive = require('./drive');
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
  imageUrl      : { type: String, required: false, default: "/images/default-display-car.png"},

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
CarSchema.virtual('yearlyAllowedMileage').get(function(){
  return Math.floor(this.totAllotMiles / this.leaseYears);
});

CarSchema.virtual('monthlyAllowedMileage').get(function(){
  return Math.floor(this.totAllotMiles / this.leaseDurationMonths);
});

CarSchema.virtual('leaseYears').get(function(){
  return this.leaseDurationMonths / 12;
});

CarSchema.virtual('dailyMileageAllowed').get(function(){
  return Math.floor(this.totAllotMiles/(365*this.leaseYears));
})

CarSchema.virtual('totalLeaseDays').get(function(){
  return this.leaseYears * 365;
})

CarSchema.methods.belongsTo = function(user){
  return this._creator.equals(user._id);
};

CarSchema.virtual('timeRemaining').get(function () {
  let remaining = moment(this.leaseExpires).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

CarSchema.virtual('leaseDaysLeft').get(function(){
  const future = moment([this.inputFormattedDate]);
  console.log(future);
  const ahora = moment([]);
  console.log(ahora);
  return future.diff(ahora, 'days');

})

CarSchema.virtual('daysPassed').get(function(){
  return this.totalLeaseDays - this.leaseDaysLeft;
})

CarSchema.virtual('weeksPassed').get(function(){
  return Math.floor(this.daysPassed/7);
})

CarSchema.virtual('allotMileageTillNow').get(function(){
  return this.daysPassed * this.dailyMileageAllowed;
})



// fromNow(true) prints the date without a suffix.

// moment(yesterday).fromNow()
// => 1 day ago

// moment(yesterday).fromNow(true)
// => 1 day

CarSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.leaseExpires).format('YYYY-MM-DD');
});

CarSchema.virtual('pace').get(function(){
  return this.allotMileageTillNow - this.currentOdom;
})

CarSchema.virtual('howAmIDoing').get(function(){
  if (this.pace > 0 ) {
    return ('You have a Credit of ' + this.pace + " miles!")
  } else if (this.pace < 0 ) {
    return ("Slow it Down! You're over bye " + this.pace + " miles!")
  } else { return "Wow! You're right on Target!"};

})

CarSchema.virtual('step').get(function(){
  return this.leaseDurationMonths / 6;
})

CarSchema.virtual('forecastedRoutes').get(function(){
  var foreCastedTotal = 0;
  Drive.find({carId: this._id}, (err, drive)=>{
    if (err) {return next(err);}
    drive.forEach(function(drives) {
      foreCastedTotal += drives.distance * drives.amountTaken;
      console.log("TOTAL  1", foreCastedTotal);
    });
    console.log("TOTAL  2", foreCastedTotal);
    return foreCastedTotal;
  });
});










const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
