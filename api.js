"use strict";

const Api = require("claudia-api-builder");
const api = new Api();

const getPizzas = require("./handlers/get-pizzas");
const createOrder = require("./handlers/create-order");

api.get("/", () => {
  return "Welcome to the Pizza API created using Claudia with Node.js!";
});

api.get("/pizzas", () => {
  return getPizzas();
});

api.get(
  "/pizzas/{id}",
  (request) => {
    return getPizzas(request.pathParams.id);
  },
  {
    error: 404,
  }
);

api.post(
  "/orders",
  (request) => {
    return createOrder(request.body);
  },
  {
    success: 201,
    error: 400,
  }
);

module.exports = api;
