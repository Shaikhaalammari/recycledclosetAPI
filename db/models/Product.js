const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: {
        min: 10,
      },
    },
    image: {
      type: DataTypes.STRING,
      //   allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },

  {
    sequelize: db,
  }
);

module.exports = Product;
