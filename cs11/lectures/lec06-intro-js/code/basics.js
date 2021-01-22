/*
 * Example code from Introduction to JavaScript Slides
 * Note: As we'll see Monday, it's best to use what we call the "module pattern" to wrap
 * our JS code in an anonymous function that execute when the page
 * loads. This example code is just to provide something you can play with at home in your browser.
 */

// Console.log outputs a single line to the console.
console.log("Your console says hi!");

/*
 * (uncomment to see alert on page refresh!)
 *   - we use the alert statement to alert, or "pop up" a message on the page
 *   - useful when debugging, but can be annoying to users in practice (hence it being commented
 *     here)
 */
//alert("Your browser says hi!");

/*
 * Slide 18 (look in your console to see the message!)
 *   - We use the console.log statement to log a message to the browser's console, viewable
 *     in the browser's dev tools
 *   - much more common as a debugging strategy in practice! Not seen by users unless they
 *     view the console
 */
console.log("The answer is: " + 42);

/*
 * Slide 20: Declaring variables with the let keyword
 */
let level = 23;
let accuracyRate = 0.99; // use camelCasing for multi-word JS variable names (similar to Java)
let name = "Pikachu";    // can also use single-quotes for Strings

/*
 * Constants
 */
let month = 12;
month = 1; // no error

const COOLEST_CLASS = "CSE154";
// COOLEST_CLASS = "clazz"; // uncomment to see error!

/*
 * Numbers
let enrollment = 99;
let medianGrade = 2.8;
let credits = 5 + 4 + (2 * 3);
 */

/*
 * Strings
let nickName = "Sparky O'Sparkz";                  // "Sparky O'Sparks"
let fName = nickName.substring(0, s.indexOf(" ")); // "Sparky"
let len = nickName.length;                         // 15
let name = 'Pikachu';                              // can use "" or ''
 */
