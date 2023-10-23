

// classical and prototypical inheritance
// prototype is a parent, and is a typical object

// run index.html
const Shape = {};
function Circle(radius) {
  Circle.prototype.toString = function dogToString() {
    return `my radius is ${this.radius}`;
  };
  return (this.radius = radius);
}

let circle = new Circle(2)

console.log("getPrototypeOf",Object.getPrototypeOf(circle))
console.log("getOwnPropertyDescriptor",Object.getOwnPropertyDescriptor(circle,"radius"))
Object.defineProperty(circle, 'radius', {
    writable: false // circle.radius = 10 // Cannot assign to read only 
})
console.log("defineProperty",Object.getOwnPropertyDescriptor(circle,"radius"))
console.log("Circle.prototype.toString",circle.toString())


  printUCHeader("Composition Mixin assign const to func")

  // basic
  const canEat = { eat (){ console.log('eat') }  }
  const canWalk = { walk (){ console.log('walk') }  }
  const canSwim = { swim (){ console.log('swim') }  }

  function Person (name){this.name=name}
  Object.assign(Person.prototype,canEat, canWalk)
  const person = new Person("yl")
  person.eat()


  // refactor to mixin
  function mixin(target, ...sources) {
    Object.assign(target, ...sources)
  }
  

  class Fish  {
      mixin( ...sources) {
        Object.assign(Fish.prototype, ...sources)
    }
  }
  const fish1 = new Fish()
  fish1.mixin(canSwim, canEat)
  fish1.swim()
  fish1.eat()
  fish1.print = function(){console.log('print');}
  fish1.print()





  function printUCHeader(header) { 

    console.log("\n\n#----------------------------#")
    console.log(header.toUpperCase());
    console.log("#----------------------------#\n")

};