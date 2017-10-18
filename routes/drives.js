const express = require('express');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Car = require('../models/car');
const User = require('../models/user');
const Drive = require('../models/drive');
const authorizeCar = require('../middleware/car-authorization.js')
const authorizeDrive = require('../middleware/drive-authorization.js')
const driveRoutes  = express.Router();


driveRoutes.get('/', (req, res, next) => {

Drive.find({}, (err, drive) => {
    if (err) { return next(err) }
    res.render('drives/index', {
      drive: drive
    });
  });
});

driveRoutes.get('/new', ensureLoggedIn('/login'),(req, res)=> {
  Car.find({_creator: req.user._id}, (err, car) => {
      if (err) { return next(err) }
  res.render('./drives/new', {car: car});
  });
});


driveRoutes.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newDrive = new Drive({
    _creator   : req.user._id,
    driveName: req.body.driveName,
    originAddress: req.body.originAddress,
    destinationAddress: req.body.destinationAddress,
    distance: req.body.distance,
    amountTaken: req.body.amountTaken,
    carId: req.body.carId
    // We're assuming a user is logged in here
    // If they aren't, this will throw an error
  });

  newDrive.save( (err) => {
if (err) {
  res.render('drives/new', { drive: newDrive});
} else {
  res.redirect(`/profile`);
}
});
});

// driveRoutes.get('/:id', ensureLoggedIn('/login'), authorizeDrive, (req, res, next) => {
//    const driveId = req.params.id;
//
//   Drive.findById(driveId, (err, drive) => {
//      if (err) { return next(err); }
//      res.render('drives/details', {drive: drive});
//    });
//  });


 driveRoutes.get('/:id', ensureLoggedIn('/login'), authorizeDrive, (req, res, next) => {
    const driveId = req.params.id;

    Drive.findById(driveId, (err, drive) => {
      if (err) {return next(err); }
      Car.find({_creator: req.user._id}, (err,car)=> {
         if (err) {return next(err); }
         const data = {
           car: car,
           drive: drive
         }
      res.render('drives/details', {drive: drive});
      });
    });
  });

 driveRoutes.get('/:id/edit', ensureLoggedIn('/login'), authorizeDrive, (req, res, next) => {
   const driveId = req.params.id;
 // console.log("`````````",carId);
   Drive.findById(driveId, (err, drive) => {
     if (err) {return next(err); }
     Car.find({_creator: req.user._id}, (err,car)=> {
        if (err) {return next(err); }
        const data = {
          car: car,
          drive: drive
        }
     res.render('drives/edit', data);
    });
   });
 });

 driveRoutes.post('/:id', ensureLoggedIn('/login'), authorizeDrive, (req, res, next) => {

   const driveId = req.params.id;

   /*
    * Create a new object with all of the information from the request body.
    * This correlates directly with the schema of Product
    */
   const updates = {
     driveName: req.body.driveName,
     originAddress: req.body.originAddress,
     destinationAddress: req.body.destinationAddress,
     distance: req.body.distance,
     amountTaken: req.body.amountTaken,
     carId: req.body.carId,

   };

   Drive.findByIdAndUpdate(driveId, updates, (err, drive) => {
      if (err){ return next(err); }
      return res.redirect(`/drives/${drive._id}`);
    });
  });

  driveRoutes.post('/:id/delete', authorizeDrive, (req, res, next) => {
    const driveId = req.params.id;

    Drive.findByIdAndRemove(driveId, (err, drive) => {
      if (err){ return next(err); }
      return res.redirect('/drives');
    });
  });








module.exports = driveRoutes;
