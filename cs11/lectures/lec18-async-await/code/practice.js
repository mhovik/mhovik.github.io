function onSuccess(arg) {
  console.log("Success! " + arg);
}

function onError(arg) {
  console.log("error " + arg);
}

const aPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve(10);
    } else {
      reject(5);
    }
  }, 1000);
});

// aPromise.then(onSuccess).catch(onError);
function task1() {
  setTimeout(() => {
    console.log("Task 1 finished! (1s task)");
  }, 1000);
}

function task2(arg) {
  setTimeout(() => {
    console.log("Task 2 finished! (4s task)");
    console.log(arg);
  }, 4000);
}

function task3() {
  setTimeout(() => {
    console.log("Task 3 finished! (2s task)");
  }, 2000);
}

//task1();
//task2();
//task3();

function task1Promise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Task 1 finished! (1s task)");
      res();
    }, 1000);
  })
}

async function taskPromise() {
  setTimeout(() => {
    console.log("Task 1 finished! (1s task)");
    return "Task 1 finished";
  }, 1000);
}

function task2Promise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Task 2 finished! (4s task)");
      res();
    }, 4000);
  })
}

function task3Promise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Task 3 finished! (2s task)");
      res();
    }, 2000);
  })
}

let tasks = taskPromise()
  .then(task2)
  .then(task3)
  .catch(console.log);

async function sayHello(name) {
  return "Hello " + name;
}

sayHello("dubs").then(console.log);


// Examples with fetch
