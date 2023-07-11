const print = require('./printHeader')
///////////////////////////////////////////////////

const http = require('http')

const server = http.createServer((req,res)=>{
    if (req.url === '/') {
        res.write("hello")
        res.end()
    }
    if (req.url === '/list') {
        res.write(JSON.stringify([1,2,3]))
        res.end()
    }
    
})

server.on('connection', ()=>{
    console.log("New connection...")
})

server.listen(3000)
console.log("http://localhost:3000/")
// NOTE: GO TO BROWSER http://localhost:3000/