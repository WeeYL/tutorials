const express = require("express");
const app = express();

// PUG npm i pug. Templating for dynamic html
// folder > views > index.pug
app.set('view engine','pug')
app.set('views','./views')
app.get("/", (req, res) => {
    res.render("index",{title:"My view engine",message:"My messages..."});
  });

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}`));
