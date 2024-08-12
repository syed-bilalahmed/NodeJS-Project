const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,  // Removes whitespace from both ends of the string
  },
  image: {
    type: String,
    default: "https://example.com/default-image.jpg" // Replace with your default image URL
  },
  price: {
    type: Number,
    min: [0, 'Price must be a positive number'], // Ensures price is not negative
  },
  location: {
    type: String,
    trim: true,  // Removes whitespace from both ends of the string
  },
  country: {
    type: String,
    trim: true,  // Removes whitespace from both ends of the string
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
