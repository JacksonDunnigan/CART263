// Bar Tending Simulator
// By Jacksonn Dunnigan
// Student ID: 40212769

"use strict";

// World variables
let canvasWidth = 800;
let canvasHeight = 600;
let world;
let objectList = [];
let canvas;

// Defines sprites
let spriteBackground, spriteTable;

// Defines colors
let cDarkGrey, cLightGrey;

// Defines objects
let shakerLid, shaker, boxA, boxB, ground, ice;

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

  // Creates objects
  ground = new Rectangle(400, 550, 810, 100, 1, spriteTable);
  boxA = new Rectangle(350, -100, 80, 80, 0);
  boxB = new Rectangle(375, 100, 80, 80, 0);
  shaker = new Shaker();

  // Adds bodies to the object list
  objectList.push(ground, boxA, boxB, shaker);

  // Creates the mouse for interaction
  mouse = Mouse.create(canvas.elt);
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
  World.add(world, mouseConstraint);
}

// Creates gradients
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === 1) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === 2) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}


// Runs the program
function draw() {
  background(spriteBackground);
  noStroke();
  noSmooth();
  for (var i = 0; i < objectList.length; i++) {
    objectList[i].display();
  }
}
