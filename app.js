const express = require("express");
//
const { Product } = require("./db/models");

//route
const productRoute = require("./routes/products");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    // const products = await Product.findAll();
    // products.forEach((x) => console.log(x.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  app.use(bodyParser.json());
  app.use(cors());

  app.use("/products", productRoute);

  app.listen(8000, () => {
    console.log("the app is running on localhost:8000");
  });
};

run();
