import express from 'express'
import {PORT} from './config.js'
const app = express()

// GET
app.get('/',(req,res)=>{ 
    res.send('hello world')
})

app.listen(PORT, () => console.log(`listening to ${PORT} http://localhost:${PORT}`));
