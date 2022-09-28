"use strict";
const AWS = require("aws-sdk");

const successfullResponse = {
  statusCode: 200,
  body: "everything is alright",
};

module.exports.connectionHandler = (event, context, callback) => {
  console.log(`context: ${JSON.stringify(context)}`)
  // Handle connection
  // NOTE: To simulate client server and to see event, connect in pie socket
  try {
    const connectionId = event.requestContext.connectionId
    console.log(`connectionId: ${connectionId}`)
    callback(null, successfullResponse) // for connection in pie socket / wscat
  } catch (error) {
    console.log(error)
  }

}

module.exports.sendMessageHandler = (event, context, callback) => {

  const connectionId = event.requestContext.connectionId
  console.log(`connectionId: ${connectionId}`)
  send(event, connectionId)

  callback(null, successfullResponse) 
}

const send = (event, connectionId) => {

  // get from pie socket action / data
  const body = JSON.parse(event.body);
  const postData = body.data;
  console.log(postData)

  // set aws api backend point and client connectionId 
  const endpoint = event.requestContext.domainName + "/" + event.requestContext.stage;
  console.log(`backend endpt: ${endpoint}`)
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    endpoint: endpoint,
  });
  const params = {
    ConnectionId: connectionId,
    Data: postData,
  };

  // post back to client
  return apigwManagementApi.postToConnection(params).promise();
};
