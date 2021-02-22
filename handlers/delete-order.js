function deleteOrder(id) {
  // If the orderId is missing, throw an error
  if (!id) {
    throw new Error("An Order ID must be passed in!");
  }

  return {};
}

module.exports = deleteOrder;
