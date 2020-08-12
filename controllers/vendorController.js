// let products = require("../products");
const slugify = require("slugify");
const { Vendor, Product } = require("../db/models");

exports.fetchVendor = async (vendorId, next) => {
  try {
    const vendor = await Vendor.findByPk(vendorId);
    return vendor;
  } catch (error) {
    next(error);
  }
};

exports.vendorList = async (req, res, next) => {
  try {
    const vendor = await Vendor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });
    res.json(vendor);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.vendorCreate = async (req, res, next) => {
  try {
    const foundVendor = await Vendor.findOne({
      where: { userId: req.user.id },
    });
    if (foundVendor) {
      const err = new Error("You already have a Vendor");
      err.status = 400;
      next(err);
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.vendorDelete = async (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
    await req.vendor.destroy();
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.vendorUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
    }
    await req.vendor.update(req.body);
    res.status(204).end();
  } catch (error) {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  if (req.user.id === req.vendor.userId) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.vendorId = req.vendor.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};
