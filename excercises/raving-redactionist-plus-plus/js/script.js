/**
Raving Redactionist
Pippin Barr
You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don`t let all the
secrets become revealed!
*/

"use strict";

// Sounds
var soundMarker = new Audio('assets/sounds/marker.wav');
var soundOffice = new Audio('assets/sounds/office.mp3');
var soundSoviet = new Audio('assets/sounds/soviet.wav');

// The chance a span will be revealed per update
const REVEAL_PROBABILITY = 0.05;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;
// A place to store the jQuery selection of all secrets
let $secrets;
// Keeps score
let score = 0;
// Game over
let gameOver = false;
let removed = false;
setup();

/**
Sets the click handler and starts the time loop
*/
function setup() {
  // Save the selection of all secrets (since we do stuff to them multiple times)
  $secrets = $(`.secret`);
  // Set a click handler on the secrets (so we know when they`re clicked)
  $secrets.on(`click`, redact);
  // Set an interval of 500 milliseconds to attempt the revelation of secrets
  setInterval(revelation, UPDATE_FREQUENCY);

  // Loops audio
  soundOffice.play();
  soundOffice.loop = true;
};

/**
When a secret is clicked we remove its revealed class and add the redacted class
thus blacking it out
*/
function redact() {
  if ($(this).hasClass(`revealed`)
  && $(this).css("opacity") > .025) {
    soundMarker.play();
    score += 1;

    $(this).removeClass(`revealed`);
    $(this).addClass(`redacted`);

    if ($(this).hasClass('animation')) {
      $(this).removeClass('animation');
    }
  }
}

/**
Update is called every 500 milliseconds and it updates all the secrets on the page
using jQuery`s each() function which calls the specified function on _each_ of the
elements in the selection
*/
function revelation() {


  // Ineraction
  if (gameOver == false) {
    $secrets.each(attemptReveal);

    // Updates score
    document.getElementById('score').innerHTML = "Score: " + score;

  // Displaying game over
  } else {
    if (removed == false){
      removed = true;
      document.getElementById('game-over').style.visibility = "visible";
      document.getElementById("game-over-score").innerHTML = String("Score: " + score);
      document.getElementById('top-secret-document').remove();

      // Game over music
      soundSoviet.play();
    }
  }
}

/**
With random chance it unblanks the current secret by removing the
redacted class and adding the revealed class. Because this function is called
by each(), "this" refers to the current element that each has selected.
*/
function attemptReveal() {

  // Game Over
  if ($(this).css("opacity") < 0.025) {
    gameOver = true;
  }

  // Reveals words
  let r = Math.random();
  if (r < REVEAL_PROBABILITY && $(this).hasClass('removed') == false) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);

    // Removes the text if you are out of time
    if ($(this).hasClass('animation') == false) {
      $(this).addClass('animation');
    }
  }
}
