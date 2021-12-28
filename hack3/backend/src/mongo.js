import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.connect(process.env.MONGO_URL, dboptions)
    .then(() => {
      console.log("MongoDB connected!")
    })
    .catch((e) => { throw new Error("MongoDB connection error" + e) })
  dataInit()
}

export default { connect };