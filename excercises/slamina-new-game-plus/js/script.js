"use strict";

/*****************
Slamina
Pippin Barr
A guessing game in which the page pronounces the name of an animal
backwards and the user has to figure out what it was and say the
name forwards.
******************/

// An array of animal names from
// https://github.com/dariusk/corpora/blob/master/data/animals/common.json
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

const QUESTION_DELAY = 2000; // in milliseconds

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer;//= `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;

// Game state
let state;

// Score
let score;
let correct = false;
let incorrect = false;

// Timer
let timer;
let maxTimer = 800;

/*Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  state = 'menu';
  score = 0;

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      'I think it is *animal': guessAnimal
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  // Text defaults
  textFont('helvetica');
  // textStyle(NORMAL);
  textSize(102);
  textAlign(CENTER);
}


/**
Display the current answer.
 */
function draw() {
  background(0);

  // Main menu
  if (state === 'menu') {
    push();
    textStyle(BOLD);
    fill(255);
    textSize(136);
    text("Slamina", width / 2, height * .48);

    textStyle(NORMAL);
    textSize(32);
    text("The animal guessing game", width / 2, height * .52);
    pop();

  // Simulation
  } else if (state === 'simulation') {

    // Timer
    if (correct == false) {
      timer = max(timer - 1, 0);
    }
    // if (timer % 60 == 0){
    //   beep.play();
    // }
    // if (timer <= 0){
    //   // gameOverSound.play();
    //   state = 'gameOver';
    // }

    // Updates and displays the answer
    displayAnswer();

    // Draws words
    push();
    fill(255);
    textSize(32);
    text("Guess the reversed animal name with your voice", width * .5, height * .95);
    text("Score: " + score, width * .075, height * .075);
    pop();

    // Draws timer bar
    push();
    noStroke();
    rectMode(CORNER);
    rect(0,height-25, width * (timer/maxTimer), 25);
    pop();
  }
}


/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {
  push();
  // If the answer is correct
  if (currentAnswer === currentAnimal && incorrect == false) {
    // Adds to the score
    if (correct == false) {
      correct = true;
      score += 1;
      timer = 0;
    }
    fill(0, 255, 0);
  }
  // If you run out of time
  else if (timer <= 0) {
    incorrect = true;
    currentAnswer = currentAnimal;
    fill(255, 0, 0);
  // If you answer wrong
  } else {
    fill(255, 0, 0);
  }

  textStyle(BOLD);
  text(currentAnswer, width / 2, height / 2);
  pop();
}

/**
Reverse the animal name and say it with ResponsiveVoice
*/
function sayAnimalBackwards(animal) {
  let reverseAnimal = reverseString(animal);
  responsiveVoice.speak(reverseAnimal);
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

/**
Called by annyang when the user make a guess.
animal parameter contains the guess as a string.
Sets the answer text to the guess.
*/
function guessAnimal(animal) {
  // Convert the guess to lowercase to match the answer format
  currentAnswer = animal.toLowerCase();
}

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
  currentAnswer = ``;
  currentAnimal = random(animals);
  sayAnimalBackwards(currentAnimal);
  timer = maxTimer;

}

/**
When the user clicks, go to the next question
*/
function mousePressed() {

  // Changes states
  if (state === 'menu') {
    state = 'simulation';
    timer = maxTimer;
    console.log(1);

  } else if (state === 'simulation') {
    nextQuestion();
    incorrect = false;
    correct = false;
  }
}
