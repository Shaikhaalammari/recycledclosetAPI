const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = OrderItem;
