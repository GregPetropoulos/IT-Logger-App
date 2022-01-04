// *--LOG ROUTES--

// *set up to use router rather than app.use
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// use to protect routes
const auth = require('../middleware/auth');

// *BRING IN THE DB FOR LOGS
const Log = require('../models/Log');

// // * @route     GET api/logs/techlogs
// // * @desc      Get all the logs for a specific tech id ONLY--AUTH
// // *! access     private
// router.get('/techlogs',auth, async (req, res) => {
//   try {
//     // *!console.log('check this value', req.tech.id)
//     // In the Log schema a tech field is the objectId, the auth middleware gives access to the req.tech object in payload of decoded....Essentially find the _id in the database that matches the token in header
//     const logs = await Log.find({ techs: req.tech.id }).sort({ date: -1 });
//     res.json(logs);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// * @route     GET api/logs
// * @desc      Get all the logs and the tech that wrote a message--NOAUTH
// * access     public
router.get('/', async (req, res) => {
  try {
    // *!console.log('check this value', req.tech.id)
    // In the Log schema a tech field is the objectId, the auth middleware gives access to the req.tech object in payload of decoded....Essentially find the _id in the database that matches the token in header
    const logs = await Log.find().sort({ date: -1 }).populate('tech', ['firstName', 'lastName', '_id', 'date']);
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('logs route Server Error');
  }
});

// * @route     POST api/logs
// * @desc      Add a new log
//! @access   Private

router.post(
  '/',
  auth,
  check('message', 'A message is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    //*!if the errors show up from validationResult send 400 array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //*Set up a new Log
    const { message, attention, date } = req.body;
    try {
      const newLog = new Log({
        tech: req.tech.id,
        message,
        attention,
        date
      });

      // Save to db
      const log = await newLog.save();
      // Return log to client
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// * @route     PUT api/logs/:id
// * @desc      Edit a log
//! @access   Private

router.put('/:id', auth, async (req, res) => {
  const { message, attention, date } = req.body;

  //*Build a log object, ex: if message true then add to log fields
  const logFields = {};
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (date) logFields.date = date;

  try {
    //*Find the log id in the params
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    // *Make sure the tech owns the log by comparing the log.tech to token id (req.tech.id)
    // The log.tech is an object and must be turned into a string to compare to req.tech.id string
    if (log.tech.toString() !== req.tech.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    // *The actual update after the checks pass
    log = await Log.findByIdAndUpdate(
      req.params.id, //this is the log id to update
      { $set: logFields }, //pass in new object our logFields described above line 73
      { new: true } //If log doesn't exist then create it?
    );
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// * @route     DELETE api/logs/:id
// * @desc      Delete a log
// * access     public
router.delete('/:id', auth, async (req, res) => {
  try {
    //*Find the log id in the params
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    // *Make sure the tech owns the log by comparing the log.tech to token id (req.tech.id)
    // The log.tech is an object and must be turned into a string to compare to req.tech.id string
    if (log.techs.toString() !== req.tech.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    await Log.findByIdAndRemove(req.params.id);
    res.json({msg:'Contact removed'})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
