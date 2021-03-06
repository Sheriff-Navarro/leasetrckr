const express = require('express');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Car = require('../models/car');
const User = require('../models/user');
const Drive = require('../models/drive');
const authorizeCar = require('../middleware/car-authorization.js')
const carRoutes  = express.Router();
carRoutes.get('/', (req, res, next) => {

Car.find({}, (err, car) => {
    if (err) { return next(err) }
    res.render('cars/index', {
      car: car
    });
  });
});



carRoutes.get('/new', ensureLoggedIn('/login'),(req, res)=> {
  res.render('./cars/new');
});

carRoutes.post('/', ensureLoggedIn('/login'), (req, res, next) => {

  // if (req.body.imageUrl.length == 0 ) {
  //   req.body.imageUrl = "/images/default-display-car.png";
  // };
  req.body.imageUrl = (req.body.imageUrl.length == 0)
  ?
  "/images/default-display-car.png"
  :
  req.body.imageUrl;

  console.log('req.body.imageUrl.length', req.body.imageUrl.length);

  const newCar = new Car({
    _creator   : req.user._id,
    carName: req.body.carName,
    totAllotMiles: req.body.totAllotMiles,
    currentOdom: req.body.currentOdom,
    leaseDurationMonths: req.body.leaseDurationMonths,
    leaseExpires: req.body.leaseExpires,
    imageUrl: req.body.imageUrl
    // We're assuming a user is logged in here
    // If they aren't, this will throw an error
  });


  newCar.save( (err) => {
if (err) {
  res.render('cars/new', { car: newCar});
} else {
  res.redirect(`/profile`);
}
});
});


carRoutes.get('/:id', ensureLoggedIn('/login'), authorizeCar, (req, res, next) => {
   const carId = req.params.id;
   let foreCastedTotal = 0;
   let yearlyForeCastedTotal = foreCastedTotal * 52;
  Car.findById(carId, (err, car) => {
     if (err) { return next(err); }
     Drive.find({carId: carId}, (err, drive) => {
       if (err) { return next(err); }
       drive.forEach(function(drives) {
         foreCastedTotal += drives.distance * drives.amountTaken;
         console.log("TOTAL  1", foreCastedTotal);
       });
       const data = {
         car: car,
         drive: drive,
         foreCastedTotal: foreCastedTotal,
         yearlyForeCastedTotal: yearlyForeCastedTotal
       }
     res.render('cars/details', data);
   });
  });
});

carRoutes.post('/:id', ensureLoggedIn('/login'), authorizeCar,(req, res, next) => {
  console.log("whatever inside patch");
  const carId = req.params.id;
  const updates = {
    currentOdom: req.body.currentOdom,
  }
  Car.findByIdAndUpdate(carId, updates, (err, car) => {
     if (err){ return next(err); }
     return res.redirect(`/cars/${car._id}`);
   })
});

carRoutes.get('/:id/edit', ensureLoggedIn('/login'), authorizeCar, (req, res, next) => {
  const carId = req.params.id;
// console.log("`````````",carId);
  Car.findById(carId, (err, car) => {
    if (err) {return next(err); }
    res.render('cars/edit', {car: car});
  })
})

carRoutes.post('/:id/edit', ensureLoggedIn('/login'), authorizeCar,(req, res, next) => {

  const carId = req.params.id;
  console.log("`````````",carId);

  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const updates = {
    carName: req.body.carName,
    totAllotMiles: req.body.totAllotMiles,
    currentOdom: req.body.currentOdom,
    leaseDurationMonths: req.body.leaseDurationMonths,
    leaseExpires: req.body.leaseExpires,
    imageUrl: req.body.imageUrl
  };

  Car.findByIdAndUpdate(carId, updates, (err, car) => {
     if (err){ return next(err); }
     return res.redirect(`/cars/${car._id}`);
   });
 });


 carRoutes.post('/:id/delete', authorizeCar, (req, res, next) => {
   const carId = req.params.id;

   Car.findByIdAndRemove(carId, (err, car) => {
     if (err){ return next(err); }
     return res.redirect('/profile');
   });
 });



module.exports = carRoutes;
