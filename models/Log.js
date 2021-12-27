const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  // *Specific to a users logs
    tech:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'techs' 
    },
  message: {
    type: String
  },
  attention: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('log', LogSchema);
