const express = require("express");
const router = express.Router();
const {
  productCreate,
  productList,
  productDelete,
  productUpdate,
} = require("../controllers/productController");

router.get("/", productList);
router.use((req, res, next) => {
  console.log("I'm another middleware method");
  next();
});

router.post("/", productCreate);

router.delete("/:productId", productDelete);

router.put("/:productId", productUpdate);

module.exports = router;
