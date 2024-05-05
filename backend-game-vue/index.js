var express = require("express");
const cors = require("cors"); 
var mongoose = require("mongoose");
const GameModel = require('./models/games');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200 
};


// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());

const DB_URL = "mongodb://localhost:27017/Database-Game-Store";

// Connect to MongoDB
mongoose.connect(DB_URL)
  .then((result) => {
    console.log("Connected to Database");
    app.listen(3000);
  })
  .catch((err) => console.error("MongoDB connection error:", err));



app.get('/games', (req, res) => {
  GameModel.find()
  .then(games => res.json(games))
  .catch(err => res.json(err));
});