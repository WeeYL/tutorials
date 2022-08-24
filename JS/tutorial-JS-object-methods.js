_______Header______("function object");

function Car(color, make) {
  this.color = color;
  this.make = make;
}

const car1 = new Car("red", "toyota");
console.log(car1.make);

_______Header______("const object");

const bicycle = {
  seat: 2, // static

  setColor(color) {
    this.color = color; // add a function
  },

  printInfo: function () {
    console.log(`printInfo: the color is ${this.color}`); // add a function
  },
};

// set object
bicycle.setColor("red");
bicycle.seat = 2;
console.log(bicycle.color); // red
console.log(bicycle.seat); // 2

// extend to object
const bicycle2 = bicycle;
console.log(bicycle2.color); // red

bicycle2.printInfo();

//  function runs after 1sec
const personB = {
  talk() {
    var self = this; // sets this in the function
    setTimeout(() => _______Header______("function runs after 1sec"), 1000);
  },
};

personB.talk();

_______Header______('get function and property')
const car = {
  x:0,
  increase: function (n) {
    this.x +=n
  },
  get resultAsProp(){
    return 'return result as prop ' + this.x
  },
  resultAsFunc: function(){
    return 'return result as func ' + this.x
  }
}

let toy = car
toy.increase(5)
toy.increase(2)
console.log(toy.resultAsFunc());
console.log(toy.resultAsProp);

_______Header______("extends ");

// set up constructor with all arguments
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  walk() {
    console.log("walking");
  }
}

// Extends inherit the Animal class
class Dog extends Animal {
  constructor(name, age, weight) {
    super(name, age); // super() to add constructor arguments from the parent class
    this.weight = weight;
  }
  bark() {
    console.log(this.name, "is barking");
  }
}

myDog = new Dog("Chichi");
myDog.bark();

_______Header______("Eg Object ");

const personA = {
  name: {
    first: "Leon",
    display: function () {
      console.log("name", this); // this here is first object
    },
  },

  walk: function () {
    console.log("walking");
    console.log("walk", this); // this here is all above
  },
};

personA.name.display(); // first
personA.walk(); // first, age, walk

_______Header______("Mosh Bindin");

// bind a function to the object so that it is a global function

const walk = personA.walk.bind(personA);
walk();

_______Header______("getter and setter");

class Thermostat {
  constructor(temp) {
    this.temp = temp
    console.log('creating...'); 
  }

  get temperature() {
    return this.temp;
  }
  set temperature(updatedTemp) {
    this.temp = updatedTemp;
  }
}

const Thermostat01 = new Thermostat(76);
console.log(Thermostat01.temperature); // get

Thermostat01.temperature = 100;
console.log(Thermostat01.temperature); // 100

_______Header______("run function in a const");

// wrapper function to call a function of dictionary
const person = { name: "YL", sex: "male" };
const greetings = `${person.name} is a ${person.sex}`;
console.log(greetings);



// header
function _______Header______(params) {
  params = params.toUpperCase();
  console.log(`-------------------- ${params} `);
}
