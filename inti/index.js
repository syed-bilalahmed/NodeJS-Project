const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing_model.js");

const MONGO_URL= mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
  socketTimeoutMS: 45000, // Increase to 45 seconds
});

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}





const initDB    =  async ()=>{
 
 await Listing.insertMany(initData.data);
 console.log("Data was initialoized");
 
}

initDB();