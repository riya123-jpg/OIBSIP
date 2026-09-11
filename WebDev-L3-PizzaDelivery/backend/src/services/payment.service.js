const razorpay = require("../config/razorpay");
const orderModel = require("../models/orders.model");
const crypto = require("crypto");
const mongoose = require("mongoose");
const {
  calculateRequiredStock,
  decrementInventory,
} = require("./inventory.service");

async function createPaymentService({ userId, orderId }) {
  const order = await orderModel.findOne({
    _id: orderId,
    user: userId,
  });
  if (!order) {
    throw new Error("order not found");
  }

  if (order.paymentStatus === "paid") {
    throw new Error("Order is already paid");
  }

  const totalAmount = order.totalAmount;
  const amountInPaise = totalAmount * 100;

  const razorpayOrder = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: order._id.toString(),
  });

  order.payment.razorpayOrderId = razorpayOrder.id;
  await order.save();
  return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  };
}

const verifyPaymentService = async ({
  userId,
  orderId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  // 1. Transaction se pehle basic order lookup
  const order = await orderModel.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.paymentStatus === "paid") {
    throw new Error("Order is already paid");
  }

  if (order.payment.razorpayOrderId !== razorpay_order_id) {
    throw new Error("Invalid Razorpay order");
  }

  // 2. Verify Razorpay signature
  const rawSignature = razorpay_order_id + "|" + razorpay_payment_id;

  const signatureHash = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(rawSignature)
    .digest("hex");

  if (signatureHash !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }

  // 3. Start transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 4. Transaction ke andar order dobara fetch karo
    const orderInTransaction = await orderModel
      .findOne({
        _id: orderId,
        user: userId,
        paymentStatus: "pending",
      })
      .session(session);

    if (!orderInTransaction) {
      throw new Error("Order is no longer available for payment");
    }

    // 5. Calculate required stock
    const requiredStock = calculateRequiredStock(orderInTransaction.items);

    // 6. Decrement inventory using same session
    await decrementInventory(requiredStock, session);

    // 7. Mark payment as successful
    orderInTransaction.paymentStatus = "paid";
    orderInTransaction.payment.razorpayPaymentId = razorpay_payment_id;
    orderInTransaction.payment.razorpaySignature = razorpay_signature;

    await orderInTransaction.save({ session });

    // 8. Commit everything
    await session.commitTransaction();

    return orderInTransaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

module.exports = {
  createPaymentService,
  verifyPaymentService,
};
