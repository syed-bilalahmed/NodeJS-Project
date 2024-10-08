// Import Express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing_model');
const port = 8000;

const path = require('path');
const methoOverRide = require('method-override');
const { table } = require('console');

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
app.use(methoOverRide("_method"));
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
// app.get("/listing/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listing/edit.ejs", { listing });
// });
app.get('/listing/:id/edit', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render('listing/edit', { listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).send("Error fetching listing");
  }
});

app.put('/listing/:id', async (req, res) => {
  let { id } = req.params;
  try {
    await Listing.findByIdAndUpdate(id, req.body.listing);
    console.log("Data has been updated");
    res.redirect('/listing');
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).send("Error updating listing");
  }
});

app.delete('/listing/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (deletedListing) {
      console.log("Deleted listing:", deletedListing);
      res.redirect('/listing'); // Adjust redirection based on your routing
    } else {
      res.status(404).send("Listing not found");
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).send("Internal server error");
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
