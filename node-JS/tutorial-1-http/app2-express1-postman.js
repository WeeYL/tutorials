// NOTE: only works in POSTMAN localhost:3000

/* 
joi
- set validation schema
- validate object with the validation schema

*/


/* data */
const data = [];
let n;
for (n = 1; n < 4; n++) {
  data.push({ id: `${n}`, name: `course${n}` });
}

const express = require("express");
const Joi = require("joi");
const app = express();

app.get("/courses/", (req, res) => {
  if (req.url === "/courses/") {
    res.write(JSON.stringify(data));
    res.end();
  }
});


/* create */ 
// option1 body-parser
app.use(express.json())

// option2 body-parser
// const bp = require("body-parser"); // http://expressjs.com/en/resources/middleware/body-parser.html
// app.use(bp.json);
// app.use(bp.urlencoded({extended:true}));

app.post("/courses/", (req, res) => {
  //input
  let course = {
    id: data.length + 1,
    name: req.body.name,
  };

  // validate
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);

  // error handling
  if (result.error) {
    const errMsg = result.error.details[0]["message"];
    return res.status(400).send(errMsg);
  }

  // commit
  data.push(course);
  res.send(data);
});

/* delete */

app.delete("/courses/:id", (req, res) => {
  // alternatively is use app.get("/courses/del/:id") to work on

  const course = data.find((d) => d.id === req.params.id);
  if (!course) return res.status(404).send("course not found");

  const index = data.indexOf(course);

  data.splice(index, 1);
  res.send(data); // return in web view
});

/* Output to browser */
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`listening to port localhost:${port}`));
