/* 
auth here is Authorisation
hashing password with bcrypt 
jsonwebtoken
To store secretkey. create folder config > default.json

*/

const express = require("express");
const router = express.Router();
const validate = require("../utils/validateAuth");
const _ = require("lodash")
router.use(express.json());
const bcrypt = require("bcrypt"); // password compare
const jwt = require('jsonwebtoken') // jwt
const { MyModel:userModel } = require("./model-user"); // database
const config = require('config')

/* create */
router.post("/", async (req, res) => {


  const error = validate(req.body);
  if (error) return res.status(404).send(error);

  // check email and password
  let result = await userModel.findOne({ email: req.body.email }); 
  if (!result) return res.status(400).send("Invalid input");

  let validPassword = await bcrypt.compare(req.body.password,result.password)
  if (!validPassword) return res.status(400).send("Invalid input");

  // jwt
  const token = result.generateAuthToken()
  res.send(token);

});

/* exports */
module.exports = router;
