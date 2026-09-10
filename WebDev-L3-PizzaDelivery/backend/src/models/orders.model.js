const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        pizzaConfig: {
          baseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "inventoryItem",
            required: true,
          },
          sauceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "inventoryItem",
            required: true,
          },
          cheeseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "inventoryItem",
            required: true,
          },
          vegetableIds: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "inventoryItem",
            },
          ],
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        subtotal: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    payment: {
      razorpayOrderId: {
        type: String,
        default: null,
      },

      razorpayPaymentId: {
        type: String,
        default: null,
      },

      razorpaySignature: {
        type: String,
        default: null,
      },
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["received", "in_kitchen", "sent_to_delivery"],
      default: "received",
    },
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
