const print = require('./printHeader')

///////////////////////////////////////////////////

// EVENT EMITTER
// ORDER OF IMPLEMENTATION - ON: DEFINE A LISTENER, EMIT: TRIGGER THE EVENT

print.header("EVENT EMITTER EG1")

const EventEmitter = require("events") // NOTE : The EventEmitter has to turn green
const emitter = new EventEmitter();

// REGISTER A LISTENER (name, function)
emitter.on('eg1',function(){
    console.log('eg1, listener called')
})
// RAISE AN EVENT 
emitter.emit('eg1')

///////////////////////////////////////////////////

print.header("EVENT EMITTER ARGUMENTS")
emitter.on('eventArg',function(arg){
    console.log(`id ${arg.id} name ${arg.name}`)
})
// RAISE AN EVENT 
emitter.emit('eventArg',{id:1, name:"Holden"})

///////////////////////////////////////////////////

print.header("EVENT EMITTER ARGUMENTS")

class Logger extends EventEmitter {
    
    // EXTENDS INHERITS THE EVENTEMITTER
    log(message) {
        console.log("sending")
        this.emit('messageLogged', {message:"my message is...."}) // call messageLogged func
    }

}

const logger = new Logger()

logger.on('messageLogged',arg=> console.log(arg.message))  // define messageLogged func
logger.log("message logged")