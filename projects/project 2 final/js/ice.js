// Makes the ice
class Ice extends InteractableShapes {
  constructor(x, y, w, h, isStatic, sprite) {
    w = random(w-5,w+5);
    w = h;

    super(x, y, w, h, isStatic, sprite);
    var options = {
      friction: 0.3,
      intertia: 5,
      frictionAir: 0.1,
      mass: 5
    };
    this.body = Bodies.rectangle(x, y, w, h, {options});
    this.body.collisionFilter = this.canCollide;

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
