const print = require('./printHeader')

///////////////////////////////////////////////////

// LOAD MODULE
print.header("USE REQUIRE TO LOAD MODULE")

const helper = require('./app1_helper')
console.log(helper.exportedModule)
helper.logger()
console.log("")

///////////////////////////////////////////////////

// NODEJS MODULES EXAMPLES
// https://nodejs.org/api/modules.html
print.header("NODEJS MODULES EXAMPLES")

const path = require('path')
console.log(__filename)
console.log(path.parse(__filename))



