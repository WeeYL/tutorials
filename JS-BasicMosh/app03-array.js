import { printUCHeader} from "../JS-helper/printHeader.js";
import * as json from"./json.js";

printUCHeader("push, unshift, splice")
const newArr = [1,2,3]
newArr.push("end")
console.log(newArr)
newArr.unshift("front")
console.log(newArr)
newArr.splice(2,0,"s","p")
console.log(newArr)

printUCHeader("find primitve")

const numArr = [1,2,2,1,3,4,5]
console.log(numArr.indexOf(5))

printUCHeader("find object")
const Tommy = json.nameList.find(function(c){return c.name == "Tommy"})
const Jane = json.nameList.find(c=>c.name==="Jane")

console.log(Tommy, Jane)

printUCHeader("combine array")

const first = [1,2,3]
const second = [4,5]
const combined = first.concat(second)
const sliced = combined.slice(2,4)
const spread = [...first,...second]
console.log(combined,spread,sliced )

printUCHeader("checking some and every")
const chkArr = [1, 2, 13, 4, 15]

function checkMoreThan10(num) {
    console.log(num)
    return num >10
}
console.log("some element meet criteria? ",chkArr.some(n=>checkMoreThan10(n)))
console.log("every element meet criteria?",chkArr.every(n=>checkMoreThan10(n)))

printUCHeader("iterate forEach, map")

const myAwesomeArray = [1, 2, 3, 4, 5]
const newArray1 = myAwesomeArray.forEach(x => x * x) // undefined
const newArray2 = myAwesomeArray.map(x => x * x) 
const newArray3 = myAwesomeArray.map(x => x * x).filter(n=>checkMoreThan10(n)) // chaining
console.log(newArray1,newArray2, newArray3)

printUCHeader("scoping")

function start() {
    for (var n = 0; n < 3; n++) {
        console.log("inside function",n)
    }
    console.log("outside function",n) // value is accessible outside of scope
}
start()

printUCHeader("this")

// method -> obj
// function > gloval (window, global)

const video = {
    tags:['a','b','c'],
    play(){console.log (this)},
    showTags(){
        this.tags.forEach(function(t){console.log(t)})
    }
}

video.play()
video.showTags()
