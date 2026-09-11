const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  createPayment,
  verifyPayment,
} = require("../controller/payment.controller");
const route = express.Router();

route.post("/create", identifyUser, createPayment);

route.post("/verify", identifyUser, verifyPayment);

module.exports = route;
