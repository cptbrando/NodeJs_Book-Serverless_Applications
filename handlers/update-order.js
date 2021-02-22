function updateOrder(id, order) {
  // if an orderId was not passed into the id parameter, throw an error
  if (!id) {
    throw new Error("An Order ID is required to update the Order!");
  }

  // if the order object is missing, or the object is missing both the id and the address, throw an error
  if (!order || (!order.id && !order.address)) {
    throw new Error(
      "In order to update the Order, a new pizza type(id) or address must be passed in!"
    );
  }

  return {};
}

module.exports = updateOrder;
