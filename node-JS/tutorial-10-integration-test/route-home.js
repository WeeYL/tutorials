const express = require('express')
const router = express.Router()

// router.get('',(req,res)=>{
//     res.send({title:"My App"})
// })

// redirect 
router.get('/',(req,res)=>{
    res.redirect('http://localhost:3000/genre/')
})

module.exports = router

