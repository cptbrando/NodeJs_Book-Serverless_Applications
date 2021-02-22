const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getOrders(orderId) {
  try {
    // If no oderId was passed in, retrieve all orders
    if (typeof orderId === "undefined") {
      const orders = await docClient
        .scan({
          TableName: "pizza-orders",
        })
        .promise();

      return orders.Items;
    }

    // If an orderId was passed in, retrieve the order with the matching orderId
    const order = await docClient
      .get({
        TableName: "pizza-orders",
        Key: {
          orderId: orderId,
        },
      })
      .promise();

    return order.Item;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = getOrders;
