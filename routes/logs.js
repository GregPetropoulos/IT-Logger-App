// *SET UP TO USE router rather than app.use
const express = require('express');
const router = express.Router();

// * @route     GET api/logs
// * @desc      Get all the logs
// * access     public
router.get('/', (req, res) => {
  res.send(' Get All the logs');
});

// * @route     POST api/logs
// * @desc      Add a new log
// * access     public
router.post('/', (req, res) => {
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
