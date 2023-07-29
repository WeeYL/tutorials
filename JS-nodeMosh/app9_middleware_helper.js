function myMiddleWare(req,res,next){
    console.log("my middleware")
    next()
}

module.exports = myMiddleWare