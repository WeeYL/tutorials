import { pph, ppp, ppf} from "../JS-helper/printer.js";

// CONST
pph("const")

const circle = {
    radius: 2, 
    area: function (){
        return 'area is',3.142 * this.radius * this.radius
    }
}

circle.color = "red"
circle.size = 2
delete circle.size
circle.name = null

ppf('area()',circle.area(),"add new property",circle.color,'delete',circle.size,'null',circle.name)


// CONST GET SET
pph("const get set")
const square = {
    circleColor: "yellow",
    get color (){ return this.circleColor},
    set color (circleColor){return this.circleColor = circleColor}
}

console.log(square.color)
square.color = "red"
console.log(square.color)

//  FUNCTION
pph("FACTORY FUNCTION RETURN")

function factoryFuncKVCircle (radius) {
    return {
        diameter:2*radius,
        area: function() { console.log('factory function area is',3.142 * radius * radius) }
    }
}
const myFactoryFuncKVCircle = factoryFuncKVCircle(3)
myFactoryFuncKVCircle.area()
ppp('calculated variables, diameter',myFactoryFuncKVCircle.diameter)





