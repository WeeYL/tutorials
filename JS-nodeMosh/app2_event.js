const print = require('./printHeader')

///////////////////////////////////////////////////

// EVENT EMITTER
// ORDER OF IMPLEMENTATION - ON: DEFINE THE FUNCTION, EMIT: TRIGGER THE EVENT

print.header("EVENT EMITTER EG1")

const EventEmitter = require("events") // NOTE : check that EventEmitter text has to turn green
const myConn = new EventEmitter();

// REGISTER A LISTENER (callback name, function)
myConn.on('connect',function(){
    console.log('connect, listener called')
})
// RAISE AN EVENT 
myConn.emit('connect')

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
        this.emit('messageLogged', {message:`my message is....${message}`}) // call messageLogged func
    }

}

const mongoose = new MyMongoose()

mongoose.on('messageLogged',arg=> console.log(arg.message))  // define messageLogged func
mongoose.connection("message logged")