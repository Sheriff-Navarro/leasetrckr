const express = require('express');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login'
}));


router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup'
}));



module.exports = router;
