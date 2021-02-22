const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteOrder(id) {
  try {
    // If the orderId is missing, throw an error
    if (!id) {
      throw new Error("An Order ID must be passed in!");
    }

    const deletedOrder = await docClient
      .delete({
        TableName: "pizza-orders",
        Key: { orderId: id },
      })
      .promise();

    return deletedOrder;
  } catch (err) {
    throw err;
  }
}

module.exports = deleteOrder;
