async function sayHello(name) {
  return name + " ";
}

function example() {
  sayHelloPromise("foo")
    .then(sayHelloPromise)
    .then(sayHelloPromise)
    .then(sayHelloPromise)
    .then(sayHelloPromise)
    .then(console.log);
}

function sayHelloPromise(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello " + name);
    }, 1000);
  });
}

example();
//let msg = sayHello("dubs").then(console.log).catch(console.error);
//console.log(sayHello("dubs"));
