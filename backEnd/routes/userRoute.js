const express = require("express");
const userAuth = require("../middleware/authMiddleware");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/verify/:userId/:otp", userController.OTPVerification);
router.post("/resend-link/:userId", userController.resentOTP); //change :id to userId

//user routes
router.post("/follower/:id", userAuth, userController.followWriter);
router.put("/update-user", userAuth, userController.updateWriter);

router.get("/get-user/:id?", userController.getUser);

module.exports = router;
