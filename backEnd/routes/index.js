const express = require("express");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const postRoute = require("./postRoute");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);

module.exports = router;
