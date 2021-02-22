const getPizzas = require("../../handlers/get-pizzas");
const createOrder = require("../../handlers/create-order");
const updateOrder = require("../../handlers/update-order");
const deleteOrder = require("../../handlers/delete-order");

describe("Get Pizza(s) handler", () => {
  test("it should get an array of pizzas", () => {
    const pizzas = getPizzas();
    const pizza = pizzas[0];

    expect(pizzas).toBeInstanceOf(Array);
    expect(pizza).toBeInstanceOf(Object);
    expect(pizza).toHaveProperty("id");
    expect(pizza).toHaveProperty("name");
    expect(pizza).toHaveProperty("ingredients");
  });

  test("it should get one pizza", () => {
    const pizza = getPizzas(1);

    expect(pizza).toBeInstanceOf(Object);
    expect(pizza).toHaveProperty("id");
    expect(pizza).toHaveProperty("name");
    expect(pizza).toHaveProperty("ingredients");
  });

  test("it should throw an exception when pizza id is not found", () => {
    expect(() => getPizzas(-1)).toThrow();
  });
});

describe("Create order handler", () => {
  test("it should throw an exception if an order object is not passed in as an argument", async () => {
    await expect(createOrder()).rejects.toThrow();
  });

  test("it should throw an exception if the passed in order object does not have a pizza id property", async () => {
    const order = {
      address: "test address",
    };

    await expect(createOrder(order)).rejects.toThrow();
  });

  test("it should throw an exception if the passed in order object does not have an address property", async () => {
    const order = {
      id: "test id",
    };

    await expect(createOrder(order)).rejects.toThrow();
  });

  test("it should return an object if the passed in order argument has valid properties", () => {
    const order = {
      id: "test id",
      address: "test address",
    };

    expect(() => createOrder(order)).toBeInstanceOf(Object);
  });
});

describe("Update order handler", () => {
  test("it should throw an exception when an order id is not passed in as an argument", async () => {
    const updateOrderBody = {
      id: 2,
      address: "test address",
    };

    await expect(updateOrder(null, updateOrderBody)).rejects.toThrow();
  });

  test("it should throw an exception when an updated order body is not passed in as an argument", async () => {
    await expect(updateOrder(1, null)).rejects.toThrow();
  });

  test("it should throw an exception when the updated order body does not have both an id and an address", async () => {
    const updateOrderBody = {};

    await expect(updateOrder(1, updateOrderBody)).rejects.toThrow();
  });

  // TODO: Add test for successful case for updating an order
});

describe("Delete order handler", () => {
  test("it should throw an exception when an order id is not passed in", async () => {
    await expect(deleteOrder()).rejects.toThrow();
  });

  // TODO: Add test for successful case for deleting an order
});
