import { printUCHeader, ppp} from "../JS-helper/printHeader.js";
import * as json from"./json.js";

printUCHeader("push, unshift, splice")
const newArr = [1,2,3]
newArr.push("end")
ppp("push",newArr)
newArr.unshift("front")
ppp("front",newArr)
newArr.splice(2,0,"s","p")
ppp('splice',newArr)

printUCHeader("find primitve")

const numArr = [1,2,2,1,3,4,5]
ppp('indexOf(5)',numArr.indexOf(5))

printUCHeader("find object")
const Tommy = json.nameList.find(function(c){return c.name == "Tommy"})
const Jane = json.nameList.find(c=>c.name==="Jane")

console.log('find',Tommy,'find', Jane)

printUCHeader("combine array")

const first = [1,2,3]
const second = [4,5]
const combined = first.concat(second)
const sliced = combined.slice(2,4)
const spread = [...first,...second]
ppp('combined',combined,'spread',spread,'spliced',sliced)

printUCHeader("checking some and every")
const chkArr = [1, 2, 13, 4, 15]

function checkMoreThan10(num) {
    console.log(num)
    return num >10
}
ppp("some element meet criteria? ",chkArr.some(n=>checkMoreThan10(n)))
ppp("every element meet criteria?",chkArr.every(n=>checkMoreThan10(n)))

printUCHeader("iterate forEach, map")

const myAwesomeArray = [1, 2, 3, 4, 5]
const newArray1 = myAwesomeArray.forEach(x => x * x) // undefined, can only console.log()
const newArray2 = myAwesomeArray.map(x => x * x) 
const newArray3 = myAwesomeArray.map(x => x * x).filter(n=>checkMoreThan10(n)) // chaining
ppp('foreach',newArray1,'map',newArray2, 'chaining',newArray3,)

printUCHeader("scoping")

function start() {
    for (var n = 0; n < 3; n++) {
        console.log("inside function",n)
    }
    console.log("outside function",n) // value is accessible outside of scope
}
start()

printUCHeader("this binding")

// method -> obj
// function > global (window, global)

const video = {
    tags:['a','b','c'],
    play(){console.log (this)},
    showTags(){
        this.tags.forEach(function(t){console.log(t)})
    }
}

video.play()
video.showTags()






    