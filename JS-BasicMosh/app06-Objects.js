// OBJECT ARE REFERENCED VALUES

import { pph, ppp, ppf} from "../JS-helper/printer.js";

const canEat = { eat (){ return 'eat' }  }
function walk (){ return 'walk' }  
const canWalk = {walk}
const canSwim = { swim (){ return 'swim' }  }

class Person {
    constructor(name) {
      this.name = name;
      this.gender = "male"
    }
}

const person = new Person("YL")

// assign object only to class. 
Object.assign(person, canEat)
Object.assign(person, canWalk)

// define readonly property
Object.defineProperty(person, 'gender', {
    writable: false 
})

const assign = person.walk()
const getOwnPropertyNames = Object.getOwnPropertyNames(person)
const defineProperty = person.gender
const keys = Object.keys(person)

pph('Object methods')
ppp('assign',assign,'getOwnPropertyNames',getOwnPropertyNames,'defineProperty',defineProperty,'keys',keys)
