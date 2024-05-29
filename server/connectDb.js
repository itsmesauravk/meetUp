const mongoose = require("mongoose");

async function connectDb() {
    if (!process.env.CONNECT_URI) {
        console.error("Please provide a connection string");
        process.exit(1);
    }
    
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        await mongoose.connect(process.env.CONNECT_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error occurred while connecting to the database:", error);
        process.exit(1);
    }
}

module.exports = connectDb;
