"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const axios = require("axios");

async function createOrder(request) {
  try {
    // If the whole request parameter is missing, or if it is missing a pizza id or address, throw an error
    if (!request || !request.id || !request.address) {
      throw new Error(
        "To order a pizza, please provide the pizza type(id) and address where the pizza should be delivered!"
      );
    }
    // Post to fake Some Like it Hot API which sets up fake delivery requests
    const deliveryResponse = await axios.post(
      "https://some-like-it-hot.effortless-serverless.com/delivery",
      {
        pickupTime: "15.34pm",
        pickupAddress: "Aunt Maria Pizzeria",
        deliveryAddress: request.address,
        webhookUrl:
          "https://yerd2fs5vk.execute-api.us-east-1.amazonaws.com/latest/delivery",
      },
      {
        headers: {
          Authorization: "aunt-marias-pizzeria-1234567890",
          "Content-type": "application/json",
        },
      }
    );
    const orderId = deliveryResponse.data.deliveryId;

    // Attempt to create a new pizza order and save it to DynamoDB
    const order = await docClient
      .put({
        TableName: "pizza-orders",
        Item: {
          orderId: orderId,
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
