printUCHeader("Encapsulation");

class Shape {
  constructor(name) {
    this.name = name;
  }

  calcCost(area) {
    // let is scope based. multiplier and calculate is not accessible
    let multipler = 3.4;
    let calculate = function () {
      console.log(multipler, area);
      return multipler * area;
    };
    return calculate();
  }
  // static method
  static displayName() {
    console.log("shape name is " + this.name);
  }

  static mixin(target, ...sources) {
    Object.assign(target, ...sources)
  }

  // force user to create a proper function
  sellingPrice() {
    throw new Error("to be defined by subclass");
  }
}

class Color {
    spray () {
        return "red"
    }
}

class Circle extends Shape {
  // inheritance

  constructor(radius) {
    super("circle");
    this.radius = radius;
    this.color = new Color // extend Class
  }


  sellingPrice() {
    return 1000;
  }
}

///////////////////////////////////////////////////
const spray = { 
  sprayRed (){ 
    return 'sprayed red' 
  }  
}


// static
Circle.displayName("circle");
Circle.mixin(Circle.prototype, spray)

const circle = new Circle(10);
const cost = circle.calcCost(10); // abstraction

console.log(circle.sellingPrice(), circle.sprayRed());


const sq = new Circle(5)



function mixin(target, ...sources) {
  Object.assign(target, sources);
}

function printUCHeader(header) {
  console.log("\n\n#----------------------------#");
  console.log(header.toUpperCase());
  console.log("#----------------------------#\n");
}
