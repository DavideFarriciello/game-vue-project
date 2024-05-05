const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  id: Number,
  name: String,
  subName: String,
  console:String,
  image: String,
  price:Number,
  type:String,
  dateGame:String,
  pegi: String,
  pic1: String,
  pic2: String,
  pic3: String,
  pic4: String
});

const GameModel = mongoose.model("games",GameSchema)
module.exports = GameModel