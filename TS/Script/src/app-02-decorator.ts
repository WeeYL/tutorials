import {_______Header______} from "./utils"


_______Header______("constructor");
class CKV {
  k = "max";
  constructor() {
    console.log("creating...");
  }
}

let kv1 = new CKV(); // console.log is exe once new is introduced

_______Header______("decorator over class");

function decorator(myString: string) {
  // _ means pass, do not do exe the class below, exe on its own
  return function (_: Function) {
    console.log(myString);
  };
}

// run
@decorator("hello")
class CKV1 {
  k = "max";
  constructor() {
    console.log("creating...");
  }
}

_______Header______("decorator return decorator");

function logging2(myString: string) {
  return function (constructor: Function) {
    console.log(myString); // returns args from the decorator
    // console.log(constructor);
  };
}
@logging2("decorator factory")
class CKV2 {
  k = "max";
  constructor() {
    console.log("creating...");
  }
}
// runs
kv1 = new CKV2();

_______Header______("decorator runs escape function _");

// decorator must be placed above a class

function withTemplate(template: string, id: string) {
  // _: Function means not used to invoke class below
  return function (_: Function) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = template;
    }
  };
}

@withTemplate("hello", "app") // display in html
class CKV3 {
  k = "max";
  constructor() {
    console.log("creating...");
  }
}

// runs
// kv1 = new CKV3()


_______Header______("decorator html");

function withTemplate2(template: string, id: string) {
  return function (constructor: any) {
    const el = document.getElementById(id);
    const p = new constructor();
    if (el) {
      el.innerHTML = template;
      el.querySelector("p")!.innerHTML = "paragraph";
    }
  };
}

@withTemplate2("<p>string</p>", "app2")
class CKV4 {
  k = "max";
  constructor() {
    console.log("creating...");
  }
}

_______Header______("multi decorator");

function multi1(myString: string) {
  return function (constructor: Function) {
    console.log(myString);
  };
}

function multi2(myString: string) {
  return function (constructor: Function) {
    console.log(myString);
  };
}

// init from bottom up
@multi1("Multi-1")
@multi2("Multi-2")
class MultiClass {
  constructor(public name: string, public id: number) {
    console.log(this.id + " of " + this.name);
  }
}

const MC01 = new MultiClass("YL", 111);

_______Header______("property decorator");

function log1(target: any, propertyName: string ) {
  console.log("Property Decorator : ");
  console.log(`target:${target} propertyName: ${propertyName}`);
  console.log("---------------");
}

function log2(
  target: any,
  method_accessor_Name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Method / accessor Decorator : ");
  console.log(`target:${target} method_accessor_Name: ${method_accessor_Name}`);
  console.log("descriptor:", descriptor);
  console.log("---------------");
}
function log3(
  target: any,
  method_accessor_Name: string,
  position: number
) {
  // position is the index position of the method
  console.log("Param Decorator : ");
  console.log(
    `target:${target} method_accessor_Name: ${method_accessor_Name} position:${position}`
  );
  console.log("---------------");
}

class Product {
  @log1
  title: string;
  private _price: number; // used for calc

  constructor(_price: number, title: string) {
    this.title = title;
    this._price = _price;
  }

  // used for price setting
  @log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("no negative price");
    }
  }

  @log2
  getPriceWithTax(@log3 tax: number) {
    return this._price * (1 + tax);
  }
}

const newProduct01 = new Product(10, "new 01");
console.log(newProduct01.getPriceWithTax(0.1));
newProduct01.price = 15;
console.log(newProduct01.getPriceWithTax(0.1));





