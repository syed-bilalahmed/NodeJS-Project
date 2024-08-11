const mongoose = require('mongoose');
const { Schema } = mongoose;  // Destructure Schema from mongoose

const listingSchema = new Schema({
    title: String,
    desc: String,
    image: {
        default:"https://w7.pngwing.com/pngs/447/166/png-transparent-house-real-estate-property-bank-house-building-grass-window.png",
        type: String,
        set: (v) => v === "" ? "https://w7.pngwing.com/pngs/447/166/png-transparent-house-real-estate-property-bank-house-building-grass-window.png" : v
    },
    price: String,
    location: String,
    country: String
}, {
    timestamps: true  // Corrected to `timestamps` (with an 's') 
});

const Listing = mongoose.model("Listing", listingSchema);  // Pass the schema to the model function
module.exports = Listing;  // Corrected to `module.exports`
