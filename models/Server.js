const mongoose = require('mongoose');

const ServerSchema = mongoose.Schema({
  name: {
    type: String,
    default:"Server"
  },
  
  status: {
    type: Boolean,
    default:true
  },
counter: {
    type:Number
},
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('servers', ServerSchema);
