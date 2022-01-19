"use strict";

/*****************
Where's Sausage Dog?
Pippin Barr
Where's Waldo, except with a Sausage Dog!
Displays a large number of random animal images as well as
a single sausage dog image. The player needs to click on the
dog to win the game.
******************/

// Constants for image loading
const NUM_ANIMAL_IMAGES = 10;
const ANIMAL_IMAGE_PREFIX = `assets/images/animal`;
const SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

// Number of images to display
const NUM_ANIMALS = 100;

// Constant for spawning
const MARGIN = 50;


// Array of the loaded animal images
let animalImages = [];
// Array of animal objects
let animals = [];
// Loaded sausage dog image
let sausageDogImage;
// Sausage dog object
let sausageDog;
// State of the game
let state = "menu";
// Time limit vairables
let maxTimer = 1000;
let timer;
// Score
let score = 0;
// Sounds
let beep;
let beep2;
let victorySound;
let gameOverSound;

// preload()
// Loads all the animal images and the sausage dog image
function preload() {
  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);
  }

  // Load the sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);

  // Load sounds
  beep = loadSound('assets/sounds/beep.wav');
  beep2 = loadSound('assets/sounds/beep 2.wav');
  victorySound = loadSound('assets/sounds/victory.mp3');
  gameOverSound = loadSound('assets/sounds/gameOver.mp3');

}


// setup()
// Creates all the animal objects and a sausage dog object
function setup() {
  createCanvas(windowWidth, windowHeight);
  timer = maxTimer;
  createAnimals();
  createSausageDog();
}

// createAnimals()
// Creates all the animals at random positions with random animal images
function createAnimals() {
  // Create the correct number of animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    // Create one random animal
    let animal = createRandomAnimal();
    // Add it to the animals array
    animals.push(animal);
  }
}

// createRandomAnimal()
// Create an animal object at a random position with a random image
// then return that created animal
function createRandomAnimal() {
  let x = random(MARGIN, width-MARGIN);
  let y = random(MARGIN, height-MARGIN*2);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// createSausageDog()
// Creates a sausage dog at a random position
function createSausageDog() {
  let x = random(MARGIN, width-MARGIN);
  let y = random(MARGIN, height-MARGIN*2);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// Menu
function menu() {
  push();
  textFont('courier');
  textSize(86);
  textAlign(CENTER,CENTER);
  fill(80);
  text("Sausage Quest", width / 2 - 4, height *.4 );
  fill(255);
  text("Sausage Quest", width / 2, height *.4);
  textSize(32);
  fill(80);
  text("press any key to play", width / 2 - 3, height *.47);
  fill(225);
  text("press any key to play", width / 2, height *.47);
  imageMode(CENTER);
  image(sausageDogImage, width / 2, height *.55);
  pop();
}
// Simulation
function simulation() {
  // Updates animals
  updateAnimals();
  updateSausageDog();

  // Updates the timer
  if (sausageDog.found == false){
    timer = max(timer - 1, 0);
    if (timer % 60 == 0){
      beep.play();
    }
    if (timer <= 0){
      gameOverSound.play();
      state = 'gameOver';
    }
  }

  // Draws the timer
  push();
  fill(255);
  noStroke();
  rectMode(CORNER);
  rect(0,height-25, width * (timer/maxTimer), 25);
  pop();

  // Draws the score
  push();
  textFont('courier');
  textSize(42);
  textAlign(CENTER,CENTER);
  fill(80);
  text("Score:"+ score, MARGIN*2.2-3, height - MARGIN );

  fill(255);
  text("Score:"+ score, MARGIN*2.2, height - MARGIN );

  pop();
}
// Victory
function victory() {
  push();
  textFont('courier');
  textSize(86);
  textAlign(CENTER,CENTER);
  fill(80);
  text("You Found Him!", width / 2 - 4, height *.4 );
  fill(255);
  text("You Found Him!", width / 2, height *.4);
  textSize(32);
  fill(80);
  text("current score:"+score, width / 2 - 3, height *.47);
  fill(225);
  text("current score:"+score, width / 2, height *.47);
  imageMode(CENTER);
  image(sausageDogImage, width / 2, height *.55);
  pop();
}

// Game over
function gameOver(){
  push();
  textFont('courier');
  textSize(86);
  textAlign(CENTER,CENTER);
  fill(80);
  text("Game Over", width / 2 - 4, height *.4 );
  fill(255);
  text("Game Over", width / 2, height *.4);
  textSize(32);
  fill(80);
  text("you had a score of "+ score, width / 2 - 3, height *.47);
  fill(225);
  text("you had a score of "+ score, width / 2, height *.47);
  // fill(80);
  // text("press any key\nto restart", width / 2 - 3, height *.5);
  // fill(225);
  // text("press any key\nto restart", width / 2, height *.5);
  imageMode(CENTER);
  image(sausageDogImage, width / 2, height *.55);
  pop();
}

// draw()
// Draws the background then updates all animals and the sausage dog
function draw() {
  background(92,175,110);

  // Game states
  if (state === 'menu'){
    menu();
  } else if (state === 'simulation'){
    simulation();
  } else if (state === 'victory'){
    victory();
  } else if (state === 'gameOver'){
    gameOver();
  }
}

// updateAnimals()
// Calls the update() method for all animals
function updateAnimals() {
  // Loop through all animals
  for (let i = 0; i < animals.length; i++) {
    // Updates the current animal
    animals[i].update();
    bubbleSort();
  }

}

// updateSausageDog()
// Calls the update() method of the sausage dog
function updateSausageDog() {
  sausageDog.update();
}

// mousePressed()
// Automatically called by p5 when the mouse is pressed.
// Call the sausage dog's mousePressed() method so it knows
// the mouse was clicked.
function mousePressed() {
  sausageDog.mousePressed();
  beep2.play();

  // Changes states
  if (state === 'menu'){
    state = 'simulation';
  } else if (state === 'victory'){
    for (var i = 0; i < animals.length; i++){
      animals.splice(i);
    }
    state = 'simulation'
    setup();
  } else if (state === 'gameOver'){
    for (var i = 0; i < animals.length; i++){
      animals.splice(i);
    }
    score = 0;
    maxTimer = max(maxTimer - 50, 500);
    state = 'simulation';
    setup();
  }
}

// keyPressed()
function keyPressed() {
  if (state === 'menu') {
    state = 'simulation';
  }
}

// bubble sort
function bubbleSort() {
  let i = 0;
  let j = 0;
  for(let k = 0;k<animals.length;k++){
    if(i<animals.length){
      let temp = animals[j].y;
      if(animals[j].y > animals[j+1].y){
        animals[j].y = animals[j+1].y;
        animals[j+1].y = temp;
      }
      j++;

      if(j>=animals.length-i-1){
        j = 0;
        i++;
      }
    }
    else{
      noLoop();
    }
  }
}
