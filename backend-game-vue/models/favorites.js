const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: [{
    gameId: { type: Number, ref: 'games' },
    quantity: Number,
    gameName:String,
    gameImage:String,
    gamePrice:Number
  }],

  modifiedOn: { type: Date, default: Date.now }
});

const FavoritesModel = mongoose.model('favorites',FavoritesSchema);
module.exports = FavoritesModel;