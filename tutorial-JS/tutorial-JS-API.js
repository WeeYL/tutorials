const https = require("https");
const fetch = require("node-fetch");
const axios = require("axios");

const api = "https://jsonplaceholder.typicode.com/todos/1";

// https
https
  .get(api, (resp) => {
    let data = "";

    // Data received and pushed into a list.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // Parse to json format
    resp.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

// Fetch

// get response > parse json > log result
fetch("http://localhost:3001/api")
  .then((response) => {
    return response.json();
  })
  .then((result) => console.log(result));

// axios

axios.get("http://localhost:3001/api").then((response) => console.log(response.data));

function _______Header______(params) {
  params = params.toUpperCase();
  console.log(`--------------- ${params} `);
}

const options = {
  hostname: "https://jsonplaceholder.typicode.com/todos/1",
  method: "GET",
  port: 3000,
};

const req = https.request(options, (res) => {
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (e) => {
  console.error(e);
});
req.end();
