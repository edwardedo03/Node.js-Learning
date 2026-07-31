let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 1 resolve");
  }, 6000);
});

function promise2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise 2 resolve");
    }, 3000);
  });
}

promise1
  .then((successMessage) => {
    console.log("from callback " + successMessage);
    return promise2();
  })
  .then((successMessage) => {
    console.log("from callback " + successMessage);
  });
