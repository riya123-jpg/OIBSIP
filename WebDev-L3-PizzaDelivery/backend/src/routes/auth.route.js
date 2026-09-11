const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
  logoutUser,
} = require("../controller/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const route = express.Router();

//register
route.post("/register", registerUser);

//login
route.post("/login", loginUser);

//get-me
route.get("/getme", identifyUser, getMe);

//email verification route
route.get("/verify-email", verifyEmail);

// resend verification link
route.post("/resend-verification", resendVerification);

//forget password
route.post("/forget-password", forgotPassword);

//reset password
route.post("/reset-password", resetPassword);

// logout user
route.post("/logout", logoutUser);

module.exports = route;
