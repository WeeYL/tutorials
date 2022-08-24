/* 
setup addListener(event, listener)
runs emit(event, [arg1], [arg2], [...])


*/

/* event listener */
const EventEmitter = require("events");
const emitter = new EventEmitter();

// on(event, listener)
emitter.addListener("messageLogged", (arg) => {
  console.log("event raised ", arg);
});

// emit(event, [arg1], [arg2], [...])
emitter.emit("messageLogged", { id: 1, url: "http://" }); // function name is messageLogged

/* call from folder */
// Sequence1: addEventListner args is sent to emitter
// Sequence2: emitter takes the arg and do something and return a result
// Sequence3: addEventListener listener do something with the result from emitter

const Emitter = require("./emitter");

const math = new Emitter();

//
math.addListener("square", (arg) => {
  console.log("eg1: ", arg);
  console.log('eg2: ',arg*5);
});

math.square(3);


