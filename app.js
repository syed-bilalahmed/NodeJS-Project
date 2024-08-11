// Import Express
const { log } = require('console');
const express = require('express');
const app = express();
require('./db/connection');
const Listing = require('./models/listing_model');
const port =  9000;




app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test', async (req,res)=>{
    let listingSample = new Listing({
        title : "My new Villa",
        desc :"By the beach",
        price:"12000",
        location:"Samana Hangu ,Kohat",
        country: "pakistan",


    });
    await listingSample.save();
    console.log("Data was saved");
    res.send("Testing was Succful");
    
})







app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
