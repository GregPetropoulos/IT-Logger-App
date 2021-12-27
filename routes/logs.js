// *--LOG ROUTES--

// *set up to use router rather than app.use
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// use to protect routes
const auth = require ('../middleware/auth');

// *BRING IN THE DB FOR LOGS
const Log = require('../models/Log');


// * @route     GET api/logs
// * @desc      Get all the logs
// * access     public
router.get('/', auth, async (req, res) => {
try {
  // *!console.log('check this value', req.tech.id)
  // In the Log schema a tech field is the objectId, the auth middleware gives access to the req.tech object in payload of decoded....Essentially find the _id in the database that matches the token in header 
  const logs = await Log.find({tech:req.tech.id}).sort({date:-1});
  res.json({logs});
} catch (err) {
  console.error(err.message);
  req.status(500).send('Server Error');
}
});

// * @route     POST api/logs
// * @desc      Add a new log
// * access     public
router.post('/', async (req, res) => {
  res.send(' Post for adding a new log');
});

// * @route     PUT api/logs/:id
// * @desc      Edit a log
// * access     public
router.put('/:id', (req, res) => {
  res.send(' Update the log');
});

// * @route     DELETE api/logs/:id
// * @desc      Delete a log
// * access     public
router.delete('/:id', (req, res) => {
    res.send(' Delete the log');
  });
module.exports = router;
