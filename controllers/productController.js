let products = require("../products");
const slugify = require("slugify");

exports.productList = (req, res) => {
  res.json(products);
};

exports.productCreate = (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, (lower = true));
  const newProduct = { ...req.body, id };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.productDelete = (req, res) => {
  const { productId } = req.params;
  const existProduct = products.find((product) => product.id === +productId);

  if (existProduct) {
    products = products.filter((_product) => _product.id !== existProduct.id);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "product is not found " });
  }
};

exports.productUpdate = (req, res) => {
  const { productId } = req.params;
  const existProduct = products.find((product) => product.id === +productId);

  if (existProduct) {
    for (const key in req.body) existProduct[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "product is not found" });
  }
};
