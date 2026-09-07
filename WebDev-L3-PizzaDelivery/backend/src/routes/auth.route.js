const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controller/auth.controller");

const route = express.Router();

//register
route.post("/register", registerUser);

//login
route.post("/login", loginUser);

//email verification route
route.get("/verify-email", verifyEmail);

//forget password
route.post("/forget-password", forgotPassword);

//reset password
route.post("/reset-password", resetPassword);

module.exports = route;
