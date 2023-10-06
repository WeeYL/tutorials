const print = require('./printHeader')

///////////////////////////////////////////////////

// EVENT EMITTER
// ORDER OF IMPLEMENTATION - ON: DEFINE THE FUNCTION, EMIT: TRIGGER THE EVENT

print.header("EVENT EMITTER ON -> EMIT")

const EventEmitter = require("events") // NOTE : check that EventEmitter text has to turn green
const myConn = new EventEmitter();

// REGISTER A LISTENER (callback name, function)
myConn.on('connection',function(){
    console.log('connection, listener called')
})
// RAISE AN EVENT 
myConn.emit('connection')

///////////////////////////////////////////////////

print.header("EVENT EMITTER ARGUMENTS")

// allows multi definitions
myConn.on('eventArg',function(arg){
    console.log(`id ${arg.id}`)
})
myConn.on('eventArg',function(arg){
    console.log(`name ${arg.name}`)
})
// RAISE AN EVENT 
myConn.emit('eventArg',{id:1, name:"Holden"})

///////////////////////////////////////////////////

print.header("EVENT EMITTER ARGUMENTS")

class MyMongoose extends EventEmitter {
    
    // EXTENDS INHERITS THE EVENTEMITTER
    connection(message) {
        console.log("sending")
        this.emit('connMsg', {message:`connection message is....${message}`}) // 1. set the function to emit
    }

}

const mongoose = new MyMongoose()

mongoose.on('connMsg',arg=> console.log(arg.message))  // 2. use the func name and define the function
mongoose.connection("message logged") // 3. call connection function