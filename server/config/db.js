const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("[DB] Attempting to connect to MongoDB...");
    console.log("[DB] MONGO_URI:", process.env.MONGO_URI ? "set" : "NOT SET");
    
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("MongoDB connection timeout after 30s")), 30000)
    );
    
    await Promise.race([
      mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      }),
      timeoutPromise,
    ]);
    
    console.log("[DB] MongoDB Connected");
  } catch (err) {
    console.error("[DB] Connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;