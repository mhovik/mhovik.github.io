function doubleAfter1s(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n * 2);
    }, 1000);
  });
}

/*
doubleAfter1s(2) // 4
  .then(doubleAfter1s) // 8
  .then(doubleAfter1s) // 16
  .then(result => console.log(result)); // 16
*/

(async () => {
  let a = await doubleAfter1s(2); // 4
  let b = await doubleAfter1s(a); // 8
  let c = await doubleAfter1s(b); // 16
  console.log(c); // 16
})();

function doubleAfter1sUnless4(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n === 4) {
        reject("Rejected!");
      } else {
        resolve(n * 2);
      }
    }, 1000);
  });
}

async function delayDoubles() {
  try {
    let a = await doubleAfter1sUnless4(2); // 4
    let b = await doubleAfter1sUnless4(a); // error!
    let c = await doubleAfter1sUnless4(b); // unreached
  } catch (err) {
    console.error(err); //  "Rejected!"
  }
}

delayDoubles();
console.log("After async delayDoubles() call");

// delayDoubles1();

function delayMsg(msg, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(msg + " after " + delay + "ms");
      } else {
        reject("Message " + msg + " failed");
      }
    }, delay);
  });
}

async function asyncTasks() {
  let startMsg = await delayMsg("Hello", 1000);
  let finalMsg = await delayMsg(startMsg + " and goodbye", 2000);
  console.log(finalMsg);
}
