

_______Header______("spread operator ");

const users = [
  { id: 1, isValid: true },
  { id: 2, isValid: true },
  { id: 3, isValid: false },
];

console.log(...users);
console.log(users[0]);

_______Header______("Array filter");
let activeUsers = users.filter((user) => user.isValid === true);
console.log(activeUsers);

_______Header______("Array map");

activeUsers = users.map((user) => `<h1> ${user.id} </h1>`);
console.log(activeUsers);

activeUsers = users.map((user) => ({ ...user, isValid: false, age: 100 })); // map with spread operator replace value and add value
console.log(activeUsers);

_______Header______("Array add");
// append
var liste1 = [{ movie: "jaws" }, { movie: "lost" }];
liste1.push({ movie: "liste1" });
var liste2 = [...liste1, { movie: "liste2" }];
console.log(liste1);
console.log(liste2);

// add
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
console.log(fruits);

_______Header______("Array delete");
// delete
delete liste2[0]; // leaves an empty item in array
console.log(liste2);

// delete
liste2.shift(); // remove first item
console.log(liste2);

// delete
liste2.pop(); // remove last item
console.log(liste2);

// delete

var liste3 = [1, 2, 3, 4, 5];
liste3.splice(1, 1);
console.log(liste3);

_______Header______("Array update");

var liste3 = [1, 2, 3, 4, 5];
liste3.splice(1, 1, "insert new");
console.log(liste3);

_______Header______("Array get");
// slice
var liste3 = [1, 2, 3, 4, 5];
console.log(liste3.slice(1, 3));
console.log(liste3.slice(-3, -1));

// arrow function

// (): takes in arguments // =>: return  // (x => x): where each argument is
_______Header______("arrow func");
myArr = [3, 6, 9, 12, 15];
machine = (arr) => arr.filter((num) => num % 2 != 0);
console.log(machine(myArr));

// takes argument => run function
_______Header______("arrow func");
myArr.forEach((element) => console.log(element));

// (()=>...)()
_______Header______("arrow func");
var a = 12,
  b = 13;
(() => console.log(a, b))();

// deconstruction eg assign x,y,z to a,b,c from arr

_______Header______("destruct");
var arr = { x: 1, y: 2 };
var { x: assign_x_model, y: assign_y_model } = arr;
console.log(assign_x_model);

// switch
_______Header______("switch");
var count = 0;
function mySwtich(num) {
  res = "";
  switch (num) {
    case 1:
      res = "small";
      count += 1;
      break;
    case 2:
      res = "mid";
      count += 20;
    case 3:
      res = "mid";
      count += 20;
    case 4:
      res = "mid";
      count += 20;
      break;
    case 5:
      res = "high";
      count += 100;
      break;
  }
  return res;
}
console.log(mySwtich(1));
console.log(mySwtich(4));
console.log(mySwtich(5));
console.log(count);

// tenary ?
// (if...) : (then) :  (else if....) : (else)
_______Header______("tenary");
function checkPositive(num) {
  return num > 0 ? "positive" : num < 0 ? "negative" : "zero";
}
console.log(checkPositive(10));


// Header
function _______Header______(params) {
  params = params.toUpperCase();
  console.log(`--------------------${params}`);
}
