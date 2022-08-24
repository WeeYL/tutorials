/* http event listener 

https://nodejs.org/api/http.html

*/
const http = require("http");

let server = http.createServer((req, res) => {
  // if localhost
  if (req.url === "/") {
    res.write(JSON.stringify([1, 2, 3])); // write to browser
    res.end();
  }
});

server.listen(3000);
console.log('http://localhost:3000/');


