// db/connection.js

const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/project';

async function main() {
    try {
        await mongoose.connect(URL, {
            
        });
        console.log('Connected to the MongoDB database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

main();

module.exports = mongoose.connection;
