let myName;

_______Header______("callback");
// a call back a function that is a parameter 
function callback(name) {
  console.log('Hello ' + name);
}

function mainFunc(name,cb) {
  cb(name);
}

mainFunc("yl",callback);



_______Header______("return inner function");


/* outer function that returns the inner function 

*/
function outerF() {
  myName = "Mozilla1";
  function innerF() {
    console.log(myName);
  }
  return innerF();
}

outerF(); // Mozilla

function outerF2(myName) {
  function innerF() {
    console.log(myName);
  }
  return innerF();
}

outerF2("Mozilla2"); // Mozilla

_______Header______("assign function to an object");

// pass function
function outerF3() {
  myName = "Mozilla 3";
  function innerF() {
    console.log(myName);
  }
  return innerF(); 
}

let myFunc = outerF3; // pass a function
myFunc();

_______Header______("linkage breakdown");
/*  
init function A
run function A to setup function B
run function B to complete the full closure
*/


function A(x) {
  return function B(y) {
    return x + y;
  };
}

let AA = A(5);    // assign variable x
console.log(AA);  // function B

let BB = AA(2);   // assign variable y
console.log(BB);  //All set > return 7

console.log(A(5)(2)); // linkage

/* linkage */
_______Header______("linkage");

let x = 10;
function sumX(a) {
  return function (b) {
    return function (c) {
      return a + b + c + x;
    };
  };
}

console.log(sumX(1)(2)(3)); // 16



_______Header______('template function')

const el = document.getElementById('demo')
console.log(el.innerHTML);

function makeSizer(size) {
  return function() {
    return size
  };
}

const size12 = makeSizer(12);
const size14 = makeSizer(14);
const size16 = makeSizer(16);

console.log(size12()); //12

_______Header______("modular simple");
/* function that returns function similar to closure
*/

let display = (function () {
  return function inner(x) {
    return x + x;
  };
})();

console.log(display(10));

_______Header______("modular counter simple");
/*  
is a self-run function
with a local variable 
runs a function add
returns the result
*/
var add = (function () {
  var counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();

console.log(add()); // 1
console.log(add()); // 2

for (let index = 0; index < 5; index++) {
  console.log(add()); // 3-7
}

_______Header______("modular counter multi function options");

/* 
is a self-run function
with a local variable
with local function
has multi function options
access function eg counter.increment that runs local function
*/
let counter = (function () {
  // with a local variable
  let localValue = 0;

  // with local function
  function changeBy(val) {
    localValue += val;
  }

  // has multi function options
  return {
    increment: function () {
      changeBy(1);
    },

    decrement: function () {
      changeBy(-1);
    },

    value: function () {
      return localValue;
    },
  };
})();

console.log(counter);

console.log(counter.value()); // 0.

counter.decrement();
console.log(counter.value()); // -1.
counter.increment();
counter.increment();
counter.increment();
console.log(counter.value()); // 2.

const singapore = {
  country: {
    city: {
      town: "Singapore",
    },
  },
};

_______Header______("??? Optional chaining");

console.log(singapore.country.city?.town); // singapore
console.log(singapore.country.city?.house); // undefined








// header
function _______Header______(params) {
  params = params.toUpperCase();
  console.log(`--------------- ${params} `);
}
