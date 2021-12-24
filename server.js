// * BRING IN EXPRESS, BUILD PATH, DB,
const express = require('express');
const path = require('path');
// const connectDB = require('./config/db')
const app = express();
// * DB
const connectDB = require('./config/db');

// *INITIALIZE AND CONNECT TO DB
connectDB();

//* MIDDLEWARE
// replaced body parser for returning and accept json body data
app.use(express.json({ extended: false }));

// *TEST ROUTE
// app.get('/', (req, res) => res.json({ msg: 'Welcome to IT LOGGER world' }));
console.log('hit server');

// *DEFINED API ROUTES TO CALL ROUTE FOLDER
app.use('/api/techs', require('./routes/techs'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/auth', require('./routes/auth'));

// * STATIC ASSETS FOR THE BUILD

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Connected on ${PORT}`));
