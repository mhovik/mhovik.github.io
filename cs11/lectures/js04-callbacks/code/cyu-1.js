console.log("Foo 1");

window.addEventListener("load", init);

function init() {
   setTimeout(testFunction, 1000);
   console.log("Foo 2");
}

function testFunction() {
   console.log("Foo 3");
}

console.log("Foo 4");
