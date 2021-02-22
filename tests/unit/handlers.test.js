const getPizzas = require("../../handlers/get-pizzas");
const createOrder = require("../../handlers/create-order");

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
