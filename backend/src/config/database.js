import mongoose from "mongoose";
import config from "./config.js";

const connectToDb = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Database connected...");
  } catch (error) {
    console.log("Error in connecting database");
  }
};

export default connectToDb;