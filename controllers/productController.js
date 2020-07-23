let products = require("../products");
const slugify = require("slugify");
const { Product } = require("../db/models");

exports.productList = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productDelete = async (req, res) => {
  const { productId } = req.params;
  try {
    const existProduct = await Product.findByPk(productId);
    if (existProduct) {
      await existProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "product is not found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productUpdate = async (req, res) => {
  const { productId } = req.params;
  try {
    const existProduct = await Product.findByPk(productId);
    if (existProduct) {
      await existProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "product is not found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
