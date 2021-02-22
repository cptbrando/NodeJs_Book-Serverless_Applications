const pizzas = require("../data/pizzas.json");

function getPizzas(pizzaId) {
  // If a pizzaId wasn't passed in, return all pizzas
  if (!pizzaId) {
    return pizzas;
  }

  // find the pizza with the passed in id
  // if not found, return an error (404)
  const pizza = pizzas.find((pizza) => pizza.id == pizzaId);
  if (pizza) return pizza;
  throw new Error("The pizza you requested was not found!");
}

module.exports = getPizzas;
