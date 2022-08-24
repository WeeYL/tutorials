/* check if the x-auth-token is valid
Add valid user x-auth-token in postman header
*/

const jwt = require('jsonwebtoken')
const config = require('config')

function auth (req, res, next){
    // get token from user
    const token = req.header('x-auth-token'); 

    // check for empty
    if(!token) return res.status(401).send('Access denied, no token provided')

    // wrong token number
    try {
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        // console.log('decoded:', decoded);
        req.user = decoded // returns _id: '60759ccc9d888a240889cdd2'. for access in route request
        next()
    } catch (ex) {
       return res.status(400).send('Invalid Token')
    }
    
}


module.exports=auth