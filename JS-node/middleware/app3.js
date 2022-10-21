const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Route folder is added
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


// middleware. Here we can implement the "use" function since the type of request is defined in the ./routes
app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin',adminRoutes); // added additional layer for admin eg, http://localhost:3000/admin/add-product
app.use(shopRoutes);

// server listen for event
app.listen(3000,()=>{
    console.log(`click to launch http://localhost:3000/`); 
})