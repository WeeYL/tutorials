/* check if the x-auth-token is valid
Add valid user x-auth-token in postman header
*/

const jwt = require('jsonwebtoken')
const config = require('config')

function admin (req, res, next){
    if (!req.user.isAdmin) return res.status(403).send('Forbidden')
    
    next()
}

module.exports=admin