

_______Header______("validate interface function");

// set interface
interface IG_getMinMax {
  v: number;
  min: number;
  max: number;
}

// function
function F_enterValue(n: number) {
  return n;
}
function F_getMinMax(num: IG_getMinMax) {
  if (num.v >= num.min && num.v <= num.max) {
    return true;
  } else {
    return false;
  }
}

// validate result
let V_08 = F_enterValue(10);
let V_09 = <IG_getMinMax>{
  v: V_08,
  min: 1,
  max: 12,
};

console.log(F_getMinMax(V_09));


_______Header______("user class and listener list");
/* 
create an instance of class with static
addListener - takes in fn and adds fn to the listeners list
addUser - run each fn in the listeners list

*/


class User {
  constructor(public k: string, public v: number) {}
  private listeners: Function[] = [];

  getUserDetail() {

    for (let fn of this.listeners) {
      fn();
    }
  }

  // run each function in listener
  addListeners(fn: Function) {
    this.listeners.push(fn);
  }
}

let userState = new User("yl", 10);
userState.addListeners(()=> console.log(userState.k));
userState.addListeners(()=> console.log(userState.v))
userState.getUserDetail()






function _______Header______(params: any) {
  params = params.toUpperCase();
  console.log(`--------------- ${params} `);
}
