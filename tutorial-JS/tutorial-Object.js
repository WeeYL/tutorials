
_______Header______('new')
let obj01 = new Object
obj01.foo = 10;
console.log(obj01.foo); // 10

_______Header______('assign')
const target = new Object
target.foo = 10
console.log(target);

const source1 = { foo: 20 };
Object.assign(target, source1);
console.log(target);

const source2 = { foo: 30, bar:300 };
Object.assign(target, source2);
console.log(target);

_______Header______('keys')

console.log(Object.keys(target))

_______Header______('values')

console.log(Object.values(target));

_______Header______('defineProperty')

Object.defineProperty(target,'foo',{
    value: 100,
})
console.log('defineProperty',target.foo);


_______Header______('freeze')

target.foo = 1
console.log(target.foo); // changes to 1

Object.freeze(target,'foo')
target.foo = 2
console.log(target.foo); // remains as 1



_______Header______('')







function _______Header______  (params) {
    params = params.toUpperCase()
    console.log(`--------------- ${params} `);
}
