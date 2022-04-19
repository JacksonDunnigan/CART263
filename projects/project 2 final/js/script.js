// Bartending Simulator
// By Jacksonn Dunnigan
// Student ID: 40212769

"use strict";

// World variables
const canvasWidth = 800;
const canvasHeight = 600;
let world;
let objectList = [];
let menuObjectList = [];
let canvas;
let state = 'menu';
const delta = 1000 / 60;
const subSteps = 2;
const subDelta = delta / subSteps;
let click = false;
let mouseHolding = false;
let helpButtonOpen = false;

// Control variables
let scrollDelta = 0;
let scrolling = false;

// Defines sprites
let spriteBackground, spriteTable, spriteGlass, spriteIce, spriteShaker, spriteBuckets, spriteCherry, spriteOrange, spriteWhiskey;

// Defines sounds
let soundClink, soundPickup, soundPour, soundSquish, soundAmbience, soundMetal;

// Defines font
let fontPixel;

// Defines colors
let cDarkGrey, cLightGrey;

// Defines objects
let ground, wallA, wallB, buckets, cieling, shaker, glass, boxB, ice, whiskey;

// Implements Matter.js modules
let engine, render, mouse, mouseConstraint;
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    World = Matter.World,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bounds = Matter.Bounds,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Collision = Matter.Collision,
    Vertices = Matter.Vertices,
    Common = Matter.Common,
    Body = Matter.Body;


// Loads images, sounds and colours
function preload() {
  // Loads sprites
  spriteBackground = loadImage('assets/images/background.png');
  spriteTable = loadImage('assets/images/table.png');
  spriteGlass = loadImage('assets/images/glass.png');
  spriteShaker = loadImage('assets/images/shaker.png');
  spriteBuckets = loadImage('assets/images/buckets.png');
  spriteIce = loadImage('assets/images/ice.png');
  spriteCherry = loadImage('assets/images/cherry.png');
  spriteOrange = loadImage('assets/images/orange.png');
  spriteWhiskey = loadImage('assets/images/whiskey.png');

  // Loads Sounds
  soundClink = loadSound('assets/sounds/clink.wav');
  soundClink.setVolume(0.05);
  soundPickup = loadSound('assets/sounds/pickup.wav');
  soundPickup.setVolume(0.6);
  soundPour = loadSound('assets/sounds/pour.wav');
  soundPour.setVolume(0.6);
  soundSquish = loadSound('assets/sounds/squish.wav');
  soundSquish.setVolume(0.3);
  soundAmbience = loadSound('assets/sounds/ambience.wav');
  soundAmbience.setVolume(0.1);
  soundMetal = loadSound('assets/sounds/metal.wav');
  soundMetal.setVolume(0.2);

  // Loads fonts
  fontPixel = loadFont('assets/Minecraftia.ttf');
  // Defines colours
  // cDarkGrey = color(58, 59, 60);
  // cLightGrey = color(176, 179, 184);
}

// Sets up the canvas
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  textFont(fontPixel);

  // Creates an engine
  var engineOptions = {
      positionIterations: 6,
      velocityIterations: 4,
      constraintIterations: 2,
      enableSleeping: true,
      events: [],
      plugin: {},
      gravity: {
          x: 0,
          y: 1,
          scale: 0.001
      },
      timing: {
          timestamp: 0,
          timeScale: 1,
          lastDelta: 0,
          lastElapsed: 0
      }
  };

  // Creates the engine
  engine = Engine.create(engineOptions);
  world = engine.world;
  Engine.run(engine);

  // Sound
  soundAmbience.loop();

  // Creates Static objects
  ground = new Ground(400, 540, 810, 130, 0, spriteTable);
  wallA = new Ground(-30, 300, 60, 600, 0, spriteTable);
  wallB = new Ground(830, 300, 60, 600, 0, spriteTable);
  cieling = new Ground(400, -30, 800, 60, 0, spriteTable);
  buckets = new Buckets(400, 570, 800, 90, 0, spriteBuckets);

  // Creates interactable objects
  glass = new Glass(220, 460, 100, 105, 0, spriteGlass);
  shaker = new Shaker();
  whiskey = new Whiskey();

  // Adds bodies to the object list
  objectList.push(ground, wallA, wallB, buckets, shaker, glass, whiskey);
  menuObjectList.push(ground, shaker, glass);

  // Creates the mouse for interaction
  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    pixelRatio: pixelDensity(),
    constraint: {
        stiffness: 0.4,
        render: {
            visible: false
        }
    }
  });
  mouseConstraint.collisionFilter = {
    'group': 1,
  };
  // Mouse clicking
  Events.on(mouseConstraint, 'mousedown', function(event) {
    click = true;
    if (mouseHolding == true) {
      playSound(soundPickup);
    }
  });
  World.add(world, mouseConstraint);
}


// Mouse Scrolling
function mouseWheel(event) {
  scrolling = true;
  scrollDelta = event.delta / abs(event.delta)
}

// Plays a sound
function playSound(sound) {
  sound.rate(random(0.7, 1));
  sound.play();
}

// Runs the program
function draw() {
  background(spriteBackground);
  noStroke();
  noSmooth();

  // Game states
  if (state === 'menu'){
    menu();
  } else if (state === 'simulation'){
    simulation();
  }
}

// Switching between game states
function mousePressed() {
  if (state === 'menu'){
    state = 'simulation';
  }
}

// Help helpButton
function helpButton(){
  var tempX = width *.947;
  var tempY = height * .01;
  var buttonWidth = 38;

  push();
  textSize(28);
  var tempColor = color(255);
  tempColor.setAlpha(180);
  fill(tempColor);
  textAlign(RIGHT);
  text(`?`, width *.986, height * .09);
  noFill();
  stroke(tempColor);
  strokeWeight(3);
  rect(tempX, tempY, buttonWidth, buttonWidth);

  // Clicking the button logic
  if (click) {
    if (mouseX >= tempX
      && mouseX <= tempX + buttonWidth
      && mouseY >= tempY
      && mouseY <= tempY + buttonWidth
      && click == true) {
      playSound(soundSquish);
      helpButtonOpen = true;
    } else {
      helpButtonOpen = false;
    }
  }

  // Displays the help screen
  if (helpButtonOpen) {
    textSize(32);
    textAlign(CENTER);
    strokeWeight(0);
    tempColor.setAlpha(220);
    fill(tempColor);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor =  color(0,0,0);
    text(`Instructions
      Grab objects with the mouse
      Scroll to rotate objects
      Combine ingredients in the
      glass to make drinks`, width *.5, height * .15);
  }
  pop();

}

// Main Menu
function menu() {
  for (var i = 0; i < menuObjectList.length; i++) {
    menuObjectList[i].display();
  }
  push();
  textSize(46);
  fill(255);
  textAlign(LEFT);
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor =  color(0,0,0);
  text(`Bartending Simulator`, width *.017, height *.97);
  textSize(16);
  text(`By Jackson Dunnigan`, width *.02, height *.98);
  pop();
}


// Runs the simulation
function simulation() {
   frameRate(60);

  for (var i = 0; i < objectList.length; i++) {
    if (objectList[i] == null) {
      i++;
    } else {
      objectList[i].move();
    }
  }
  for (var i = 0; i < objectList.length; i++) {
    if (objectList[i] == null) {
      i++;
    } else {
      objectList[i].display();
    }
  }
  helpButton();

  click = false;

  // Globally stores what the mouse is holding
  if (mouseConstraint.body != null){
    mouseHolding = true;
  } else {
    mouseHolding = false;
  }



}
