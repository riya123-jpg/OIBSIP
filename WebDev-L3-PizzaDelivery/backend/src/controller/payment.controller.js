const {
  createPaymentService,
  verifyPaymentService,
} = require("../services/payment.service");

async function createPayment(req, res) {
  try {
    const { orderId } = req.body;
    const userId = req.user.userId;

    const result = await createPaymentService({
      userId,
      orderId,
    });

    res.status(200).json({
      success: true,
      message: "razorpay order created successfully",
      payment: result,
    });
  } catch (Err) {
    console.log("error in creating payment");
    res.status(500).json({
      success: false,
      message: Err.message,
    });
  }
}

async function verifyPayment(req, res) {
  try {
    const userId = req.user.userId;
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const order = await verifyPaymentService({
      userId,
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    res.status(200).json({
      success: true,
      message: "payment verified successfully",
      order,
    });
  } catch (err) {
    console.log("razorpay payment failed");
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  createPayment,
  verifyPayment,
};
