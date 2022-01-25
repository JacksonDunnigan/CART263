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
let guessed = false;

// Timer
let timer;
let maxTimer = 800;

// Sound
let soundTick;
let soundVictory;
let soundGameOver;
let soundBeep;
let soundWrong;


// Loads the sounds
function preload(){
  soundTick = loadSound('assets/sounds/tick.wav');
  soundVictory = loadSound('assets/sounds/victory.mp3');
  soundGameOver = loadSound('assets/sounds/gameOver.mp3');
  soundBeep = loadSound('assets/sounds/beep.wav');
  soundWrong = loadSound('assets/sounds/wrong.wav');
  soundTick.setVolume(0.15);
  soundVictory.setVolume(0.3);
  soundGameOver.setVolume(0.3);
  soundBeep.setVolume(0.3);
  soundWrong.setVolume(0.3);
}

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
      'I think it is *animal': guessAnimal,
      'I think it is a *animal': guessAnimal,
      'I think its *animal': guessAnimal,
      'I think its a *animal': guessAnimal,
      'is it an *animal': guessAnimal,
      'is it a *animal': guessAnimal

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
    if (timer % 60 == 0 && timer > 0){
      soundTick.play();
    }
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

  // If the answer is correct
  if (currentAnswer === currentAnimal && incorrect == false) {
    // Adds to the score
    if (correct == false) {
      soundVictory.play();
      correct = true;
      score += 1;
      timer = 0;
    }
    push();
    textStyle(BOLD);
    fill(255);
    text("I think it is ________", width / 2, height / 2);
    fill(0, 255, 0);
    text(currentAnswer, width *.68, height / 2);
    pop();
  }

  // If you run out of time
  else if (timer <= 0) {
    if (incorrect == false) {
      soundGameOver.play();
    }
    incorrect = true;
    currentAnswer = currentAnimal;
    push();
    fill(255);
    textSize(32);
    text('The correct word was', width/2, height*.4);
    fill(255, 0, 0);
    textSize(88);
    textStyle(BOLD);
    text(currentAnimal, width/2, height/2);
    pop()

  // If you answered wrong
  } else if (currentAnswer !== ``) {
    if (guessed == false){
      guessed = true;
      soundWrong.play();
    }
    push();
    textStyle(BOLD);
    fill(255);
    text("I think it is ________", width / 2, height / 2);
    fill(255, 0, 0);
    text(currentAnswer, width *.68, height / 2);
    pop();
  }

  // If you havent answered yet
  else {
    push();
    textStyle(BOLD);
    fill(255);
    text("I think it is ________", width / 2, height / 2);
    pop();
  }
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
  guessed = false;
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

// Functionality to mouse clicking
function mousePressed() {
  soundBeep.play();

  // Changes states
  if (state === 'menu') {
    nextQuestion();
    state = 'simulation';
    timer = maxTimer;
    // console.log(1);

  } else if (state === 'simulation') {

    // Goes to the next question if answered correctly
    if (incorrect == true || correct == true) {
      nextQuestion();
    } else {
      sayAnimalBackwards(currentAnimal);
    }
    // Resets
    incorrect = false;
    correct = false;
  }
}
