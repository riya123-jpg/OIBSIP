const express = require("express");
const { registerUser } = require("../controller/auth.controller");

const route = express.Router();

//register
route.post("/register", registerUser);

module.exports = route;
