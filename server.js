// * BRING IN EXPRESS, BUILD PATH, DB,
const express = require('express');
const path = require('path');
const colors = require('colors')

// * ENV VARS RO ACCESS PROCESS.ENV
const dotenv = require('dotenv').config();

const app = express();

// *INITIALIZE AND CONNECT TO DB
const connectDB = require('./config/db');
connectDB();

//* MIDDLEWARE
// replaced body parser for returning and accept json body data
// app.use(express.json({ extended: false }));
app.use(express.json());

// *TEST ROUTE
// app.get('/', (req, res) => res.json({ msg: 'Welcome to IT LOGGER world' }));
console.log('hit server');

// *DEFINED API ROUTES TO CALL ROUTE FOLDER
app.use('/api/techs', require('./routes/techs'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/auth', require('./routes/auth'));

// * STATIC ASSETS FOR THE BUILD
// if (process.env.NODE_ENV === 'production') {
//     // Set the static folder
//     app.use(express.static('client/build'));
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
//   }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Connected on ${PORT}`));
