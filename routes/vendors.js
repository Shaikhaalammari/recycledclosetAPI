const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  vendorCreate,
  vendorList,
  vendorDelete,
  vendorUpdate,
  fetchVendor,
  productCreate,
} = require("../controllers/vendorController");

const passport = require("passport");

router.get("/", vendorList);
router.use((req, res, next) => {
  console.log("I'm another middleware method");
  next();
});

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);
  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const err = new Error("vendor Not Found");
    err.status = 404;
    next(err);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // passport the function not the file
  upload.single("image"),
  vendorCreate
);

router.delete(
  "/:vendorId",
  passport.authenticate("jwt", { session: false }),
  vendorDelete
);

router.put(
  "/:vendorId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorUpdate
);

router.post(
  "/:vendorId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

module.exports = router;
