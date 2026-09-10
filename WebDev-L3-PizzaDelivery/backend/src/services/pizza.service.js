const inventoryModel = require("../models/inventory.model");
const pizzaModel = require("../models/pizza.model");

async function getAvailablePizzas() {
  const pizzas = await pizzaModel.find({ isActive: true });
  return pizzas;
}

async function getAvailableIngredients() {
  const ingredients = await inventoryModel.find({ isActive: true });

  const groupedIngredients = await ingredients.reduce(
    (acc, ingredient) => {
      if (ingredient.category === "base") {
        acc.bases.push(ingredient);
      }
      if (ingredient.category === "sauce") {
        acc.sauces.push(ingredient);
      }
      if (ingredient.category === "cheese") {
        acc.cheeses.push(ingredient);
      }
      if (ingredient.category === "vegetable") {
        acc.vegetables.push(ingredient);
      }
      return acc;
    },
    {
      bases: [],
      sauces: [],
      cheeses: [],
      vegetables: [],
    },
  );
  return groupedIngredients;
}

module.exports = {
  getAvailablePizzas,
  getAvailableIngredients,
};
