let products = require("../products");
const slugify = require("slugify");
const { Product } = require("../db/models");

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.productDelete = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const existProduct = await Product.findByPk(productId);
    if (existProduct) {
      await existProduct.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Product Not Found"); // 7g eldelete and update method
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.productUpdate = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const existProduct = await Product.findByPk(productId);
    if (existProduct) {
      await existProduct.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Product Not Found"); // 7g eldelete and update method
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};
