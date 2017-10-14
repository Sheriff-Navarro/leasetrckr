const express = require('express');
const bcrypt = require('bcrypt');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const Car = require('../models/car');
const Drive = require('../models/drive');
const userRoutes  = express.Router();

/* GET users listing. */


// userRoutes.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
// Car.find({_creator: req.user._id}, (err, car) => {
//     if (err) { return next(err) }
//     res.render('user/profile', {car: car});
//   });
// });



userRoutes.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
Car.find({_creator: req.user._id}, (err, car) => {
    if (err) { return next(err) }
Drive.find({_creator: req.user._id}, (err, drive) => {
  if (err) {return next(err)}
  const data = {
    car: car,
    drive: drive
  }
 res.render('user/profile', data);
    });
  });
});


module.exports = userRoutes;
