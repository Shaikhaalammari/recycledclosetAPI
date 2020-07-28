const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  productList,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productController");
const products = require("../products");

router.get("/", productList);
router.use((req, res, next) => {
  console.log("I'm another middleware method");
  next();
});

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

router.delete("/:productId", productDelete);

router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
