const EventEmitter = require("events");

class emitter extends EventEmitter {
  square(arg) {
    const res = arg*arg
    this.emit("square", res ); //
  }
}

module.exports = emitter;
