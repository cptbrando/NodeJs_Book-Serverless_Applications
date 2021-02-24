const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function updateDeliveryStatus(request) {
  try {
    if (!request.deliveryId || !request.status) {
      throw new Error("Status and delivery ID are required");
    }

    // updates the status of the passed in pizza order
    const orderUpdate = await docClient
      .update({
        TableName: "pizza-orders",
        Key: {
          orderId: request.deliveryId,
        },
        AttributeUpdates: {
          orderStatus: {
            Action: "PUT",
            Value: request.status,
          },
        },
      })
      .promise();

    return orderUpdate;
  } catch (err) {
    throw err;
  }
}

module.exports = updateDeliveryStatus;
