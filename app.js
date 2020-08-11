const express = require("express");
//Product
const { Product } = require("./db/models");
//route
const productRoute = require("./routes/products");
const vendorRoute = require("./routes/vendors");
const userRoutes = require("./routes/user");
//middleware
const passport = require("passport");
//passport startegy
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//database
const db = require("./db");
//cors
const cors = require("cors");
//praser
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/products", productRoute);
app.use("/vendors", vendorRoute);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).json("Path not found"); // when the path called is not exist
});

app.use((err, req, res, next) => {
  res.status(err.status || 500); // 500 y3ne backend error (notfound)
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    // const products = await Product.findAll();
    // products.forEach((x) => console.log(x.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  app.listen(8000, () => {
    console.log("the app is running on localhost:8000");
  });
};

run();
