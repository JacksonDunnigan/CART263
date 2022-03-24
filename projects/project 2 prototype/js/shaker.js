// Coctail shaker
class Shaker {
  constructor() {

    this.topBody = Bodies.rectangle(120, 260, 45, 35);//new Rectangle(120, 260, 45, 35, 0);
    this.middleBody = Bodies.trapezoid(120, 295, 108, 35, .6, 200);//new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    this.bottomBody = Bodies.trapezoid(120, 400, 80, 190, -.35, 200);//new Trapezoid(120, 400, 80, 190, -.35, 200, 0);
    // this.topBody = new Rectangle(120, 260, 45, 35, 0);
    // this.middleBody = new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    // this.bottomBody = new Trapezoid(120, 400, 80, 190, -.35, 200, 0);

    // Connects the objects

    this.compoundBody = Body.create({
        parts: [this.topBody, this.middleBody, this.bottomBody],
        mass: 30,
        friction: 0.6
        // density: 5,
        // inertia: 1
    });
    Composite.add(world, this.compoundBody);

    // this.options = {
    //   bodyA: this.bottomBody.body,
    //   bodyB: this.middleBody.body,
    //   stiffness: 1,
    //   length: 105
    //
    //   // pointA: {
    //   //   x:0,
    //   //   y:0
    //   // }
    // }
    // this.constraint = Constraint.create(this.options);
    // World.add(world, this.constraint);
    // Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
    // Composite.add(ropeA, Constraint.create({
    // Composites.chain(ropeB, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
    // Composite.add(ropeB, Constraint.create({
    //     bodyB: ropeB.bodies[0],
    //     pointB: { x: -20, y: 0 },
    // this.body = Composite.create({ parts: [this.topBody.body, this.middleBody.body, this.bottomBody.body]});
    // World.add(world, this.body);


    // this.parts = [this.topBody, this.middleBody, this.bottomBody];
    // this.currentParts = [this.bottomBody, this.middleBody, this.topBody];
  }
  // move(){
  //
  // }
  // Draws the shaker
  display() {

    // for (var i = 0; i < this.currentParts.length; i++) {
    //   if (i != 0) {
    //     var pos = this.currentParts[i].body.position;
    //     var pos2 = this.currentParts[i - 1].body.position;
    //
    //     pos.x = pos2.x;
    //     pos.y = pos2.y - 200;
    //   }
    // }
    // if (Matter.SAT.collides(this.bottomBody, this.middleBody).collided) {
    //   this.currentParts
    // }
    // for (var i = 0; i < this.compoundBody.parts.length; i++) {
      if (mouseConstraint.body == this.topBody) {
        this.compoundBody

      }
    // }
    for (var i = 0; i < this.compoundBody.parts.length; i++){
      var currentBody = this.compoundBody.parts[i];
      var pos = currentBody.position;
      var angle = currentBody.angle;
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER);
      quad(currentBody.vertices[1].x - pos.x, currentBody.vertices[1].y - pos.y,
           currentBody.vertices[2].x - pos.x, currentBody.vertices[2].y - pos.y,
           currentBody.vertices[3].x - pos.x, currentBody.vertices[3].y - pos.y,
           currentBody.vertices[0].x - pos.x, currentBody.vertices[0].y - pos.y);
      pop();
    }
  }
}
