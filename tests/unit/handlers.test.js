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
  test("it should throw an exception if an order object is not passed in as an argument", () => {
    expect(() => createOrder()).toThrow();
  });

  test("it should throw an exception if the passed in order object does not have a pizza id property", () => {
    const order = {
      address: "test address",
    };

    expect(() => createOrder(order)).toThrow();
  });

  test("it should throw an exception if the passed in order object does not have an address property", () => {
    const order = {
      id: "test id",
    };

    expect(() => createOrder(order)).toThrow();
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
  test("it should throw an exception when an order id is not passed in as an argument", () => {
    const updateOrderBody = {
      id: 2,
      address: "test address",
    };

    expect(() => updateOrder(null, updateOrderBody)).toThrow();
  });

  test("it should throw an exception when an updated order body is not passed in as an argument", () => {
    expect(() => updateOrder(1, null)).toThrow();
  });

  test("it should throw an exception when the updated order body does not have both an id and an address", () => {
    const updateOrderBody = {};

    expect(() => updateOrder(1, updateOrderBody)).toThrow();
  });

  test("it should return an object when a valid id and updated order body are passed into the function as arguments", () => {
    const updateOrderBody = {
      id: 2,
      address: "test address",
    };

    expect(updateOrder(1, updateOrderBody)).toBeInstanceOf(Object);
  });
});

describe("Delete order handler", () => {
  test("it should throw an exception when an order id is not passed in", () => {
    expect(() => deleteOrder()).toThrow();
  });

  test("it should return the delted object when a proper order id is passed in", () => {
    expect(deleteOrder(1)).toBeInstanceOf(Object);
  });
});
