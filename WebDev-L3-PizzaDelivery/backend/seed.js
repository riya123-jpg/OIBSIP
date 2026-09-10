require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./src/config/db");

const Pizza = require("./src/models/pizza.model");
const InventoryItem = require("./src/models/inventory.model");

const pizzaItems = require("./src/data/pizza.seed");
const inventoryItems = require("./src/data/inventory.seed");

async function seedData() {
  try {
    await connectDB();

    // Pizza seed
    await Pizza.bulkWrite(
      pizzaItems.map((pizza) => ({
        updateOne: {
          filter: { name: pizza.name },
          update: { $set: pizza },
          upsert: true,
        },
      })),
    );

    // Inventory seed
    await InventoryItem.bulkWrite(
      inventoryItems.map((item) => ({
        updateOne: {
          filter: {
            name: item.name,
            category: item.category,
          },
          update: { $set: item },
          upsert: true,
        },
      })),
    );

    console.log("Pizza and inventory seeded successfully");
  } catch (err) {
    console.log("Error in seed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

seedData();
