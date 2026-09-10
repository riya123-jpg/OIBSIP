const inventoryModel = require("../models/inventory.model");
const orderModel = require("../models/orders.model");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");

async function validateOrderInput({ userId, items }) {
  if (!userId) {
    throw new Error("user is required");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("order items is required");
  }

  for (const item of items) {
    const { baseId, sauceId, cheeseId, vegetableIds, quantity } = item;

    if (!baseId || !sauceId || !cheeseId) {
      throw new Error("Base, sauce and cheese are required");
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    if (vegetableIds !== undefined && !Array.isArray(vegetableIds)) {
      throw new Error("vegetableIds must be an array");
    }
  }
}

async function getOrderIngredients(items) {
  const ingrediendtIds = new Set();

  for (const item of items) {
    ingrediendtIds.add(item.baseId);
    ingrediendtIds.add(item.sauceId);
    ingrediendtIds.add(item.cheeseId);

    for (const vegetableId of item.vegetableIds) {
      ingrediendtIds.add(vegetableId);
    }
  }

  const allIngredientIds = [...ingrediendtIds];
  for (const id of allIngredientIds) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ingredient ID");
    }
  }

  const ingredients = await inventoryModel.find({
    _id: { $in: allIngredientIds },
    isActive: true,
  });
  if (ingredients.length !== allIngredientIds.length) {
    throw new Error("One or more ingredients are invalid or inactive");
  }
  const ingredientMap = new Map(
    ingredients.map((ingredient) => [ingredient._id.toString(), ingredient]),
  );

  return ingredientMap;
}

const validateIngredientCategories = (items, ingredientMap) => {
  for (const item of items) {
    const base = ingredientMap.get(item.baseId);
    const sauce = ingredientMap.get(item.sauceId);
    const cheese = ingredientMap.get(item.cheeseId);

    if (base.category !== "base") {
      throw new Error("Invalid base selected");
    }

    if (sauce.category !== "sauce") {
      throw new Error("Invalid sauce selected");
    }

    if (cheese.category !== "cheese") {
      throw new Error("Invalid cheese selected");
    }

    for (const vegetableId of item.vegetableIds || []) {
      const vegetable = ingredientMap.get(vegetableId);

      if (vegetable.category !== "vegetable") {
        throw new Error("Invalid vegetable selected");
      }
    }
  }
};

const calculateOrderPricing = (items, ingredientMap) => {
  let totalAmount = 0;

  const orderItems = items.map((item) => {
    const base = ingredientMap.get(item.baseId);
    const sauce = ingredientMap.get(item.sauceId);
    const cheese = ingredientMap.get(item.cheeseId);

    let unitPrice = base.price + sauce.price + cheese.price;

    for (const vegetableId of item.vegetableIds || []) {
      const vegetable = ingredientMap.get(vegetableId);

      unitPrice += vegetable.price;
    }

    const subtotal = unitPrice * item.quantity;

    totalAmount += subtotal;

    return {
      pizzaConfig: {
        baseId: item.baseId,
        sauceId: item.sauceId,
        cheeseId: item.cheeseId,
        vegetableIds: item.vegetableIds || [],
      },
      quantity: item.quantity,
      unitPrice,
      subtotal,
    };
  });

  return {
    orderItems,
    totalAmount,
  };
};

const addRequiredStock = (requiredStock, ingredientId, quantity) => {
  const currentQuantity = requiredStock.get(ingredientId) || 0;

  requiredStock.set(ingredientId, currentQuantity + quantity);
};

const validateIngredientStock = (items, ingredientMap) => {
  const requiredStock = new Map();

  for (const item of items) {
    const quantity = item.quantity;

    addRequiredStock(requiredStock, item.baseId, quantity);
    addRequiredStock(requiredStock, item.sauceId, quantity);
    addRequiredStock(requiredStock, item.cheeseId, quantity);

    for (const vegetableId of item.vegetableIds || []) {
      addRequiredStock(requiredStock, vegetableId, quantity);
    }
  }

  for (const [ingredientId, requiredQuantity] of requiredStock) {
    const ingredient = ingredientMap.get(ingredientId);

    if (ingredient.stock < requiredQuantity) {
      throw new Error(`Insufficient stock for ${ingredient.name}`);
    }
  }
};

async function createOrderService({ userId, items }) {
  // part1
  //   input validation
  validateOrderInput({ userId, items });

  //   part2
  //   ingredients fetch
  const ingredientMap = await getOrderIngredients(items);

  //   part3
  // category validation
  validateIngredientCategories(items, ingredientMap);

  //part4
  //   price calculation
  const pricing = calculateOrderPricing(items, ingredientMap);

  //   part5
  //  stock validation
  validateIngredientStock(items, ingredientMap);

  //   part6
  //   order create
  const order = await orderModel.create({
    user: userId,
    items: pricing.orderItems,
    totalAmount: pricing.totalAmount,
    paymentStatus: "pending",
    orderStatus: "received",
  });

  return order;
}

async function getUserOrdersService(userId) {
  const orders = await orderModel.find({ user: userId }).sort({
    createdAt: -1,
  });
  return orders;
}

async function getOrderByIdService(orderId, userId) {
  const order = await orderModel.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("order not found");
  }
  return order;
}

module.exports = {
  createOrderService,
  getUserOrdersService,
  getOrderByIdService,
};
