const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/auth.controller");
const identityUser = require("../middleware/auth.middleware");

const route = express.Router();
route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/get-me", identityUser, getCurrentUser);

route.delete("/logout", logoutUser);

module.exports = route;
