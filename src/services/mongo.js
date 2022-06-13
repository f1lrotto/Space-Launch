const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    throw err
  }
}

module.exports = {
  connectMongo,
};
