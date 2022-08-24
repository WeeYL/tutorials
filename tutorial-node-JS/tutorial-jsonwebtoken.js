/* like a pass that shows the properties to enter 
https://jwt.io/

*/

const jwt = require('jsonwebtoken')
const config = require('config')

// a token given to the id and stamped with jwtPrivateKey
const token = jwt.sign({id:"123456"},config.get('jwtPrivateKey'))
console.log(token);// return eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE2MTgzMjE2Njd9.YeikXUfvvfcHOZTR8KbdGfMWN8V7SuSQ_ZaUUsW0yH8

// verify and return the identity
const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
console.log(decoded); // return { id: 'test' }

// from environment
console.log(config.get('jwtPrivateKey')); // returns vidly_jwtPrivateKey