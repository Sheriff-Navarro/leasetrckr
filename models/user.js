// models/user.js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// const Car = require('./car');



const userSchema = new Schema({
  email      : {type: String, required: [true, "Please enter your email address."]},
  password   : {type: String, required: [true, "Please enter a password."]},
  imgUrl     : {type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" },
  idCars     : [{type: Schema.Types.ObjectId, ref: 'Car'}]
  // idRoutes   : []
});



const User = mongoose.model('User', userSchema);
module.exports = User;
