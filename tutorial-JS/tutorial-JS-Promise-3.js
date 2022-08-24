/* promise resolve catch */
_______Header______("promise resolve catch");

const p1 = Promise.resolve({ id: 1 }); // resolve then
p1.then((r) => console.log(r));

const p2 = Promise.reject(new Error("error ...")); // reject catch
p2.catch((err) => console.log(err));
p2.catch((err) => console.log(err.message));

/* promise Parallel */
setTimeout(() => _______Header______("promise all parallel"), 1000); // 

const p3 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 3");
        resolve(3);
    }, 1000);
});
const p4 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 4");
        resolve(4);
    }, 1000);
});


Promise.all([p3, p4]).then((n) => {
  _______Header______("return resolved values");
  console.log(n);
}); // returns [3,4]

setTimeout(() => _______Header______("promise parallel reject"), 1500);

const p5 = new Promise((reject) => {
  setTimeout(() => {
    console.log("Async operation 5 resolved");
    reject(new Error("Error ..."));
  }, 1500);
});
const p6 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 6 error");
    resolve(6);
  }, 1500);
});

Promise.all([p5, p6])
  .then((result) => {
    _______Header______("Return reject if one fails");
    console.log(result);
  })
  .catch((err) => err.message); // shows resolve and reject



  setTimeout(() => _______Header______("promise race "), 2000);

  const p7 = new Promise((reject) => {
    setTimeout(() => {
      console.log("Async operation 7 resolved");
      reject(new Error("Error ..."));
    }, 2000);
  });
  const p8 = new Promise((resolve) => {
    setTimeout(() => {
      console.log("Async operation 8 error");
      resolve(8);
    }, 2000);
  });

Promise.race([p7, p8])
  .then((result) => {
    _______Header______("return resolved and ignore reject");
    console.log(result);
  })
  .catch((err) => err.message); // shows resolved ignore reject





// header
function _______Header______(params) {
  params = params.toUpperCase();
  console.log(`-------------------- ${params} `);
}
