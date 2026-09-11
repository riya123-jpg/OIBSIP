const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  loginAdmin,
  getAdminInventory,
  updateInventory,
  adminOrder,
  updateOrderStatus,
} = require("../controller/admin.controller");
const requireAdmin = require("../middlewares/admin.middleware");

const route = express.Router();

route.post("/login", loginAdmin);

route.get("/inventory", identifyUser, requireAdmin, getAdminInventory);

route.patch("/inventory/:id", identifyUser, requireAdmin, updateInventory);

route.get("/orders", identifyUser, requireAdmin, adminOrder);

route.patch(
  "/orders/:id/status",
  identifyUser,
  requireAdmin,
  updateOrderStatus,
);

module.exports = route;
