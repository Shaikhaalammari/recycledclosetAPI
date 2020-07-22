const express = require("express");
const router = express.Router();
const {
  productCreate,
  productList,
  productDelete,
  productUpdate,
} = require("../controllers/productController");

router.get("/", productList);

router.post("/", productCreate);

router.delete("/:productId", productDelete);

router.put("/:productId", productUpdate);

module.exports = router;
