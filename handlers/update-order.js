const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function updateOrder(id, order) {
  try {
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

    const attributeUpdateObj = {};
    // If a pizza id was passed in, add the attribute update for it to the DynamoDB AttributeUpdates object
    if (order.id) {
      attributeUpdateObj.pizza = {
        Action: "PUT",
        Value: order.id,
      };
    }
    // If an address was passed in, add the attribute update for it to the DynamoDB AttributeUpdates object
    if (order.address) {
      attributeUpdateObj.address = {
        Action: "PUT",
        Value: order.address,
      };
    }

    const updatedOrder = docClient
      .update({
        TableName: "pizza-orders",
        Key: { orderId: id },
        AttributeUpdates: attributeUpdateObj,
        ReturnValues: "ALL_NEW",
      })
      .promise();

    // Return all of the attributes of the updated order
    return updatedOrder.attributes;
  } catch (err) {
    throw err;
  }
}

module.exports = updateOrder;
