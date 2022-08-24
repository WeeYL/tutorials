// variables
const userDB = { id: 1, name: "YL" };
const usernameDB = "YL";
const repoDB = ["repo1", "repo2", "repo3"];
const commitsDB = ["commitsDB"];

// promise function
/* 
function P returns new Promise to resolve
function result awaits P()
*/
function getUserP(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(userDB), 1000);
  });
}

function getRepoP(usernameDB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(usernameDB);
      resolve(repoDB);
    }, 1000);
  });
}

function getCommitsP(repoDB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling Repo");
      resolve(commitsDB);
    }, 1000);
  });
}

// simulate error
function rejectCommitsP(repoDB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling Repo");
      reject(new Error("commitsDB not found"));
    }, 1000);
  });
}

// Async function
_______Header______("Async");

async function displayResult() {
  const userDB = await getUserP(1);
  const repoDB = await getRepoP(userDB.name);
  const commitsDB = await getCommitsP(repoDB[0]);
  console.log(commitsDB);
}

async function displayError() {
  try {
    const userDB = await getUserP(1);
    const repoDB = await getRepoP(userDB.name);
    const commitsDB = await rejectCommitsP(repoDB[0]);
    console.log(commitsDB);
  } catch (err) {
    console.log("error", err.message);
  }
}

// result. uncomment to see result
// displayResult()
displayError();


const p = new Promise((resolve, reject) => {
  resolve("result");
});
p.then((result) => console.log("result: ", result)).catch((err) =>
console.log("Error", err.message)
);


// header
function _______Header______(params) {
  params = params.toUpperCase();
  console.log(`-------------------- ${params} `);
}