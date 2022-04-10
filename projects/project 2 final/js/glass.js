// Makes the Glass
class Glass extends Shapes {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    var options = {
      friction: 0.3,
      // restitution: 0.1,
      intertia: 5,
      frictionAir: 0.1,
      // mass: 100
    };
    this.body = Bodies.rectangle(x, y, w, h, {options});
    World.add(world, this.body);
    this.bounds = Bounds.create(this.body.vertices);

    // Creates graphics
    this.canRotate = true;
    this.graphics = createGraphics(this.w, this.h);
    this.graphics.noStroke();
    this.graphics.fill(255,255,255,70);
    this.graphics.noSmooth();
    this.graphics.image(this.sprite, 0, 0, this.w, this.h);

  }
  // Mouse interaction
  move() {
    Bounds.update(this.bounds,this.body.vertices,0);

    if (mouseConstraint.body != null && Bounds.contains(this.bounds, {x: mouseX, y: mouseY})) {
      Body.setAngularVelocity(this.body, 0);
      // Body.setVelocity(this.compoundBody, 0);

       if (this.body.angle % Math.PI > 0 && this.body.angle % Math.PI < Math.PI){
         Body.rotate(this.body, -0.015);
       } else if (this.body.angle % Math.PI < 0 && this.body.angle % Math.PI < Math.PI) {
         Body.rotate(this.body, 0.015);
      }
    }
  }

  // Displays the shape
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    rectMode(CENTER);
    image(this.graphics,0,0,this.w, this.h)
    pop();
  }
}
