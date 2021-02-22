function createOrder(order) {
  if (!order || !order.id || !order.address) {
    throw new Error(
      "To order a pizza, please provide the pizza type(id) and address where the pizza should be delivered!"
    );
  }

  return {};
}

module.exports = createOrder;
