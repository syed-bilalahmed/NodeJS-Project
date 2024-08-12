// Import Express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing_model');
const port = 8000;

const path = require('path');

// Connection string
const MONGO_URL = 'mongodb://localhost:27017/project';

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
     
      serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
      socketTimeoutMS: 45000, // Increase to 45 seconds
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
}

main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.render("index.ejs")
})



//index route
app.get("/listing", async (req, res) => {
  try {
    const all_listing = await Listing.find({});
    res.render("listing/index", { all_listing });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
});
//new route
app.get("/listing/new",(req,res)=>{
  res.render("listing/new.ejs");
})


 //show route 

 app.get("/listing/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listing/show.ejs", { listing });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/listing", async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log("Listing saved successfully");
    res.redirect("/listing"); // Redirect or render a success page
  } catch (error) {
    console.error("Error saving listing:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
