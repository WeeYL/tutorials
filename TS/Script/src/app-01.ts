import {_______Header______} from "./utils"


_______Header______("syntax");
// const = function(): returns number => {  }
const displayNum = ():number =>{return(1+2)}
console.log(displayNum())

_______Header______("type");

console.log(
  `;
let x = <string> "hello"
let x: [string, number];
let x: number [] = []; // set an empty array
let x: string[] =['one','two']
let x: (string | number ) = 10
 `
);


_______Header______("type union");

type TypeUnion = number | string;
type TypeUnionExact = "is-num" | "is-text";

type Listener = (arg: Function) => void;
function addListener() {console.log('addListener')}
let listener1:Listener = addListener
listener1(addListener)

_______Header______("type Extend");

type Access = { access: string[] };
type EmpName = { empName: string };
type Employee = Access & EmpName;

let emp_155: Employee = { empName: "YL", access: ["server", "password"] };
console.log(emp_155);

_______Header______("let unknown");
let input: unknown; // input is of unknown type


input = "YL"; // implicit any
let usernameAny: any = input; // OK. same type : any
let usernameString = input; 
// let usernameBoolean: boolean = input; // doesn't permit any type 

// type guard, we only accept input of string
if (typeof usernameString === "string") {
  input = usernameString;
  console.log(input);
}

_______Header______("enum");
enum Role {
  ADMIN,
  READONLY,
}
let readOnlyRole = Role.READONLY;
console.log("readOnlyRole id: ", readOnlyRole);
console.log("Role[readOnlyRole]: ", Role[readOnlyRole]);
console.log("Role[1]: ", Role[1]);

_______Header______("function implement");

function F_01(k: number, v: number) {
  console.log(k + v);
}

// run
F_01(50, 51);

_______Header______("function reuse");

function F_01_01(k: number, v: number) {
  console.log(k - v);
}

let F_init: (k: number, v: number) => void; // reuse

// run
F_init = F_01;
F_init(50, 51);

F_init = F_01_01;
F_init(50, 51);

_______Header______("function call back");

function handler(k: number, v: number, cb: (i: number) => void) {
  const res = k + v;
  cb(res);
}

// run
handler(10, 11, (res) => {
  console.log(res);
});

_______Header______("function, rest as arg");

// ...props converts args to array

function F_rest(...props: number[]) {
  const res = props.reduce((prev, cur) => {
    return prev + cur;
  });

  return res;
}

// run
console.log(F_rest(99, 12, 33, 74));

_______Header______("function, func as param");
// define func type

type funcParam = (a:number,b:number) => number // define type func
function add (a:number, b:number) { return a+b } // func
function fnParam(k:number,v:number,cb:funcParam){ // accepts only specific func 
  const a = k 
  const b = v
  console.log(cb(a,b))
}

fnParam(1,2,add) // run

_______Header______("function, interface as arg");

interface Coord {
  x:number,
  y:number, 
}

function calDist(coord:Coord) {
  console.log(Math.pow(coord.x,2)+Math.pow(coord.y,2))
}

calDist({x:2,y:2})

let coordTest:Coord = {
  x: 5,
  y: 8
};
calDist(coordTest)

_______Header______("Function generic - fn <T> (arg: T>");

// function expects <Type> ( for arg )
function fnGen <T> (numList:T[]): void { 
  console.log(...numList)
}

fnGen<number>([111,222])

_______Header______("Interface");
// interface is the contract that the type, function, class has to follow

// config interface to variables
interface I_num { num: number;}
let V_01: I_num = { num: 1 };
console.log(V_01);

// config generics to interface
interface G_num<T> { num: T; }
let V_02: G_num<number> = { num: 1 };
console.log(V_02);

_______Header______("Interface + Generic function");

// define function
interface CoordInterface <T,U> {
  calc(x:T,y:U):void // define func type
}

let coordInterface:CoordInterface <number,number> = {
  calc:(x:number, y:number) => console.log(Math.pow(x,2)+Math.pow(y,2)) // define actual func
}

coordInterface.calc(2,2)


// interface
// ? option param, ?? 10 if missing
interface CoordInterfaceOptionCalc <T,U> {
  calc(x:T,y?:U):void
}

let coordInterfaceOptionCalc:CoordInterfaceOptionCalc <number,number> = {
  calc:(x:number, y:number) => console.log(Math.pow(x,2)+Math.pow(y ?? 10,2))

}

coordInterfaceOptionCalc.calc(2)

_______Header______("Interface extends");

interface CoordInterfaceExtend extends Coord,  CoordInterfaceOptionCalc <number,number> { }

let coordInterfaceExtend:CoordInterfaceExtend = {
  x:10,
  y:20,
  calc:(x, y?) => console.log(Math.pow(x,2)+Math.pow(y ?? 10,2)),
}

coordInterfaceExtend.calc(10,10)

_______Header______("Class with constructor");
class CoordClass {
  constructor(public x: number, public y: number) {} 
  add() { return this.x + this.y; }
}

// run
let CoordClass1 = new CoordClass(222, 111);
console.log(CoordClass1.add());


_______Header______("Class Extend"); // add arg in constructor and super
class CoordClassExtend extends CoordClass {
  constructor(public y: number, public x: number, public z: number) {
    super(x, y);   // super.constructor
  }
  add() { return super.add() + this.z;} // super.func
}

let CoordClassExtend1 = new CoordClassExtend(11, 333, 55);
console.log(CoordClassExtend1.add());


_______Header______("Class implements Interface");

class classImplement implements Coord {
  // implements Coord
  Origin: Coord = {
      x:2,
      y:2,
  }
  // Then config Class 
  constructor(public x:number, public y:number){}
  calc() { console.log(Math.pow(this.x-this.Origin.x,2)+Math.pow(this.y-this.Origin.y,2)) }// define actual func
}


let classImplement1 = new classImplement(5,5)
classImplement1.calc()


_______Header______("Class generic");

class TypeParameter<T = string> {
  constructor(public data: Array<T>) {}
}

// run
let C_04 = new TypeParameter(["a", "b"]);
console.log(C_04.data);

_______Header______("abstract class");


// abstract class can only be used for class extends
abstract class AbstractClass<T> {
  constructor(public val: T) {}
  abstract config(): void; // abstract functions are general and user has to defined
}

class InheritClass extends AbstractClass<number> {
  constructor() {
    super(10); // assign argument at constructor level
  }
  config() {
    console.log(this.val);
  }
}

let XX = new InheritClass();
XX.config();

_______Header______("exports modules");

module P40 {
  export class P41 {
    constructor(public x: number, public y: number) {
      this.x = x;
      this.y = y;
    }

    // func
    add(): number {
      return this.x + this.y;
    }
  }
}
