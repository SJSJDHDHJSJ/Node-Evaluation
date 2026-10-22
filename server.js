const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const item = require("./Route/itemRoute");
app.use(express.json());

mongoose.connect(process.env.CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Error connecting to DB: ", error));

app.use("/items", item);

app.listen(3300, () => {
  console.log("Server is running on port 3300");
});
