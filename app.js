const express = require("express");

//route
const productRoute = require("./routes/products");
const db = require("./db/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/products", productRoute);

const run = async () => {
  try {
    await db.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  app.listen(8000, () => {
    console.log("the app is running on localhost:8000");
  });
};

run();
