const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
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
