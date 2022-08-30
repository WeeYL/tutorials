/* promise resolve and reject 


*/

// variables
const userDB = { id: 1, name: "YL" };
const usernameDB = "YL";
const repoDB = ["repo1", "repo2", "repo3"];
const commitsDB = ["commitsDB"];
const timer = 1000;

/* Promise */
setTimeout(() => console.log(`\n-----promise-----`), 1500);

// resolve
let p_resolve = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("result");
  }, 1000);
});

p_resolve
  .then((result) => console.log("result: ", result))
  .catch((err) => console.log("Error", err.message));

// error
let p_error = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("error message"));
  }, 1000);
});

p_error
  .then((result) => console.log("result: ", result))
  .catch((err) => console.log("Error", err.message));

// refactor: replace 'callback' with 'resolve'

/* function that returns new Promise
use then to map to see result 

*/

function getUserP(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(userDB), 1500);
  });
}

function getRepoP(usernameDB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(usernameDB);
      resolve(repoDB);
    }, 1500);
  });
}

function getCommitsP(repoDB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling Repo");
      resolve(commitsDB);
    }, 1500);
  });
}

// eg1
const pp = getUserP(1); // resolve the userDB
pp.then((userDB) => console.log(userDB));

// eg2, place in sequence of resolved object
getUserP(1) // userDB is resolved, send userDB to next
  .then((userDB) => getRepoP(userDB.name)) // repoDB is resolved, send repoDB to next
  .then((repoDB) => getCommitsP(repoDB[0])) // commitsDB is resolved, send commitsDB to next
  .then((commitsDB) => console.log(commitsDB))
  .catch((err) => console.log(err.message));

// eg3 

function getName(name) {
  return new Promise((res,rej)=>{
    if (name=="leon"){
      res(name)
    } else {
      rej(new Error ("error not leon"))
    }
  })
}

// let leon = getName("leon1") // uncomment to see error
let leon = getName("leon")

leon
.then(()=>{console.log("correct, it's leon")})
.catch((err)=>{console.error(err.message)})
