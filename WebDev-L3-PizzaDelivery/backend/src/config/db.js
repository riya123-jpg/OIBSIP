const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to db");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
  console.log("Database:", mongoose.connection.name);
  console.log("Host:", mongoose.connection.host);
}

module.exports = connectDB;
