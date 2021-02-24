"use strict";

const Api = require("claudia-api-builder");
const api = new Api();

const getPizzas = require("./handlers/get-pizzas");
const getOrders = require("./handlers/get-orders");
const createOrder = require("./handlers/create-order");
const updateOrder = require("./handlers/update-order");
const deleteOrder = require("./handlers/delete-order");
const updateDeliveryStatus = require("./handlers/update-delivery-status");

// root api route
api.get("/", () => {
  return "Welcome to the Pizza API created using Claudia with Node.js!";
});

// Get all pizzas
api.get("/pizzas", () => {
  return getPizzas();
});

// get one pizza
api.get(
  "/pizzas/{id}",
  (request) => {
    return getPizzas(request.pathParams.id);
  },
  {
    error: 404,
  }
);

// Get all orders
api.get("/orders", () => {
  return getOrders();
});

// Get one order
api.get("/orders/{id}", (request) => {
  return getOrders(request.pathParams.id);
});

// Create order
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

// Update order
api.put(
  "/orders/{id}",
  (request) => {
    return updateOrder(request.pathParams.id, request.body);
  },
  {
    error: 400,
  }
);

// Delete order
api.delete(
  "/orders/{id}",
  (request) => {
    return deleteOrder(request.pathParams.id);
  },
  {
    error: 400,
  }
);

// Update delivery status webhook
api.post("/delivery", (request) => updateDeliveryStatus(request.body), {
  success: 200,
  error: 400,
});

module.exports = api;
