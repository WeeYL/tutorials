import { printUCHeader} from "../JS-helper/printHeader.js";

printUCHeader("const")

const constCircle = {
    radius: 2, 
    area (){
        console.log('area is',3.142 * this.radius * this.radius)
    }
}
constCircle.area()

printUCHeader("const get set")
const getSetCircle = {
    circleColor: "yellow",
    get color (){ return this.circleColor},
    set color (circleColor){return this.circleColor = circleColor}
}

console.log(getSetCircle.color)
getSetCircle.color = "red"
console.log(getSetCircle.color)

printUCHeader("factory function, key:value")

function factoryFuncKVCircle (radius) {
    return {
        // return key:value
        radius: radius,
        area() { console.log('factory function area is',3.142 * this.radius * this.radius) }
    }
}
const myFactoryFuncKVCircle = factoryFuncKVCircle(2)
myFactoryFuncKVCircle.area()

printUCHeader("constructor")
// 1. new Circle creates an empty object, 2. this points to the object, 3. return the object

function ConstructorCircle(radius) {
    this.radius=radius
    this.area = function() { console.log('factory function area is',3.142 * this.radius * this.radius) }
}

const myConstructorCircle = new ConstructorCircle(5)
myConstructorCircle.area()

printUCHeader("Dynamic")

const dynamicCircle = {
    radius:1
}

// add property and methods
dynamicCircle.color = "yellow"
dynamicCircle.area = function(){
    console.log('constructor area is',3.142 * this.radius * this.radius)
}
dynamicCircle
dynamicCircle.area()
console.log(dynamicCircle)

// remove property
delete dynamicCircle.color
console.log(dynamicCircle)


printUCHeader("value reference")
// primitive are copied by value
// reference are copied by their reference

const arrA = [1,2,3]
console.log('arrA:',arrA) 
const arrB = arrA
arrB.push(4)
console.log('arrB:',arrB) 
console.log('arrA:',arrA) // arr A is affect by arr B

const arrC = [...arrA] // make a copy
arrC.push(5)
console.log('arrC:',arrC)
console.log('arrA:',arrA)
