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
let spriteBackground;

// Defines objects
let shakerLid;
let shaker;
let boxA;
let boxB;
let ground;
let ice;

// Implements Matter.js modules
let engine;
let render;
let mouse;
let mouseConstraint;
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


// Loads images and sounds
function preload() {
  spriteBackground = loadImage('assets/images/background.png');

}

// Sets up the canvas
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);

  // Creates an engine
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  // Creates the ground
  ground = new Rectangle(400, 600, 810, 150, 1);

  // Creates objects
  boxA = new Rectangle(350, -100, 80, 80, 0);
  boxB = new Rectangle(375, 100, 80, 80, 0);

  // Add bodies
  shaker = new Shaker();
  // var shakerA = new Trapezoid(260, 100, 80, 190, -.35, 200, 0);
  // var shakerB = new Trapezoid(120, 275, 108, 35, .6, 200, 0);
  // var shakerC = new Rectangle(120, 200, 45, 35, 0);
  // shaker = Body.create({ parts: [shakerA.body, shakerB.body, shakerC.body]});

  objectList.push(ground, boxA, boxB, shaker);//, shakerA, shakerB, shakerC);

  // Creates Ice
  // var ice = Composites.stack(650, 400, 5, 3, 0, 0, function(x, y) {
  //   return Bodies.rectangle(x, y, 25, 25, {
  //     render: {
  //       // fillStyle: '#FFFFFF',
  //       // strokeStyle: 'black'
  //     }
  //   });
  // });

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

// Runs the program
function draw() {
  background(0);
  for (var i = 0; i < objectList.length; i++) {
    objectList[i].display();
  }
}
