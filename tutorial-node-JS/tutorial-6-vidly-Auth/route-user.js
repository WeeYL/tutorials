/* 
hashing password with bcrypt 
send token to http header 
role based authorisation
*/


const express = require("express");
const router = express.Router();
const validate = require("../utils/validateUser");
const _ = require("lodash")
router.use(express.json());
const bcrypt = require("bcrypt"); // hashing
const auth = require('./middleware/auth') // authorise
const admin = require('./middleware/admin') // admin
const MyModelName = "User"; //
const { MyModel } = require("./model-user"); // database

/* First, authorised user:  
- create new user > post /user/ , 
    "name":"YLwee",
    "email":"123456@123.com",
    "password": "123",
    "isAdmin":true
- get x-auth-token > get user/id
- get/user/me > in postman header add key value x-auth-token : eyJhbGciOi ....
*/
router.get('/me', [auth, admin], async(req,res)=>{
  // req.user is taken from auth eg, _id: '60759ccc9d888a240889cdd2'
  const result = await MyModel.findById(req.user._id).select('-password') // exlude password
  res.send(result);
})

/* read */
router.get("/",  async (req, res) => {
  const result = await MyModel.find();
  res.send(result);
});

/* create */
router.post("/", async (req, res) => {

  const error = validate(req.body);
  if (error) return res.status(404).send(error);

  // check if user exist
  let result = await MyModel.findOne({ email: req.body.email }); 
  if (result) return res.status(404).send("user taken");

  // add result with lodash
  // result = new MyModel(_.pick(req.body,['email','password','name','isAdmin'])); // option > result = new MyModel(req.body);
  result = new MyModel(req.body);

  // hashing password
  const salt = await bcrypt.genSalt(10);
  result.password = await bcrypt.hash(result.password, salt);

   
  // send webtoken to header
 
  const token = result.generateAuthToken() // using custom method generateAuthToken > see model-user
  res.header('x-auth-token',token).send(result); // key-value pair
  console.log("token: ",token );

  result = await result.save();
});


/* update */
router.put("/:id", async (req, res) => {
  // error handling
  const error = validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  const result = await MyModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  );
  if (!result) return res.status(404).send(MyModelName, " not found");

  // display
  res.send(result);
});

/* delete */

router.delete("/:id", async (req, res) => {
  const result = await MyModel.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send(MyModelName, " not found");

  res.send(result); // return in web view
});

/* get one */

router.get("/:id", async (req, res) => {
  const result = await MyModel.findById(req.params.id);
  if (!result) return res.status(404).send(MyModelName, " not found");

  const token = result.generateAuthToken()
  res.send(token); // return in web view
});

/* exports */
module.exports = router;
