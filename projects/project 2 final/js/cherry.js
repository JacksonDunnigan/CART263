// Makes the ice
class Cherry extends InteractableShapes {
  constructor(x, y, w, h, isStatic, sprite) {


    super(x, y, w, h, isStatic, sprite);
    this.w = random(w-8 ,w+8);
    this.h = this.w * 1.5;
    var options = {
      friction: 0.3,
      intertia: 5,
      frictionAir: 0.1,
      mass: 5
    };
    this.body = Bodies.circle(x, y, w*.4);
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
    fill(255);
    // circle(0,0,this.w*.8);
    image(this.graphics, 4, -18,this.w, this.h)
    pop();
  }
}
