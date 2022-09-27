"use strict";

const successfullResponse = {
  statusCode: 200,
  body: "everything is alright",
};

module.exports.connectionHandler = (event, context, callback) => {
  console.log(`event: ${ JSON.stringify(event)}`)
  console.log(`context: ${JSON.stringify(context)}`)
  // Handle connection
  callback(null, successfullResponse) // for connection in pie socket / wscat
}