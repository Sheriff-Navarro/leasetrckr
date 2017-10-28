const express = require('express');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const authRoutes  = express.Router();

authRoutes.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login');
});

authRoutes.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login'
}));

authRoutes.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup');
});

// routes/authentication.js
authRoutes.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup'
}));

authRoutes.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


// authRoutes.get('/:id', (req, res, next) => {
//    const userId = req.params.id;
//
//   User.findById(userId, (err, user) => {
//      if (err) { return next(err); }
//      res.render('/profile', {user: user});
//    });
//  });

module.exports = authRoutes;
