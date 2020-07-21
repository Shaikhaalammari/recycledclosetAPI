const express = require("express");
let products = require("./products");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("kookie");
  res.json({ message: "kookie" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, (lower = true));
  const newProduct = { ...req.body, id };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const existProduct = products.find((product) => product.id === +productId);

  if (existProduct) {
    products = products.filter((_product) => _product.id !== existProduct.id);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "product is not found " });
  }
});

app.put("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const existProduct = products.find((product) => product.id === +productId);

  if (existProduct) {
    for (const key in req.body) existProduct[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "product is not found" });
  }
});

app.listen(8000, () => {
  console.log("the app is running on localhost:8000");
});
