const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  try {
    const db = mongoose.connection.useDb("mernDb");
    const collection = db.collection("first");
    const data = await collection.find().toArray();
    console.log("fetched");
    res.status(200).json({ message: "Fetch successfull", data });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));