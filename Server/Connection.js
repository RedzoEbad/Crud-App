const mongoose = require('mongoose');

async function connectDB() {
    try {
        // Always prefer env var (Docker provides it)
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/CrudApp';
        console.log("Trying to connect to:", mongoURI);
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("❌ Error connecting to the database:", err.message);
    }
}

module.exports = connectDB;
