import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URL from environment variable
const url = process.env.MONGODB_URI;

// Create a connection to the database
mongoose.connect(url);

const db = mongoose.connection;

// Error handling
db.on('error', console.error.bind(console, 'connection error:'));

// Open the connection
db.once('open', function() {
  console.log("Successfully connected to the database.");
});

export default db;
