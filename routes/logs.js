// *--LOG ROUTES--

// *set up to use router rather than app.use
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// use to protect routes
const auth = require('../middleware/auth');

// *BRING IN THE DB FOR LOGS
const Log = require('../models/Log');

// * @route     GET api/logs
// * @desc      Get all the logs
// * access     public
router.get('/', auth, async (req, res) => {
  try {
    // *!console.log('check this value', req.tech.id)
    // In the Log schema a tech field is the objectId, the auth middleware gives access to the req.tech object in payload of decoded....Essentially find the _id in the database that matches the token in header
    const logs = await Log.find({ tech: req.tech.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    req.status(500).send('Server Error');
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
