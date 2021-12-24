// *--AUTH--TECH ROUTES-----//

// *SET UP TO USE router rather than app.use

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

//* Bringing in the User model
const Tech = require('../models/Tech');

// * @route     GET api/auth
// * @desc      Get logged in tech
// *! access     private cause of auth middleware
router.get('/', auth, async (req, res) => {
    // * IF AUTH SEES LOGGED IN USER, THEN GET USER FROM DB BY ID, DONT RETURN PW
  try {
const tech =await Tech.findById(req.tech.id).select('-password');
res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// * @route     POST api/auth
// * @desc      Auth tech and get token
// * access     public
router.post(
  '/',
  check('email', 'Please add a valid email').isEmail(),
  check('password', 'Please enter a password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);

    //*!if the errors show up from validationResult send 400 array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //* Destructure req.body
    const { email, password } = req.body;
    try {
      // *Handle if tech doesn't exist
      let tech = await Tech.findOne({ email });
      if (!tech) {
        //*! Also used in AuthState in PAYLOAD on FRONTEND
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // *After checking email, this boolean isMatch will move to check password with bcrypt comparing the plaintext password that came in from req.body against the existing hashed password in db
      const isMatch = await bcrypt.compare(password, tech.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // * If the pw and email are correct grab payload and return a token
      //*  payload is the object being sent in the payload
      const payload = {
        tech: {
          id: tech.id
        }
      };

      //* signing the token and passing parameters(payload, jwt secret, option for expiration, callback)
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600000
        },
        (err, token) => {
          if (err) throw err;
          //*! TOKEN sent as res.data on FRONTEND to AuthState.js
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
