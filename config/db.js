const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MY_MONGODB_URI);
    console.log(`MongoDB Connected ${conn.connection.host}...`.underline.magenta);

  } catch (err) {
    console.error(err.message);
    console.log('CHECK ENV VARS');
    process.exit(1);
  }
};
module.exports = connectDB;
