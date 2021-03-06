const express = require("express");
//Product
const { Product } = require("./db/models");
//route
const productRoute = require("./routes/products");
const vendorRoute = require("./routes/vendors");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
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
app.use(orderRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  console.log(404);
  res.status(404).json("Path not found"); // when the path called is not exist
});

app.use((err, req, res, next) => {
  console.log(500);
  res.status(err.status || 500); // 500 y3ne backend error (notfound)
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
    // const products = await Product.findAll();
    // products.forEach((x) => console.log(x.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () =>
    console.log(`The application is running on localhost:${PORT}`)
  );
};

run();
