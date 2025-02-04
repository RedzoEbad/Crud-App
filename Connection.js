const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/CrudApp');
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Error occurred in connecting to the database:", err);
    }
}

module.exports = connectDB;
