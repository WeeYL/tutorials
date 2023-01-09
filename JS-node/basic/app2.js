const http = require('http');
const fs = require('fs');

// create server instance 
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    
    // main page and action set to /message
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end(); // exit 
      }
    
    // message route
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('./basic/message.txt', 'send from message route');
        // go to inspector > network > <name> > Headers
        res.statusCode = 302 // redirect
        res.setHeader('location', '/'); // set header at "/"
        res.setHeader('Alfa', 'Beta'); // set 
        return res.end(); // exit 
      }
      
    // default route 
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();


})

// server listen for event
server.listen(3000,()=>{
    console.log(`click to launch http://localhost:3000/`); 
})