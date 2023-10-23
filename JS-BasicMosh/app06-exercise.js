import { printHeader} from "../JS-helper/printHeader.js";

printHeader("eg-show primes");

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

printHeader("eg-fizzbuzz");
// div 3 fizz, div by 5 buzz, both 3 or 5 fizzbuzz

function fizzbuzz(input) {

  if (input % 3 == 0 && input % 5 == 0) {
    console.log(`${input} is div by 3 and 5`);
  } else if (input % 3 == 0) {
    console.log(`${input} is div by 3`);
  } else if (input % 5 == 0) {
    console.log(`${input} is div by 5`);
  } else {
    console.log(`${input} is none`);
  }
}
fizzbuzz(25);
