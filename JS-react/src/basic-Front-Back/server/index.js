const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// to use CORS below, uncomment proxy in package.json

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', // client url
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// api end point
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});



// listening to port
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/api`);
});
