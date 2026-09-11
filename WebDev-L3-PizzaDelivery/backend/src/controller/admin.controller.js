const {
  loginAdminService,
  getAdminInventoryService,
  updateInventoryService,
  getAdminOrderService,
  updateOrderStatusService,
} = require("../services/admin.service");

async function loginAdmin(req, res) {
  try {
    const { identifier, password } = req.body;
    const admin = await loginAdminService({ identifier, password });

    res.cookie("token", admin.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "admin loggedIn successfully",
      admin,
    });
  } catch (err) {
    console.log("error in login admin ,", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getAdminInventory(req, res) {
  try {
    const inventory = await getAdminInventoryService();
    res.status(200).json({
      success: true,
      message: "all inventory fetched successfully",
      inventory,
    });
  } catch (err) {
    console.log("error in fetching inventory");
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateInventory(req, res) {
  try {
    const inventoryId = req.params.id;
    const updates = req.body;
    const result = await updateInventoryService({
      inventoryId,
      updates,
    });

    res.status(200).json({
      success: true,
      message: "inventory updated successfully",
      result,
    });
  } catch (err) {
    console.log("error in updating the fields ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function adminOrder(req, res) {
  try {
    const orders = await getAdminOrderService();

    res.status(200).json({
      success: true,
      message: "orders fetched successfully",
      orders,
    });
  } catch (err) {
    console.log("error while fetching orders : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const orderId = req.params.id;
    const status = req.body.status;
    const updateStatus = await updateOrderStatusService({ orderId, status });

    res.status(200).json({
      success: true,
      message: "order status update successfully",
      updateStatus,
    });
  } catch (err) {
    console.log("error in updating status : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = {
  loginAdmin,
  getAdminInventory,
  updateInventory,
  adminOrder,
  updateOrderStatus,
};
