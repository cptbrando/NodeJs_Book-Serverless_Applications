function updateOrder(id, order) {
  if (!id) {
    throw new Error("An Order ID is required to update the Order!");
  }

  if (!order || (!order.id && !order.address)) {
    throw new Error(
      "In order to update the Order, a new pizza type(id) or address must be passed in!"
    );
  }

  return {};
}

module.exports = updateOrder;
