const { DataTypes, Model } = require("sequelize");
const db = require("../db");

const SequelizeSlugify = require("sequelize-slugify");

class Vendor extends Model {}

Vendor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      // allowNull: false,
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

SequelizeSlugify.slugifyModel(Vendor, {
  source: ["name"],
});

module.exports = Vendor;
