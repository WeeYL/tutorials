// PRODUCTIVITY FUNCTIONS
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function pp(x) {
    console.log(x);
}
function Header(params) {
    params = params.toUpperCase();
    console.log("--------------- ".concat(params, " "));
}
// TYPES
Header("type");
var TypeUnion1 = "TypeUnion";
pp(TypeUnion1);
var TypeUnion2 = 1000;
pp(TypeUnion2);
var TypeUnionExact1 = "is-num";
pp(TypeUnionExact1);
var input; // input is of unknown type
// TYPE EXTEND
Header("type extend");
var employee01; // alternative employee01: Employee
employee01 = {
    access: ["server", "password"],
    name: "YL"
};
pp(employee01);
Header("enum");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READONLY"] = 1] = "READONLY";
})(Role || (Role = {}));
pp(Role.ADMIN);
pp(Role.READONLY);
Header("function implement");
function fi1(k) {
    pp(k);
} // classic
var fi2 = function (k) { return pp(k); }; // fat arrow
var fi3; // assign a function type
var fiadd = function (k, v) {
    return k + v;
};
fi3 = fiadd; // assign the function
fi3(3, 5);
fi1(10);
fi2(100);
pp(fi3(3, 5));
Header("function callback");
// add a callback function type as an argument
function handler(k, v, callback) {
    pp(v);
    return callback(k); // runs callback runs
}
var fcb_sq = function (k) { return pp(k * k); };
var fcb_sqrt = function (k) { return pp(Math.sqrt(k)); };
handler(4, "square root of 4", fcb_sqrt);
handler(3, "square of 3", fcb_sq);
Header("function rest");
// convers args into array
function fRest() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    var value = props.reduce(function (prev, cur) {
        return prev + cur;
    });
    return value;
}
var fRestres = fRest(11, 21, 31);
pp(fRestres);
Header("function generic");
function fg01(arr) {
    pp(arr);
}
fg01(["a", "b", "c"]);
Header("function from interface");
Header("interface");
var user01 = { name: "yl", age: 11 }; // option
var user02 = { name: "leon", age: 12 }; // option
var fri01 = function (user) { return pp("".concat(user.name, " is ").concat(user.age)); };
fri01(user01);
fri01(user02);
var I_num_array = { arr: ["abc", "def"] };
pp(I_num_array);
var IfuncPrint = {
    age: 10,
    print: function (name, weight) { return pp("".concat(name, " is of age ").concat(weight !== null && weight !== void 0 ? weight : 60)); }
};
IfuncPrint.print("yl", 100);
IfuncPrint.print("yl"); // optional chaining
pp(IfuncPrint.age);
var I_func_generic01 = {
    log: function (name, id) { return pp("id: ".concat(id, " \nname: ").concat(name)); }
};
I_func_generic01.log("jam", 1001);
var I_extends01 = {
    age: 10,
    print: function (name) { pp("I_extends ".concat(name)); },
    log: function (name, id) { return pp("I_extends id: ".concat(id, " \nname: ").concat(name)); }
};
I_extends01.log("yl", 10);
I_extends01.print("leon");
var I_extends_C01 = {
    weight: 100,
    name: "yl",
    disp: function (weight, name) { pp("I_extends_C01 ".concat(weight, " ").concat(name)); }
};
I_extends_C01.disp(120, "yl");
Header("class");
// CLASS WITH CONSTRUCTOR
var Person = /** @class */ (function () {
    function Person(age, name) {
        this.age = age;
        this.name = name;
    }
    Person.prototype.disp = function () { return " ".concat(this.name, " of age ").concat(this.age); };
    return Person;
}());
var ClassWithConstructor01 = new Person(13, 'yl');
pp("ClassWithConstructor: ".concat(ClassWithConstructor01.disp()));
// CLASS EXTENSION
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer(age, name, role) {
        var _this = _super.call(this, age, name) // note: must be in the same order as constructor
         || this;
        _this.role = role;
        return _this;
    }
    return Engineer;
}(Person));
var engineer = new Engineer(10, "yl", "engineer");
engineer.disp();
var CL_ID = /** @class */ (function () {
    function CL_ID(id) {
        this.id = id;
        this.my_id = { id: 0 }; // implements id
    } // add id to constructor
    CL_ID.prototype.disp = function () { pp("CLASS IMPLEMENT INTERFACE: id is ".concat(this.id, " my_id is ").concat(this.my_id.id)); };
    return CL_ID;
}());
var CL_ID01 = new CL_ID(101);
CL_ID01.disp();
var CL_ID_Generic = /** @class */ (function () {
    function CL_ID_Generic(id) {
        this.id = id;
        this.my_id = { id: 1 };
    }
    CL_ID_Generic.prototype.disp = function () { pp("CLASS IMPLEMENT INTERFACE: id is ".concat(this.id, " my_id is ").concat(this.my_id.id)); };
    return CL_ID_Generic;
}());
var CL_ID_Generic01 = new CL_ID_Generic(90);
CL_ID_Generic01.disp();
