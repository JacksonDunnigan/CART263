// Bar Tending Simulator
// By Jacksonn Dunnigan
// Student ID: 40212769

"use strict";

let spriteBackground;


// Loads the images
// preload() {
//   spriteBackground = loadImage('assets/images/background.png');
//
// }

window.addEventListener('load', function() {


  // Canvas
  var canvas = document.getElementById('canvas');

  // Map variables
  let screenWidth = 800;
  let screenHeight = 600;
  let world;

  // module aliases
  var Engine = Matter.Engine,
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
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Vertices = Matter.Vertices,
      Common = Matter.Common;

  // provide concave decomposition support library
  // Common.setDecomp(require('poly-decomp'));


  // create an engine
  var engine = Engine.create();
      world = engine.world;

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
           width: screenWidth,
           height: screenHeight,
           showAngleIndicator: true,
       }
  });

  // create objects
  // var vertices = [
  //       {x : 0 , y : 0},
  //       {x : 0 , y : 50},
  //       {x : 25 , y : 25},
  //       {x : 50 , y : 50},
  //       {x : 50 , y : 0}
  //     ]

  var shakerLid = Composite.create();
  Composite.addBody(shakerLid, Bodies.trapezoid(120, 275, 108, 35, .6, 200));
  Composite.addBody(shakerLid, Bodies.rectangle(120, 200, 45, 35));

  var shaker = Bodies.trapezoid(120, 475, 80, 190, -.35, 200);
  var boxA = Bodies.rectangle(350, 475, 80, 80);
  var boxB = Bodies.rectangle(450, 475, 80, 80);
  var ground = Bodies.rectangle(400, 575, 810, 150, { isStatic: true });

  // Composite.add(shakerLid, object) ;
  // var shakerLidA
  // var shakerLidB

  // Composite.add(ropeB, Constraint.create({
  //     bodyB: ropeB.bodies[0],
  //     pointB: { x: -20, y: 0 },
  //     pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
  //     stiffness: 0.5
  // }));
  var ice = Composites.stack(650, 400, 5, 3, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 25, {
      // render: {
      //   fillStyle: 'orange',
      //   strokeStyle: 'black'
      // }
    });
  });
  var objectList = [boxA, boxB, shaker,shakerLid, ground, ice]

  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // add all of the bodies to the world
  Composite.add(engine.world, objectList);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
