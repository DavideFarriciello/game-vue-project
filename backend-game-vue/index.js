const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const GameModel = require('./models/games');
const UserModel = require('./models/user');
const CartModel = require('./models/cart.JS');

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

  if (!passwordRegex.test(password)) {
    return res.status(400).send('Password must be at least 5 characters long and include at least one number and one special character.');
  }

  const newUser = new UserModel({
    user: username,
    password: password,
    email: email
  });

 
  newUser.save()
    .then(user => {
      console.log("Record Inserted Successfully", user);
      res.status(202).send('Signup successful');
    })
    .catch(err => {
      console.error("Error in saving to database: ", err);
      res.status(500).send("Error in saving to database");
    });
});

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
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });

  const mailOptions = {
      from: EMAIL_USER,
      to: 'davide.farriciello@gmail.com',
      subject: `New Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${user_email}\nMessage: ${message}`
  };

  return transporter.sendMail(mailOptions);
}

app.get('/cart', async (req, res) => {
  if (!req.query.userId) {
    return res.status(400).send('UserId is required');
  }
  try {
    const cart = await CartModel.findOne({ userId: req.query.userId });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    // Manually populate game details if necessary
    const gameIds = cart.items.map(item => item.gameId);
    const games = await GameModel.find({ 'id': { $in: gameIds } });
    const populatedItems = cart.items.map(item => {
      const gameDetails = games.find(game => game.id === item.gameId);
      return { ...item, gameDetails };
    });

    res.json({ ...cart.toObject(), items: populatedItems });
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    res.status(500).send('Server error');
  }
});

// add-to-cart
app.post('/add-to-cart', async (req, res) => {
  console.log("Received add-to-cart request with body:", req.body);
  const { userId, gameId, quantity, gameName, gamePrice } = req.body;

  if (!userId || !gameId || !quantity || !gameName || !gamePrice) {
    return res.status(400).send('Missing userId, gameId, or quantity');
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).send('Invalid quantity');
  }

  try {
    const userCart = await CartModel.findOne({ userId });
    if (userCart) {
      const gameIndex = userCart.items.findIndex(item => item.gameId.toString() === gameId.toString());

      if (gameIndex > -1) {
        userCart.items[gameIndex].quantity += quantity;
      } else {
        userCart.items.push({ gameId, quantity, gameName, gamePrice });
      }

      await userCart.save();
    } else {
      const newCart = new CartModel({
        userId,
        items: [{ gameId, quantity, gameName, gamePrice }]
      });

      await newCart.save();
    }

    res.status(200).send('Added to cart');
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('Failed to add to cart');
  }
});



