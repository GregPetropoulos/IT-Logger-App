// *SET UP TO USE router rather than app.use
const express = require('express');
const router = express.Router();

// bringing the User model
const Tech = require('../models/Tech');


// * @route     GET api/techs
// * @desc      Get all the techs
// * access     public
router.get('/', (req, res) => {
  res.send('Get all the techs');
});

// * @route     POST api/techs
// * @desc      Add a new tech
// * access     public
router.post('/', (req, res) => {
  res.send(req.body);
});

// * @route     PUT api/techs/:id
// * @desc      Edit a tech
// * access     public
router.put('/:id', (req, res) => {
  res.send('Edit a tech');
});
// * @route     DELETE api/techs/:id
// * @desc      Delete a tech
// * access     public
router.delete('/:id', (req, res) => {
  res.send('Delete a tech');
});
module.exports = router;
