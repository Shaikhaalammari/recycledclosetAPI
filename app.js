const express = require("express");
const products = require("./products");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("kookie");
  res.json({ message: "kookie" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("the app is running on localhost:8000");
});
