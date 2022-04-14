// Bar Tending Simulator
// By Jacksonn Dunnigan
// Student ID: 40212769

"use strict";

// World variables
let canvasWidth = 800;
let canvasHeight = 600;
let world;
let objectList = [];
let menuObjectList = [];
let canvas;
let state = 'menu';

// Control variables
let scrollDelta = 0;
let scrolling = false;

// Defines sprites
let spriteBackground, spriteTable, spriteGlass, spriteIce, spriteShaker, spriteBuckets;

// Defines colors
let cDarkGrey, cLightGrey;

// Defines objects
let ground, wallA, wallB, buckets, cieling, shaker, glass, boxB, ice;

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
    Vertices = Matter.Vertices,
    Common = Matter.Common,
    Body = Matter.Body;


// Loads images, sounds and colours
function preload() {
  // Defines
  spriteBackground = loadImage('assets/images/background.png');
  spriteTable = loadImage('assets/images/table.png');
  spriteGlass = loadImage('assets/images/glass.png');
  spriteShaker = loadImage('assets/images/shaker.png');
  spriteBuckets = loadImage('assets/images/buckets.png');
  spriteIce = loadImage('assets/images/ice.png');

  // Defines colours
  cDarkGrey = color(58, 59, 60);
  cLightGrey = color(176, 179, 184);
}

// Sets up the canvas
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  // Creates an engine
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  // Creates Static objects
  ground = new Ground(400, 540, 810, 130, 0, spriteTable);
  wallA = new Ground(-30, 300, 60, 600, 0, spriteTable);
  wallB = new Ground(830, 300, 60, 600, 0, spriteTable);
  cieling = new Ground(400, -30, 800, 60, 0, spriteTable);
  buckets = new Ground(400, 570, 800, 90, 0, spriteBuckets);

  // Creates interactable objects
  glass = new Glass(220, 460, 100, 105, 0, spriteGlass);
  shaker = new Shaker();
  ice = new Ice(400, 460, 50, 50, 0, spriteIce);

  // Adds bodies to the object list
  objectList.push(ground, wallA, wallB, buckets, shaker, ice, glass);
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
  World.add(world, mouseConstraint);
}

// Mouse Scrolling
function mouseWheel(event) {
  scrolling = true;
  scrollDelta = event.delta / abs(event.delta)
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

// Main Menu
function menu() {
  for (var i = 0; i < menuObjectList.length; i++) {
    menuObjectList[i].display();
  }
  push();
  textSize(56);
  fill(255);
  textAlign(LEFT);
  text(`Bartending Simulator`, width *.017, height *.91);
  textSize(18);
  text(`By Jackson Dunnigan`, width *.02, height *.95);
  pop();
}


// Runs the simulation
function simulation() {
  for (var i = 0; i < objectList.length; i++) {
    objectList[i].move();
  }
  for (var i = 0; i < objectList.length; i++) {
    objectList[i].display();
  }
}
