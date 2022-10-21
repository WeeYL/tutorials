const http = require('http');
const fs = require('fs');

// create server instance 
const server = http.createServer((req,res)=>{
    console.log(req.url, req.method, req.headers)

})

// server listen for event
server.listen(3000,()=>{
    console.log(`click to launch http://localhost:3000/`); 
})