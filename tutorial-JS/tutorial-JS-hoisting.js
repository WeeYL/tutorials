

_______Header______('hoist inaccessible')

function display() {
  try {
    console.log(hoist); // Output: ReferenceError: hoist is not defined ...
  } catch (error) {
      console.log(error);;
  }
}

display()

let hoist = "hoisted.";


_______Header______('hoist undefined')

let hoist2;
console.log(hoist2); // undefined
hoist2 = "hoisted.";


_______Header______('hoisted')

let hoist3;
hoist3 = "hoisted.";
console.log(hoist3); // hoisted



_______Header______('Function declarations is hoisted')

hoisted(); // "hoisted."

function hoisted() {
  console.log('hoisted.');
};



_______Header______('Function expressions not hoisted')

function displayNotHoisted(){
    try {
        notHoisted(); 
    } catch (error) {
        console.log(error);        
    }
}

displayNotHoisted()

let notHoisted = function () {
    console.log('hoisted.');
  };



// header
  function _______Header______(params) {
    params = params.toUpperCase()
    console.log(`--------------- ${params} `);
  }