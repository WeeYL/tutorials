const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const rootDir = require('./util/path'); // C:\Users\User\Desktop\tutorials\JS-node\middleware

// Route folder is added
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// middleware. Here we can implement the "use" function since the type of request is defined in the ./routes
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public'))); // load static files, css, img

// middleware route
app.use('/admin',adminRoutes); 
app.use(shopRoutes);

// error handling
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

// server listen for event
app.listen(3000,()=>{
    console.log(`click to launch http://localhost:3000/`); 
    console.log("http://localhost:3000/admin/add-product/")
})