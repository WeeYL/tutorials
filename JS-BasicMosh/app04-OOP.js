

// classical and prototypical inheritance
// prototype is a parent, and is a typical object

// run index.html
printUCHeader("get prototype of")
let x = {}
console.log(Object.getPrototypeOf(x))


printUCHeader("get Own Property Descriptor")
function Circle (radius) {
        // return key:value
        this.radius=radius
}
let circle = new Circle(2)

Object.defineProperty(circle, 'radius', {
    writable: false // circle.radius = 10 // Cannot assign to read only 
})

let descriptor = Object.getOwnPropertyDescriptor(circle,"radius")

console.log(descriptor)

printUCHeader("Prototype member")

function Dog(name)  {    this.name = name;  }
  
  const dog = new Dog('Gabby');
  Dog.prototype.toString = function dogToString() {
    return `my name is ${this.name}`;
  };
  
  console.log(dog.toString());

  printUCHeader("Composition Mixin")

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


  
  function Fish () {}
  mixin(Fish.prototype, canSwim)
  const fish1 = new Fish()
  fish1.swim()






  function printUCHeader(header) { 

    console.log("\n\n#----------------------------#")
    console.log(header.toUpperCase());
    console.log("#----------------------------#\n")

};