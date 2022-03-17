window.addEventListener('load', function() {

  var canvas = document.getElementById('canvas');

  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Events = Matter.Events,
      World = Matter.World,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse;

  // create an engine
  var engine = Engine.create();
      world = engine.world;

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
           width: 800,
           height: 600,
           showAngleIndicator: true,
       }
  });

  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


  // add mouse control
  // Events.on(engine, 'afterUpdate', function() {
  //   if (mouseConstraint.mouse.button === -1) {
  //           rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
  //           World.add(engine.world, rock);
  //           elastic.bodyB = rock;
  //       }
  //   });
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
  Composite.add(engine.world, [boxA, boxB, ground]);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
