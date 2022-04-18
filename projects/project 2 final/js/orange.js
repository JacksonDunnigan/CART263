// Class to define an orange slice
class Orange extends InteractableShapes {
  constructor(x, y, w, h, isStatic) {

    super(x, y, w, h, isStatic, spriteOrange);
    this.h = h;
    this.w = this.h * 1.5;
    var options = {
      friction: 0.3,
      intertia: 5,
      frictionAir: 0.1,
      mass: 5
    };
    this.body = Bodies.rectangle(this.x, this.y, this.w*.65, this.h*.75);
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
    rectMode(CENTER);
    fill(255);
    // rect(0, 0, this.w, this.h/2);
    // rotate(angle + Math.PI/4);
    // this.graphics.rotate(Math.PI/4);
    imageMode(CENTER);
    image(this.graphics, 0, -this.h*.15, this.w, this.h)
    pop();
  }
}
