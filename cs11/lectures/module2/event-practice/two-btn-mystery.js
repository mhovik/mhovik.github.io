/*
 * Melissa Hovik
 * CSE 154
 *
 * Lecture Activity for you to check your understanding of event
 * flow. View the console in html to see if your answers to A, B, C
 * are correct!
 */
"use strict";

window.addEventListener("load", init);

function init() {
	let btn1 = document.getElementById("my-btn1");
	let btn2 = document.getElementById("my-btn2");

	btn1.addEventListener("click", responseFunction);
	console.log("bar");

	responseFunction();
}

function responseFunction() {
  console.log("foo");
}

// A. What is the output when the page loads?

// B. What is the output when the page loads and the btn1 is clicked?

// C. What is the output when the page loads and the btn2 is clicked?
