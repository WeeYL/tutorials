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
type listener = (arg: Function) => void;

function reusableType(n4: TypeUnion, n5: TypeUnion, result: TypeUnionExact) {
  console.log(n4, n5, `conversion: ${result}`);
}

reusableType(10, "ten", "is-num"); // ok

_______Header______("type Extend");

type Access = { access: string[] };
type EmpName = { empName: string };
type Employee = Access & EmpName;

let emp_155: Employee = { empName: "YL", access: ["server", "password"] };
console.log(emp_155);

_______Header______("let unknown");
let input: unknown; // input is of unknown type


input = "YL";
let usernameAny: any = input; // OK
let usernameString: string = input; // doesn't permit any type 
let usernameBoolean: boolean = input; // doesn't permit any type 

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
handler(10, 11, function (res) {
  console.log(res);
});

_______Header______("function rest");

// ...props converts numbers to array

function F_rest(...props: number[]) {
  const res = props.reduce((prev, cur) => {
    return prev + cur;
  });

  return res;
}

// run
console.log(F_rest(99, 12, 33, 74));

_______Header______("Function generic");

function FG_01<T>(num: T[]): void {
  console.log(num);
}

// run
FG_01<number>([1000, 2000]);

_______Header______("function from interface");

interface I_user {
  k?: string;
  v?: number;
}

function F_09(user: I_user) {
  console.log(`${user.k} ${user.v}`);
}

let user = {
  k: "run",
  v: 15,
};
F_09(user);

_______Header______("Interface");
// interface is the contract that the type, function, class has to follow

// interface
interface I_num {
  num: number;
}

let V_01: I_num = { num: 1 };
console.log(V_01);

// interface
interface G_num<T> {
  num: T;
}

let V_02: G_num<number> = { num: 1 };
console.log(V_02);

_______Header______("Interface function");

// interface
interface I_move {
  v?: number;
  move(k: string, v?: number): void;
}
let V_03: I_move = {
  v: 100,
  move: (k: string, v?: number) => {
    console.log(`${k} runs `, v ?? 10); // if empty then 10
  },
};

// run
V_03.move("donny");

// interface
interface G_move<T, U> {
  move(k: T, v?: U): void;
}

let V_04: G_move<string, number> = {
  move: (k: string, v: number) => {
    console.log(`${k} runs`, v ?? 10);
  },
};

// run
V_04.move("Donnie", 100);

_______Header______("Interface extends");

interface I_num_move extends I_num, I_move {}
let V_05: I_num_move = {
  num: 9,
  move(k) {
    console.log(k);
  },
};

// run
console.log(V_05.num);
V_05.move("bob");

// have to specify all 3 types
interface G_num_move<N, S> extends G_num<N>, G_move<S, N> {}

let V06: G_num_move<number, string> = {
  num: 99,
  move(v: string, k: number) {
    console.log(`${v} moves ${k}`);
  },
};

// run
console.log(V06.num);
V06.move("bob", 99);

_______Header______(" generic Interface function");

function F_02<T>(num: T): T {
  return num;
}

interface Generic_type<T> {
  (arg: T): T;
}

let V_07: Generic_type<number> = F_02; // T is defined
console.log(V_07(12));

_______Header______("Class without constructor");
class C_wo_constr {
  x: number;
  disp() {
    console.log(this.x);
  }
}

// run
let C_01 = new C_wo_constr();
C_01.x = 111;
C_01.disp();

_______Header______("Class with constructor");
class C_w_constr {
  constructor(public x: number, public y: number) {}
  add2() {
    return this.x + this.y;
  }
}

// run
let C_02 = new C_w_constr(222, 111);
console.log(C_02.add2());

_______Header______("Class extends class"); // add arg in constructor and super
class C_w_constr_02 extends C_w_constr {
  constructor(public y: number, public x: number, public z: number) {
    super(x, y);
  }
  add3() {
    // run and return extended class result
    return super.add2() + this.z;
  }
}

let C_03 = new C_w_constr_02(11, 333, 55);
console.log(C_03.add3());

_______Header______("Class implements Interface");

// class
class CI_num implements I_num {
  addTen: I_num ={
    num:10
  }
  constructor(public num: number) {}
  disp() {
    console.log(this.num+ this.addTen.num);
  }
}

// run
let V07 = new CI_num(100);
V07.disp();

// class
class CG_num<T = number> implements G_num<T> {
  addTen:G_num<number>={
    num:10
  }
  constructor(public num: T) {}
  disp() {
    const n = this.num
    const m = this.addTen.num
    console.log(n+m);
  }
}

// run
let V08 = new CG_num(100);
V08.disp();

_______Header______("Class generic");

class TypeParameter<T = string> {
  constructor(public data: Array<T>) {}
}

// run
let C_04 = new TypeParameter(["a", "b"]);
console.log(C_04.data);

_______Header______("abstract class");


// abstract class can only be used for class extends
abstract class AbstractClass<T extends number> {
  constructor(public val: T) {}
  abstract config(): void; // abstract functions are general and user has to defined
}

class InheritClass extends AbstractClass<number> {
  constructor() {
    super(10); // assign argument
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

// export class C_05 {
//   constructor(public id: number, ) {}
//   printDetails() {
//     console.log(`${this.id}`);
//   }
// }

/* 
// test.js 
// cmd > node dist/test.js

import { C_05} from "./app-01";
let X = new C_05(10);
X.printDetails() */

// new
let P42 = new P40.P41(33, 22).add();
console.log("new ", P42);

// import
import P43 = P40;
let P44 = new P43.P41(33, 22).add();
console.log("import ", P44);

function _______Header______(params: any) {
  params = params.toUpperCase();
  console.log(`--------------- ${params} `);
}
