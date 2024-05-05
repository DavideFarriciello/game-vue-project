const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const GameModel = require('./models/games');
const UserModel = require('./models/user'); // Make sure the path is correct

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
      res.status(202).send('Login successful');
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

