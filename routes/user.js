const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/userController");
const { signin } = require("../controllers/userController");
const passport = require("passport");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

//passport to compare the username and password with the one i already have in db

module.exports = router;
