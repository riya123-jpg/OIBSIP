const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const inventoryModel = require("../models/inventory.model");
const orderModel = require("../models/orders.model");

async function loginAdminService({ identifier, password }) {
  if (!identifier || !password) {
    throw new Error("username or email and password are required");
  }
  const normalizedIdentifier = identifier.trim().toLowerCase();

  const admin = await userModel.findOne({
    $or: [{ email: normalizedIdentifier }, { username: normalizedIdentifier }],
    role: "admin",
  });

  if (!admin) {
    throw new Error("Invalid username/email or password");
  }

  const comparePassword = await bcrypt.compare(password, admin.passwordHash);

  if (!comparePassword) {
    throw new Error("Invalid username/email or password");
  }

  if (!admin.isEmailVerified) {
    throw new Error("Please verify your email before login");
  }

  const token = jwt.sign(
    {
      userId: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return {
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  };
}

async function getAdminInventoryService() {
  const inventory = await inventoryModel
    .find({})
    .sort({ category: 1, name: 1 });

  return inventory;
}

async function updateInventoryService({ inventoryId, updates }) {
  const inventoryItem = await inventoryModel.findById(inventoryId);

  if (!inventoryItem) {
    throw new Error("inventory item not found");
  }

  const allowedFields = ["stock", "lowStockThreshold", "isActive"];

  const updateFields = Object.keys(updates);

  const invalidFields = updateFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    throw new Error(`Invalid update fields: ${invalidFields.join(", ")}`);
  }

  if ("stock" in updates) {
    if (typeof updates.stock !== "number" || updates.stock < 0) {
      throw new Error("Stock must be a non-negative number");
    }
  }

  if ("lowStockThreshold" in updates) {
    if (
      typeof updates.lowStockThreshold !== "number" ||
      updates.lowStockThreshold < 0
    ) {
      throw new Error("Low stock threshold must be a non-negative number");
    }
  }
  if ("isActive" in updates) {
    if (typeof updates.isActive !== "boolean") {
      throw new Error("isActive must be a boolean");
    }
  }

  for (const field of updateFields) {
    inventoryItem[field] = updates[field];
  }

  if (inventoryItem.stock >= inventoryItem.lowStockThreshold) {
    inventoryItem.lowStockAlertSent = false;
  }

  await inventoryItem.save();

  return inventoryItem;
}

async function getAdminOrderService() {
  const orders = await orderModel
    .find({})
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  return orders;
}

const updateOrderStatusService = async ({ orderId, status }) => {
  const order = await orderModel.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const validStatus = ["received", "in_kitchen", "sent_to_delivery"];

  if (!validStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  order.orderStatus = status;

  await order.save();

  return order;
};
module.exports = {
  loginAdminService,
  getAdminInventoryService,
  updateInventoryService,
  getAdminOrderService,
  updateOrderStatusService,
};
