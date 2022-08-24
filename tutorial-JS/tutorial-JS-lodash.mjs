import _ from "lodash";

let temp;
let tempList = [];
let object;
let x = [1, 2, 3];

_______Header______("Lodash orderBy");

let users = [
  { user: "fred", age: 48 },
  { user: "barney", age: 34 },
  { user: "fred", age: 40 },
  { user: "barney", age: 36 },
];

console.log(_.orderBy(users, ["user", "age"], [ "asc","desc",]));

_______Header______("Lodash get for nested ite");

x = [
  { user: { first: "Johnny", last: "Tan" } },
  { user: { first: "Mary", last: "Lim" } },
];

// pick
temp = _.pick(x[0]["user"], ["last"]);
console.log(temp); // { last: 'Tan' }

// get one
console.log(_.get(x[0], "user.first"));

// get all
let columns = ["user.first", "user.last"];

x.map((item) =>
  columns.map((col) => {
    temp = _.get(item, col);
    console.log(temp);
  })
);

_______Header______("Lodash item, slice, take");
x = [1, 2, 3, 4, 5, 6, 7];
temp = _(x).slice(1, 5).take(2).value();
console.log(temp); // slice index 1-4 > Take first 2 items

_______Header______("Lodash range");
console.log(_.range(1, 5));

_______Header______("update");

function updator(x) {
  return x * x;
}

temp = { a: [{ b: { c: 3, d:4 } }] };
 _.update(temp,'a[0].b.c',updator)

console.log(temp.a[0].b.c);




// header
function _______Header______(params) {
  params = params.toUpperCase()
  console.log(`--------------- ${params} `);
}