import { printUCHeader, ppp} from "../JS-helper/printHeader.js";

// COST
printUCHeader("const")

const constCircle = {
    radius: 2, 
    area (){
        console.log('area is',3.142 * this.radius * this.radius)
    }
}
constCircle.area()

// CONST GET SET
printUCHeader("const get set")
const getSetCircle = {
    circleColor: "yellow",
    get color (){ return this.circleColor},
    set color (circleColor){return this.circleColor = circleColor}
}

console.log(getSetCircle.color)
getSetCircle.color = "red"
console.log(getSetCircle.color)

// FACTORY FUNCTION KEY:VALUE
printUCHeader("FACTORY FUNCTION KEY:VALUE")

function factoryFuncKVCircle (radius) {
    return {
        diameter:2*radius,
        area() { console.log('factory function area is',3.142 * radius * radius) }
    }
}
const myFactoryFuncKVCircle = factoryFuncKVCircle(3)
myFactoryFuncKVCircle.area()
ppp('calculated variables, diameter',myFactoryFuncKVCircle.diameter)


// DYNAMIC ADD PROPERTY AND FUNCTIONS TO CONST
printUCHeader("DYNAMIC ADD PROPERTY AND FUNCTIONS TO CONST")

const dynamicCircle = {
    radius:1
}

// add property and methods
function calcCircleArea(radius) {return 3.142 * radius * radius}
dynamicCircle.color = "yellow"
dynamicCircle.area =  calcCircleArea

ppp('function class',JSON.stringify(dynamicCircle),'area',dynamicCircle.color,'area',dynamicCircle.area(2))

// remove property
ppp('before',JSON.stringify(dynamicCircle))
delete dynamicCircle.color
ppp('after remove',JSON.stringify(dynamicCircle))


printUCHeader("value reference")
// primitive are copied by value
// objects are copied by their reference

const arrA = [1,2,3]
ppp('arrA',arrA) 
const arrB = arrA
arrB.push(4)
ppp('arrB=arrA',arrB) 
ppp('arrA',arrA) // arr A is affect by arr B

const arrD = [1,2,3]
const arrC = [...arrD] // make a copy
arrC.push(4)
ppp('arrC = [...arrD]',arrC)
ppp('arrD',arrD)
