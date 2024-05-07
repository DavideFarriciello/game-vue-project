const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: [{
    gameId: { type: Number, ref: 'games' }, // Change to Number
    quantity: Number,
    gameName:String,
    gamePrice:Number,
    gameImage:String
  }],

  modifiedOn: { type: Date, default: Date.now }
});

const CartModel = mongoose.model('cart', CartSchema);
module.exports = CartModel;