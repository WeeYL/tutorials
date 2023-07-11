// GLOBAL OBJECT
const myTimeout = setTimeout(()=>console.log("global timeout"), 1000)

// MODULE
exportedModule = "exported module"
function logger(){
    console.log("logging")
}

// EXPORT MODULE
module.exports.exportedModule = exportedModule 
module.exports.logger = logger