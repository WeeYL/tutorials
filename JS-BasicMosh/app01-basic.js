import { pph, ppp, ppf, ppw} from "../JS-helper/printer.js";

export const nameList = [
  {
      "name": "John",
      "gender": "Male",
      "age": 30
  },
  {
      "name": "Jane",
      "gender": "Female",
      "age": 25
  },
  {
      "name": "Tommy",
      "gender": "Non-binary",
      "age": 28
  }
]

pph("Loop let-in");

for (let index in nameList) {
    console.log(index, nameList[index])
}

pph("Loop let-of");

for (let k of nameList) {
    console.log(k)
}

// SCOPING
pph("scoping")

function greet_var() {
    // variable a can be used here
    var a = 'hello';
    console.log(a);
}

function greet_let() {
    let a = 'hello';
    if(a == 'hello'){
        let b = 'world';
        console.log(a + ' ' + b); // hello world
    }
    try {
        console.log(a + ' ' + b); // error
    } catch (error) {
        console.error('let is scope based',error)
    }
}

greet_var()
greet_let()

