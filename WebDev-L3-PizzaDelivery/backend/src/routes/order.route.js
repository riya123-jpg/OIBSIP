const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controller/order.controller");
const identifyUser = require("../middlewares/auth.middleware");

const route = express.Router();

route.post("/", identifyUser, createOrder);

route.get("/", identifyUser, getOrders);

route.get("/:id", identifyUser, getOrderById);

module.exports = route;
