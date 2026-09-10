const {
  createOrderService,
  getUserOrdersService,
  getOrderByIdService,
} = require("../services/order.service");

async function createOrder(req, res) {
  try {
    const order = await createOrderService({
      userId: req.user.userId,
      items: req.body.items,
    });
    res.status(201).json({
      success: true,
      message: "you order created successfully",
      order,
    });
  } catch (err) {
    console.log("something went wrong creating order : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getOrders(req, res) {
  try {
    const userId = req.user.userId;
    const orders = await getUserOrdersService(userId);
    res.status(200).json({
      success: true,
      message: "all the order fetched successfully",
      orders,
    });
  } catch (err) {
    console.log("something went wrong while getting user orders");
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getOrderById(req, res) {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;

    const order = await getOrderByIdService(orderId, userId);

    res.status(200).json({
      success: true,
      message: "order fetched successfully",
      order,
    });
  } catch (err) {
    console.log("something went wrong getting order by orderId");
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
