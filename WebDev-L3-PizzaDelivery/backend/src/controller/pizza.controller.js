const {
  getAvailablePizzas,
  getAvailableIngredients,
} = require("../services/pizza.service");

async function getPizzas(req, res) {
  try {
    const pizzas = await getAvailablePizzas();

    res.status(200).json({
      success: true,
      message: "all pizzas fetched successfully",
      pizzas,
    });
  } catch (err) {
    console.log("error in fetching pizza : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getIngredients(req, res) {
  try {
    const ingredients = await getAvailableIngredients();
    res.status(200).json({
      success: true,
      message: "fetched all the available ingredients",
      ingredients,
    });
  } catch (err) {
    console.log("error in getting ingrediendts :", err);
    res.status(500).json({
      success: false,
      message: "something went worng while customise pizza",
    });
  }
}

module.exports = {
  getPizzas,
  getIngredients,
};
