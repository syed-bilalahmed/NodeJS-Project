const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing_model.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/project";

// Define the main function first
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");

    // Call initDB after successful connection
    await initDB();
  } catch (err) {
    console.log(err);
  }
}

// Define initDB function
const initDB = async () => {
  try {
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  } catch (err) {
    console.log("Error initializing data:", err);
  }
};

// Call the main function
main();
