import { ppf,ppw, pwh} from "../JS-helper/printer.js";
import * as json from"./json.js";

// PUSH UNSHIFT SPLICE
pwh("push, unshift, splice")
const newArr = [1,2,3]
newArr.push("end")
ppw("push",newArr)
newArr.unshift("front")
ppw("front",newArr)
newArr.splice(2,0,"s","p")
ppw('splice',newArr)

// FIND PRIMITIVE
pwh("find primitve")

const numArr = [1,2,2,1,3,4,5]
ppw('indexOf(5)',numArr.indexOf(5))

// FIND OBJECT
pwh("find object")
const Tommy = json.nameList.find(function(c){return c.name == "Tommy"})
const Jane = json.nameList.find(c=>c.name==="Jane")

ppw('find',JSON.stringify(Tommy),'find', JSON.stringify(Jane))

// COMBINE ARRAY
pwh("combine array")

const first = [1,2,3]
const second = [4,5]
const combined = first.concat(second)
const sliced = combined.slice(2,4)
const spread = [...first,...second]
ppw('combined',combined,'spread',spread,'spliced',sliced)

pwh("spread")
const arrA = [1,2,3]
const arrB = [...arrA,4]
const arrC = [4,5]
const arrD = [...arrA,arrC]
const [a,b,c] = [...arrA]
ppw('copy',arrB,'combined',arrD, 'destructuring',[a,b,c])


// CHECK ARRAY
pwh("checking some and every")
const chkArr = [1, 2, 13, 4, 15]

function checkMoreThan10(num) {
    console.log(num)
    return num >10
}
ppw("some element meet criteria? ",chkArr.some(n=>checkMoreThan10(n)))
ppw("every element meet criteria?",chkArr.every(n=>checkMoreThan10(n)))

// ITERATE FOREACH MAP
pwh("iterate forEach, map")

const myAwesomeArray = [1, 2, 3, 4, 5]
const newArray1 = myAwesomeArray.forEach(x => x * x) // undefined, can only console.log()
const newArray2 = myAwesomeArray.map(x => x * x) 
const newArray3 = myAwesomeArray.map(x => x * x).filter(n=>checkMoreThan10(n)) // chaining
ppw('foreach',newArray1,'map',newArray2, 'chaining',newArray3,)



// THIS BINDING
pwh("this binding")

// method -> obj
// function > global (window, global)

const video = {
    tags:['a','b','c'],
    play(){return(this)},
    showTags(){
        this.tags.forEach(function(t){console.log(t)})
    }
}


ppw('video.play()',video.play())

video.showTags();





    