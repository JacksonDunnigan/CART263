// Makes the Glass
class Glass extends InteractableShapes {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    var options = {
      friction: 0.3,
      intertia: 5,
      frictionAir: 0.1,
      mass:100,
    };


    // Creates the bodyList
    this.leftBody = Bodies.rectangle(this.x-w*.45, this.y, 15, h);//new Rectangle(120, 260, 45, 35, 0);
    this.middleBody = Bodies.rectangle(this.x, this.y+h*.4, w-10, 20);//new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    this.rightBody = Bodies.rectangle(this.x+w*.45, this.y, 15, h);//new Trapezoid(120, 400, 80, 190, -.35, 200, 0);
    this.holdingBody = Bodies.rectangle(x, y, w, h, {options});
    this.bodyList = [this.leftBody, this.middleBody, this.rightBody];
    this.holdingConstraint;
    this.body = Body.create({
        parts: this.bodyList,
        density: 0.5,
    });
    this.body.collisionFilter = this.canCollide;
    World.add(world, this.body);
    this.bounds = Bounds.create(this.body.vertices);


    // Creates graphics
    this.pickupSound = soundClink;
    this.canRotate = true;
    this.graphics = createGraphics(this.w, this.h);
    this.graphics.noStroke();
    this.graphics.fill(255,255,255,70);
    this.graphics.noSmooth();
    this.graphics.image(this.sprite, 0, 0, this.w, this.h);

  }
  // Manually moves the glass
  move() {
    this.collisionCheck();
    Bounds.update(this.bounds,this.body.vertices,0);
    if ((mouseConstraint.body === null || mouseConstraint.body === this.body)
    && Bounds.contains(this.bounds, {x: mouseX, y: mouseY})) {
      if (mouseIsPressed === true) {
        this.updateSound();
        mouseConstraint.body = this.body;
        Body.setAngularVelocity(this.body, 0);
        if (this.holdingConstraint === undefined){
          this.holdingConstraint = Constraint.create({
               pointB: mouseConstraint.mouse.position,
               bodyA: this.body,
               stiffness: 0.9,
               damping: 0.2
           });
           World.add(world, this.holdingConstraint);
        }
        // Rotating logic
        if (scrolling == true) {
          Body.rotate(this.body, scrollDelta / 3);
        }
        scrolling = false;
      } else {
        if (this.holdingConstraint != undefined) {
          World.remove(world, this.holdingConstraint, true);
          this.holdingConstraint = undefined;
        }
      }
      this.clampVelocity();
      // Body.setAngularVelocity(this.body, 0);

    }
  }
  // Displays the shape
  display() {
    // Draws each individual part
    // var currentBody;
    // for (var i = 1; i < this.body.parts.length; i++) {
    //   currentBody = this.body.parts[i];
    //   pos = currentBody.position;
    //   angle = currentBody.angle;
    //   var tempBounds = Bounds.create(currentBody.vertices);
    // // Draws the shapes
    //   push();
    //   translate(pos.x, pos.y);
    //   rectMode(CENTER);
    //   fill(cLightGrey);
    //   quad(currentBody.vertices[1].x - pos.x, currentBody.vertices[1].y - pos.y,
    //        currentBody.vertices[2].x - pos.x, currentBody.vertices[2].y - pos.y,
    //        currentBody.vertices[3].x - pos.x, currentBody.vertices[3].y - pos.y,
    //        currentBody.vertices[0].x - pos.x, currentBody.vertices[0].y - pos.y);
    //   pop();
    // }

    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    rectMode(CENTER);
    image(this.graphics,0,-15,this.w, this.h)
    pop();
  }
}
