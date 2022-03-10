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

// The chance a span will be revealed per update
const REVEAL_PROBABILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;
// A place to store the jQuery selection of all secrets
let $secrets;




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
  if ($(this).hasClass('removed') == false && $(this).hasClass(`revealed`)) {
    soundMarker.play();
    $(this).removeClass(`revealed`);
    $(this).addClass(`redacted`);

    if ($(this).hasClass('fade-out')) {
      $(this).removeClass('fade-out');
    }
  }
}

/**
Update is called every 500 milliseconds and it updates all the secrets on the page
using jQuery`s each() function which calls the specified function on _each_ of the
elements in the selection
*/
function revelation() {
  $secrets.each(attemptReveal);


}

/**
With random chance it unblanks the current secret by removing the
redacted class and adding the revealed class. Because this function is called
by each(), "this" refers to the current element that each has selected.
*/
function attemptReveal() {
  let r = Math.random();
  if (r < REVEAL_PROBABILITY) {
    if ($(this).hasClass('removed') == false) {
      $(this).removeClass(`redacted`);
      $(this).addClass(`revealed`);

      // Removes the text if you are out of time
      $(this).delay(4000).queue(function() {  // Wait for 6 seconds
        if ($(this).hasClass('removed') == false && $(this).hasClass('fade-out') == true) {
          $(this).removeClass("fade-out").dequeue();
          $(this).removeClass("revealed").dequeue();
          $(this).addClass("removed").dequeue();
        }
      });
    }
  }
  // Fades out the text
  if ($(this).hasClass('fade-out') == false
  && $(this).hasClass('removed') == false
  && $(this).hasClass('revealed') == true) {
    $(this).addClass(`fade-out`);
  }

}