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
  res.redirect(`/cars`);
}
});
});


carRoutes.get('/:id', ensureLoggedIn('/login'), authorizeCar, (req, res, next) => {
   const carId = req.params.id;

  Car.findById(carId, (err, car) => {
     if (err) { return next(err); }
     res.render('cars/details', {car: car});
   });
 });

carRoutes.get('/:id/edit', ensureLoggedIn('/login'), authorizeCar, (req, res, next) => {
  const carId = req.params.id;
// console.log("`````````",carId);
  Car.findById(carId, (err, car) => {
    if (err) {return next(err); }
    res.render('cars/edit', {car: car});
  })
})

carRoutes.post('/:id', ensureLoggedIn('/login'), authorizeCar,(req, res, next) => {

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


 carRoutes.post('/:id/delete', (req, res, next) => {
   const carId = req.params.id;

   Car.findByIdAndRemove(carId, (err, car) => {
     if (err){ return next(err); }
     return res.redirect('/cars');
   });
 });

module.exports = carRoutes;
