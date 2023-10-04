import { printHeader} from "../JS-helper/printHeader.js";
import * as arr from"./json.js";

printHeader("Loop let-in");

for (let index in arr.nameList) {
    console.log(index, arr.nameList[index])
}

printHeader("Loop let-of");

for (let k of arr.nameList) {
    console.log(k)
}


printHeader("ex-fizzbuzz");
// div 3 fizz, div by 5 buzz, both 3 or 5 fizzbuzz

function fizzbuzz(input) {
  if (input % 3 == 0 && input % 5 == 0) {
    console.log("fizzbuzz");
  } else if (input % 3 == 0) {
    console.log("fizz-3");
  } else if (input % 5 == 0) {
    console.log("buzz-5");
  } else {
    console.log("none");
  }
}
fizzbuzz(25);

printHeader("ex-show primes");

function showPrimes(limit) {
  for (let num = 2; num <= limit; num++) {
   if (findPrime(num)) console.log(num)
}

function findPrime(num) {
    for (let factor = 2; factor < num; factor++) {
      if (num % factor === 0) {
        return false;
      }
      break;
    }
    return true;
  }
}

showPrimes(15);
