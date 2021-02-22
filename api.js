"use strict";

const Api = require("claudia-api-builder");
const api = new Api();

const getPizzas = require("./handlers/get-pizzas");

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

module.exports = api;
