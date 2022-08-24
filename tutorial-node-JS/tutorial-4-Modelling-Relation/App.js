/* load express */
const express = require('express')
const app = express();

/* middleware */
app.use(express.json()) // body-parser

/* code.. */
app.get('/',(req,res)=>{
    res.send('hellos')
})

/* listen to port */
const port = 3000; 
app.listen(port, () => console.log(`listening to port http://localhost:3000/`));
