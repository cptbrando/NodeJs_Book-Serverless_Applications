function deleteOrder(id) {
  if (!id) {
    throw new Error("An Order ID must be passed in!");
  }

  return {};
}

module.exports = deleteOrder;
