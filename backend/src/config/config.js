import dotenv from "dotenv";
dotenv.config();

const Config = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  NODE_ENV: process.env.NODE_ENV,
};

export default Config;
