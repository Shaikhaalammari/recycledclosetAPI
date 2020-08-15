let products = require("../products");
const slugify = require("slugify");
const { Product, Vendor } = require("../db/models");

exports.fetchProduct = async (productId) => {
  try {
    const product = await Product.findByPk(productId, {
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["userId"],
      },
    });
    return product;
  } catch (error) {
    next(error);
  }
};
exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "vendorId"] },
      include: [
        {
          model: Vendor,
          as: "vendor",
          attributes: ["name"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.product.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};
