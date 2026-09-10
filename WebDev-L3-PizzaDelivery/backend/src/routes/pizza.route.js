const express = require("express");
const { getPizzas, getIngredients } = require("../controller/pizza.controller");

const route = express.Router();

route.get("/pizzas", getPizzas);

route.get("/ingredients", getIngredients);

module.exports = route;
