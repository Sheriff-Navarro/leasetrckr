const Car = require('../models/car.js');

function authorizeCar(req, res, next){
  console.log("req.user=",req.user);
    Car.findById(req.params.id, (err, car) => {
//if there's an error, forward it
      if(err) { return next(err) }
      //if there is no car return a 404
      if(!car){ return next(new Error('404'))}
      //if the car belongs to the user, next()
      if (car.belongsTo(req.user)){
        return next()
      } else {
        return res.redirect(`/profile`)
      }
    });
}


module.exports = authorizeCar;
