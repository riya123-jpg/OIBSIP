const inventoryModel = require("../models/inventory.model");

async function calculateRequiredStock(items) {
  const requiredItem = new Map();

  for (const item of items) {
    const quantity = item.quantity;

    //base
    const currentBaseQuantity = requiredItem.get(item.baseId || 0);

    requiredItem.set(item.baseId, currentBaseQuantity + quantity);

    //sauce
    const currentSauceQuantity = requiredItem.get(item.sauceId || 0);

    requiredItem.set(item.sauceId, currentSauceQuantity + quantity);

    //cheese
    const currentCheeseQuantity = requiredItem.get(item.cheeseId || 0);

    requiredItem.set(item.cheeseId, currentCheeseQuantity + quantity);

    //vegetable
    for (const vegetableId of item.vegetableIds || []) {
      const currentVegetableQuantity = requiredStock.get(vegetableId) || 0;

      requiredStock.set(vegetableId, currentVegetableQuantity + quantity);
    }
  }
  return requiredItem;
}

async function decrementInventory(requiredItem, session) {
  for (const [ingredientId, requiredQuantity] of requiredStock) {
    const result = await inventoryModel.updateOne(
      {
        _id: ingredientId,
        stock: { $gte: requiredQuantity },
      },
      {
        $inc: {
          stock: -requiredQuantity,
        },
      },
      {
        session,
      },
    );

    if (result.modifiedCount !== 1) {
      throw new Error(
        `Insufficient stock or ingredient not found: ${ingredientId}`,
      );
    }
  }
}

//low stock

async function checkLowStockItems() {
  const lowStockItems = await inventoryModel.find({
    isActive: true,
    lowStockAlertSent: false,
    $expr: {
      $lt: ["$stock", "$lowStockThreshold"],
    },
  });

  return lowStockItems;
}

async function markLowStockAlertSent(items) {
  for (const item of items) {
    item.lowStockAlertSent = true;
    await item.save();
  }
}

module.exports = {
  calculateRequiredStock,
  decrementInventory,
  checkLowStockItems,
  markLowStockAlertSent,
};
