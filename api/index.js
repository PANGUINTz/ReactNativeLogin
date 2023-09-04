const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8080;
const cors = require('cors');
const ipAddress = '192.168.1.104';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose
  .connect('mongodb+srv://pang:pang@cluster0.4woh5z6.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log('Error Connecting to mongoDB'));

app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}`);
});

const User = require('./models/user');
const Post = require('./models/post');

const sendVerificationEmail = async (email, verificationToken) => {
  const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pangza2544@gmail.com',
      pass: 'zryzehykkketoqid',
    },
  });

  const mailOptions = {
    from: 'threads.com',
    to: email,
    subject: `Email Verificaition`,
    text: `Please click the following link to virify your email http://localhost:8080/verify/${verificationToken}`,
  };

  try {
    await transpoter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending Email', error);
  }
};

app.get('/test', (req, res) => {
  res.status(200).send({message: 'Hi'});
});

///////////////////////////////////////////////////////////////////////////////////// Register /////////////////////////////////////////////////////////////////////////////////////

app.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;

    const existEmail = await User.findOne({email});
    const existUser = await User.findOne({username});

    if (existUser || existEmail) {
      return res
        .status(400)
        .send({message: 'Email or Username already register'});
    }

    const newUser = new User({
      email,
      username,
      password,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).send({
      message: 'Registration Successful',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Error register User'});
  }
});

///////////////////////////////////////////////////////////////////////////////////// Verify Mail /////////////////////////////////////////////////////////////////////////////////////

app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({verificationToken: token});

    if (!user) {
      return res.status(404).send({message: 'Invalid  token'});
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).send({message: 'Email verified successful'});
  } catch (error) {
    console.log('error getting token', error);
    return res.status(500).send({message: 'Email verification failed'});
  }
});

///////////////////////////////////////////////////////////////////////////////////// Login ////////////////////////////////////////////////////////////////////////////////////

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};

const secretKey = generateSecretKey();

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log(user);

    if (!user) {
      return res.status(400).send({message: 'Invalid Email'});
    }

    if (user.password !== password) {
      return res.status(404).send({message: 'Invalid Password'});
    }
    const token = jwt.sign({userId: user._id}, secretKey);
    res.status(200).send({token});
  } catch (error) {
    console.log(error);
    res.status(404).send({message: 'Login Failed'});
  }
});
