const mongoose = require('mongoose');

async function connectDB() {
  try {
    // ✅ Always use an environment variable for production
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Ebadkhan2002:ebad123@cluster1.jt8rzjs.mongodb.net/CrudApp';
    console.log("🌐 Trying to connect to:", mongoURI);
    await mongoose.connect(mongoURI);
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  }
}

module.exports = connectDB;
