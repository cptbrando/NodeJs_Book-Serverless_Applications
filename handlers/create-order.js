const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function createOrder(request) {
  try {
    // If the whole request parameter is missing, or if it is missing a pizza id or address, throw an error
    if (!request || !request.id || !request.address) {
      throw new Error(
        "To order a pizza, please provide the pizza type(id) and address where the pizza should be delivered!"
      );
    }

    // Attempt to create a new pizza order and save it to DynamoDB
    const order = await docClient
      .put({
        TableName: "pizza-orders",
        Item: {
          orderId: uuidv4(),
          pizza: request.id,
          address: request.address,
          orderStatus: "pending",
        },
      })
      .promise();

    // The order creation was successful
    // console.log("Order is saved!", order);
    return order;
  } catch (err) {
    // The order creation failed
    // console.log("Opps, order is not save :(", err);
    throw err;
  }
}

module.exports = createOrder;
