let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 1 resolve");
  }, 6000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 2 resolve");
  }, 3000);
});

promise1.then((successMessage) => {
  console.log("from callback " + successMessage);
  return promise2();
});

promise2.then((successMessage) => {
  console.log("from callback " + successMessage);
});
