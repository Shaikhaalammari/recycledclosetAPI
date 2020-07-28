const Product = require("./Product");
const Vendor = require("./Vendor");

// a vendor(shop) has many products
Vendor.hasMany(Product, {
  as: "products",
  foreignKey: "vendorId",
  allowNull: false,
});

Product.belongsTo(Vendor, { as: "vendor" });

module.exports = {
  Vendor,
  Product,
};
