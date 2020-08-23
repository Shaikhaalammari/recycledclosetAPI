const Product = require("./Product");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const products = require("../../products");

// a vendor(shop) has many products
Vendor.hasMany(Product, {
  as: "products",
  foreignKey: "vendorId",
  allowNull: false,
});

Product.belongsTo(Vendor, { as: "vendor" });

//each user has one vendor
User.hasOne(Vendor, { as: "vendor", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

//oneUser has many orders
User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

//order belongs to many items through orderItem
Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId" });

module.exports = {
  Vendor,
  Product,
  User,
  Order,
};
