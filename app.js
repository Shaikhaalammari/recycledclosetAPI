const express = require("express");

//route
const productRoute = require("./routes/products");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/products", productRoute);

app.listen(8000, () => {
  console.log("the app is running on localhost:8000");
});
