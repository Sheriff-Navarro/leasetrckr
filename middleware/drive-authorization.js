const Drive = require('../models/drive.js');

function authorizeDrive(req, res, next){
    Drive.findById(req.params.id, (err, drive) => {
//if there's an error, forward it
      if(err) { return next(err) }
      //if there is no drive return a 404
      if(!drive){ return next(new Error('404'))}
      //if the drive belongs to the user, next()
      if (drive.belongsTo(req.user)){
        return next()
      } else {
        return res.redirect(`/profile`)
      }
    });
}







module.exports = authorizeDrive;
