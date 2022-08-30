/*  */
console.log("before");
setTimeout(() => {
  console.log("hello after 0.5 sec");
}, 500);
console.log("after");

setTimeout(() => console.log(`\n-----callback-----`), 2000);

/* callbacks 
getUser( specify variable, specify callback handler)  
Function getUser( returns variable, returns callback listener) { runs the callback() }
*/

// variables
const userDB = { id: 1, name: "YL" };
const usernameDB = "YL";
const repoDB = ["repo1", "repo2", "repo3"];
const commitsDB = ["commitsDB"];
const timer = 1000;

// callback listener (function)
function getUser(id, callback) {
  setTimeout(() => callback(userDB), timer);
}

function getRepo(usernameDB, callback) {
  setTimeout(() => callback(repoDB), timer);
}

function getCommits(repoDB, callback) {
  setTimeout(() => callback(commitsDB), timer);
}

// callback listener
getUser(1, function callback(userDB) {
  console.log(userDB);
});

getRepo(userDB.name, function callback(repoDB) {
  console.log(repoDB);
});

getCommits(repoDB, function callback(commitsDB) {
  console.log(commitsDB);
});

// Timeout function callback

function timeOut(t, callback) {
  setTimeout(() => {
    callback();
  }, t);
}
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

p.then((r) => console.log(r * 10));

// callback function with arg
let pp = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(arg);
  }, 1000);
});

// handle
const arg = "timeOut";
pp.then((arg) => console.log(arg));
