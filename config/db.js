import mongoose from "mongoose"

import dotenv from "dotenv";
dotenv.config();

const mongodbUri = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri)
    console.log("MongoDB connection established.")
  } catch (error) {
    console.error("Database connection failed:", error.message)
    process.exit(1)
  }
}

export default connectDB
