const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //We use 'await' because connecting to a database across the internet takes time
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    // If the password is wrong or the server is down, we want to know why immediately
    console.error(`Error: ${error.message}`);
    process.exit(1); // Kill the process so we don't run a broken server
  }
}

module.exports = connectDB;