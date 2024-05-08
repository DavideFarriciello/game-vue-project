const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const GameModel = require('./models/games');
const UserModel = require('./models/user');
const CartModel = require('./models/cart');
const FavoritesModel = require('./models/favorites');
require('dotenv').config({ path: './models/nodemailer.env' })


const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

const DB_URL = "mongodb://localhost:27017/Database-Game-Store";

// Connect to MongoDB and start the server
mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

  app.get("/", (req, res) => {
    res.send("Welcome to our website!");
});


app.get('/games', (req, res) => {
  GameModel.find()
    .then(games => res.json(games))
    .catch(err => res.status(500).json(err));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).send('Please provide an username!');
}

if (!password) {
    return res.status(400).send('Please provide a password!');
}

  UserModel.findOne({ user: username })
  .then(user => {
    if (!user) {
      return res.status(404).send('Sorry, we couldn\'t find your account!');
    }
    if (user.password === password) {
      res.status(200).json({ message: 'Login successful', userId: user._id });
    } else {
      res.status(401).send("Oops! It seems like your password is incorrect.");
    }
  })
  .catch(err => {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  });
});

app.post("/sign_up", (req, res) => {
  const { username, password, email } = req.body;

  

  if (!username) {
    return res.status(400).send('Please provide a username!');
}
if (!password) {
    return res.status(400).send('Please provide a password!');
}
if (!email) {
    return res.status(400).send('Please provide an email!');
}

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;

  UserModel.findOne({ $or: [{ username: username }, { email: email }] })
  .then(existingUser => {
    if (existingUser) {
      return res.status(400).send('Username or email already in use');
    }

    // Create new user if username and email are unique
    const newUser = new UserModel({
      username: username,
      password: password,
      email: email
    });

    newUser.save()
      .then(user => {
        console.log("User registered successfully:", user);
        res.status(201).send({ message: 'Signup successful', userId: user._id });
      })
      .catch(err => {
        console.error("Error in saving to database: ", err);
        res.status(500).send("Error in saving to database");
      });

  })
  .catch(err => {
    console.error("Database query error:", err);
    res.status(500).send("Error checking user uniqueness");
  });
});

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Password:', process.env.EMAIL_PASS);


app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
      return res.status(400).send(`Please provide your ${!name ? "name" : !email ? "email" : "message"}!`);
  }

  sendEmail(name, email, message)
      .then(() => res.status(200).send('Your email has been sent successfully!'))
      .catch(error => {
          console.error("Error sending email:", error);
          res.status(500).send('Oops! There was a problem sending your message. Please try again.');
      });
});


function sendEmail(name, user_email, message) {
  const { EMAIL_USER, EMAIL_PASS } = process.env; 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


  const mailOptions = {
      from: EMAIL_USER,
      to: 'davide.farriciello@gmail.com',
      subject: `New Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${user_email}\nMessage: ${message}`
  };

  return transporter.sendMail(mailOptions);
}


// add-to-cart
// Assuming that the gameImage URL is included in the request body
app.post('/add-to-cart', async (req, res) => {
  const { userId, gameId, quantity, gameName, gamePrice, gameImage } = req.body;
  
  if (!userId || !gameId || !quantity || !gameName || !gamePrice || !gameImage) {
    return res.status(400).send('All product details must be provided');
  }

  try {
    const userCart = await CartModel.findOne({ userId });
    if (userCart) {
      // Check if the game is already in the cart
      const gameIndex = userCart.items.findIndex(item => item.gameId.toString() === gameId);
      if (gameIndex > -1) {
        // Optionally update the quantity here if needed
        userCart.items[gameIndex].quantity += quantity;
      } else {
        userCart.items.push({ gameId, quantity, gameName, gamePrice, gameImage });
      }
      await userCart.save();
      res.status(200).send('Added to cart');
    } else {
      // Create new cart if not existing
      const newCart = new CartModel({
        userId,
        items: [{ gameId, quantity, gameName, gamePrice, gameImage }]
      });
      await newCart.save();
      res.status(200).send('Added to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('Failed to add to cart');
  }
});


// Get user cart
app.get('/get-cart', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send('Missing userId');
  }

  try {
    const userCart = await CartModel.findOne({ userId }).exec();
    if (userCart) {
      res.json(userCart.items);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send('Failed to fetch cart');
  }
});

// Remove item from cart
app.delete('/remove-from-cart', async (req, res) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
      return res.status(400).send('Missing userId or gameId');
  }

  try {
      const userCart = await CartModel.findOne({ userId });
      if (!userCart) {
          return res.status(404).send('Cart not found');
      }

      // Filter out the item to be removed
      userCart.items = userCart.items.filter(item => item.gameId.toString() !== gameId.toString());
      await userCart.save();

      res.status(200).send('Item removed from cart');
  } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).send('Failed to remove item from cart');
  }
});


//favorites 

app.post('/add-to-favorites', async (req, res) => {
  const { userId, gameId, quantity, gameName, gamePrice, gameImage } = req.body;
  
  if (!userId || !gameId || !quantity || !gameName || !gameImage || !gamePrice) {
    return res.status(400).send('All product details must be provided');
  }

  try {
    const userFavorites = await FavoritesModel.findOne({ userId });
    if (userFavorites) {
      // Check if the game is already in the favorites
      const gameIndex = userFavorites.items.findIndex(item => item.gameId.toString() === gameId);
      if (gameIndex > -1) {
        // Optionally update the quantity here if needed
        userFavorites.items[gameIndex].quantity += quantity;
      } else {
        userFavorites.items.push({ gameId, quantity, gameName, gameImage,gamePrice });
      }
      await userFavorites.save();
      res.status(200).send('Added to favoriteis');
    } else {
      // Create new favoriteis if not existing
      const newFavorites = new FavoritesModel({
        userId,
        items: [{ gameId, quantity, gameName, gamePrice, gameImage }]
      });
      await newFavorites.save();
      res.status(200).send('Added to favoriteis');
    }
  } catch (error) {
    console.error('Error adding to favoriteis:', error);
    res.status(500).send('Failed to add to favoriteis');
  }
});

app.get('/get-favorites', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send('Missing userId');
  }

  try {
    const userFavorites = await FavoritesModel.findOne({ userId }).exec();
    if (userFavorites) {
      res.json(userFavorites.items);
    } else {
      res.status(404).send('Favorites not found');
    }
  } catch (error) {
    console.error('Error fetching favoriteis:', error);
    res.status(500).send('Failed to fetch favoriteis');
  }
});

// Remove item from favorites
app.delete('/remove-from-favorites', async (req, res) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
      return res.status(400).send('Missing userId or gameId');
  }

  try {
      const userFavorites = await FavoritesModel.findOne({ userId });
      if (!userFavorites) {
          return res.status(404).send('Favorites not found');
      }

      // Filter out the item to be removed
      userFavorites.items = userFavorites.items.filter(item => item.gameId.toString() !== gameId.toString());
      await userFavorites.save();

      res.status(200).send('Item removed from favorites');
  } catch (error) {
      console.error('Error removing item from favorites:', error);
      res.status(500).send('Failed to remove item from favorites');
  }
});





