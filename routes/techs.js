// *--ADD/REGISTER--EDIT-DELETE--TECH ROUTES-----//

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

// * @route     GET api/techs
// * @desc      Get all the techs 
// !#* access     public----might need to be private
router.get('/', async (req, res) => {
  try {
    // *!console.log('check this value', req.tech.id)
    // In the Log schema a tech field is the objectId, the auth middleware gives access to the req.tech object in payload of decoded....Essentially find the _id in the database that matches the token in header
    const techs = await Tech.find().select('-password');
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// * @route     POST api/techs
// * @desc      Add (register and encrypt) a new tech to db -- auth user and get token
// * access     public
router.post(
  '/',
  check('firstName', 'Please add a first name').not().isEmpty(),
  check('lastName', 'Please add a last name').not().isEmpty(),
  check('email', 'Please add a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);

    //*!if the errors show up from validationResult send 400 array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //* Destructure req.body
    const { firstName, lastName, email, password } = req.body;
    try {
      // *Handle a duplicate existing tech
      let tech = await Tech.findOne({ email });
      if (tech) {
        //*! Also used in authActions in PAYLOAD on FRONTEND
        return res.status(400).json({ msg: 'Tech already exist' });
      }
      // * New up a tech from info coming from the destructured req.body ln33
      tech = new Tech({
        firstName,
        lastName,
        email,
        password
      });

      //* encrypting (hashing) the password before saved to db using bcryptjs
      const salt = await bcrypt.genSalt(10);
      tech.password = await bcrypt.hash(password, salt);

      // *Save Tech to DB
      await tech.save();
      // res.send('passed'); response check if working

      // * JWT SETUP
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
          expiresIn: '5 days'
        },
        (err, token) => {
          if (err) throw err;
          //*! TOKEN sent as res.data on FRONTEND to authActions.js
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// * @route     PUT api/techs/:id
// * @desc      Edit a tech
// * access     public
// router.put('/:id', (req, res) => {
//   res.send('Edit a tech');
// });
// * @route     DELETE api/techs/:id
// * @desc      Delete a tech
// * access     public
// router.delete('/:id', (req, res) => {
//   res.send('Delete a tech');
// });
module.exports = router;
