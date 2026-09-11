const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["base", "sauce", "cheese", "vegetable"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      required: true,
      min: 0,
      default: 20,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lowStockAlertSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const inventoryModel = mongoose.model("inventoryItem", inventorySchema);

module.exports = inventoryModel;
