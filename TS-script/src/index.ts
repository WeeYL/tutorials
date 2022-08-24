// PRODUCTIVITY FUNCTIONS

function pp(x: any) {
  console.log(x);
}
function Header(params: any) {
  params = params.toUpperCase();
  console.log(`--------------- ${params} `);
}

// TYPES
Header("type");

type TypeUnion = number | string;
type TypeUnionExact = "is-num" | "is-text";

let TypeUnion1 = "TypeUnion";
pp(TypeUnion1);
let TypeUnion2 = 1000;
pp(TypeUnion2);
let TypeUnionExact1 = "is-num";
pp(TypeUnionExact1);

let input: unknown; // input is of unknown type

// TYPE EXTEND
Header("type extend");

type Access = { access: string[] }; // define custom type and its property(s)
type Empname = { name: string };
type Employee = Access & Empname;
let employee01: Employee; 
employee01 = {
  access: ["server", "password"],
  name: "YL",
};
pp(employee01);

// ENUM

Header("enum");

enum Role {
  ADMIN,
  READONLY,
}

pp(Role.ADMIN);
pp(Role.READONLY);

// FUNCTION 
Header("function implement");

function fi1(k: number) {
  pp(k);
} // classic

let fi2 = (k: number) => pp(k); // fat arrow
let fi3: (k: number, v: number) => number; // assign a function type
let fiadd = (k: number, v: number) => {
  return k + v;
};

fi3 = fiadd; // assign the function
fi3(3, 5);
fi1(10);
fi2(100);
pp(fi3(3, 5));

Header("function callback");
// add a callback function type as an argument

function handler(k: number, v: string, callback: (n: number) => void) {
  pp(v);
  return callback(k); // runs callback runs
}

let fcb_sq = (k: number) => pp(k * k);
let fcb_sqrt = (k: number) => pp(Math.sqrt(k));

handler(4, `square root of 4`, fcb_sqrt);
handler(3, `square of 3`, fcb_sq);

Header("function rest");
// convers args into array
function fRest(...props: number[]) {
  let value = props.reduce((prev, cur) => {
    return prev + cur;
  });
  return value;
}

let fRestres = fRest(11, 21, 31);
pp(fRestres);

Header("function generic");

function fg01<T>(arr: T[]): any {
  pp(arr);
}

fg01<string>(["a", "b", "c"]);

Header("function from interface");

Header("interface");

// interface is the contract that the type, function, class has to follow
// interface Dict
interface I_user {
  name?: string;
  age?: number;
}

let user01 = { name: "yl", age: 11 }; // option
let user02: I_user = { name: "leon", age: 12 }; // option

let fri01 = (user: I_user) => pp(`${user.name} is ${user.age}`);

fri01(user01);
fri01(user02);

// interface generic <T>
interface I_array<T> {
  arr: T[];
}
let I_num_array: I_array<string> = { arr: ["abc", "def"] };
pp(I_num_array);

// interface function, add function
interface I_func {
    age?: number,
    print(name:string,age?:number): void
}

let IfuncPrint: I_func = {
    age:10,
    print: (name:string, weight?:number) => pp(`${name} is of age ${weight ?? 60}`)
}
IfuncPrint.print("yl",100)
IfuncPrint.print("yl") // optional chaining
pp(IfuncPrint.age)

// interface generic function
interface I_func_generic <T,U> {
    log: (k:T, v:U) => void
}

let I_func_generic01: I_func_generic <string, number> = {
    log: (name:string, id:number) => pp(`id: ${id} \nname: ${name}`)
}
I_func_generic01.log("jam",1001)

// interface extends

interface I_extends extends I_func, I_func_generic <string, number> { } // no additionals 

let I_extends01: I_extends = {
    age:10,
    print: (name:string) => {pp (`I_extends ${name}`)},
    log: (name:string, id:number) => pp(`I_extends id: ${id} \nname: ${name}`)
}   
I_extends01.log("yl",10)
I_extends01.print("leon")

// interface extends

interface I_extends_A <T> { weight: T }
interface I_extends_B <U> { name: U }
interface I_extends_C <T, U> extends I_extends_A <T>, I_extends_B <U> { // extends_C has to incl all types U &T
  disp: (weight:T, name: U) => void
} 

let I_extends_C01:I_extends_C<number,string> = {
  weight:100,
  name:"yl",
  disp: ( weight:number, name:string,) => {pp(`I_extends_C01 ${weight} ${name}`)}
}

I_extends_C01.disp(120,"yl")

Header("class")


// CLASS WITH CONSTRUCTOR
class Person {
  constructor(public age: number, public name: string) {}
  disp(){ return` ${this.name} of age ${this.age}`  }}

let ClassWithConstructor01 = new Person(13,'yl')
pp(`ClassWithConstructor: ${ClassWithConstructor01.disp()}`)

// CLASS EXTENSION
class Engineer extends Person {
  constructor(age:number,name:string, public role:string) {
    super(age,name) // note: must be in the same order as constructor
  }
}

let engineer = new Engineer(10,"yl","engineer")
engineer.disp()

// CLASS IMPLEMENT INTERFACE

interface I_ID {
  id: number;
}

class CL_ID implements I_ID {
  my_id:I_ID = { id:0 }   // implements id
  constructor(public id: number) {}  // add id to constructor
  disp () { pp(`CLASS IMPLEMENT INTERFACE: id is ${this.id} my_id is ${this.my_id.id}`)  } 
}

let CL_ID01 = new CL_ID(101)
CL_ID01.disp()

// CLASS IMPLEMENT INTERFACE GENERIC
interface I_ID_G<T> { id: T}

class CL_ID_Generic<T = number> implements I_ID_G<T> {
  my_id:I_ID_G<number> = {id: 1}
  constructor (public id:T) {}
  disp () { pp(`CLASS IMPLEMENT INTERFACE: id is ${this.id} my_id is ${this.my_id.id}`) } 
}

let CL_ID_Generic01 = new  CL_ID_Generic(90)
CL_ID_Generic01.disp()