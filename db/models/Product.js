const { DataTypes, Model } = require("sequelize");
const db = require("../db");

const SequelizeSlugify = require("sequelize-slugify");

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
      allowNull: false,
      // validate: {
      //   isUrl: true,
      // },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },

  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Product, {
  source: ["name"],
});

module.exports = Product;
