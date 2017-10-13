const express = require('express');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Car = require('../models/car');
const User = require('../models/user');
const Drive = require('../models/drive');
const authorizeCar = require('../middleware/car-authorization.js')
const driveRoutes  = express.Router();


driveRoutes.get('/', (req, res, next) => {

Drive.find({}, (err, car) => {
    if (err) { return next(err) }
    res.render('drives/index', {
      drive: drive
    });
  });
});

driveRoutes.get('/new', ensureLoggedIn('/login'),(req, res)=> {
  res.render('./drives/new');
});

driveRoutes.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newDrive = new Drive({
    _creator   : req.user._id,
    driveName: req.body.driveName,
    originAddress: req.body.originAddress,
    destinationAddress: req.body.destinationAddress,
    distance: req.body.distance,
    amountTaken: req.body.amountTaken,

    // We're assuming a user is logged in here
    // If they aren't, this will throw an error
  });

  newDrive.save( (err) => {
if (err) {
  res.render('drives/new', { drive: newDrive});
} else {
  res.redirect(`/drives`);
}
});
});














module.exports = driveRoutes;
