// Whiskey bottle
class Whiskey extends InteractableShapes  {
  constructor() {
    super(110, 0, 0, 0, false, spriteWhiskey);

    // Size variables
    this.x = 380;
    this.y1 = 350;
    this.y2 = 395;
    this.y3 = 485;
    this.pos;
    this.angle;

    // Creates inital shapes
    this.topBody = Bodies.rectangle(this.x + 2, this.y1, 30, 65);//new Rectangle(120, 260, 45, 35, 0);
    this.middleBody = Bodies.trapezoid(this.x + 2, this.y2, 90, 25, .65, 200);//new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    this.bottomBody = Bodies.rectangle(this.x, this.y3, 90, 160);//new Trapezoid(120, 400, 80, 190, -.35, 200, 0);
    this.bodyList = [this.bottomBody, this.middleBody, this.topBody];

    // Connects the objects
    this.body = Body.create({
        parts: this.bodyList
    });
    this.body.collisionFilter = this.canCollide;
    Composite.add(world, this.body);
    this.bounds = Bounds.create(this.body.vertices);

    // Variables for liquids
    this.liquid = [];
    this.liquidMaxSize = 200;
    this.liquidSize = 5;
    this.newObject;

    // Creates graphics
    this.canRotate = true;
    this.graphics = createGraphics(110, 260);
    this.graphics.noSmooth();
    this.graphics.image(this.sprite, 0, 0, 110, 260);

  }
  move() {
    // Rotating the bottle
    Bounds.update(this.bounds,this.body.vertices,0);
    if (mouseConstraint.body === this.body
      && Bounds.contains(this.bounds, {x: mouseX, y: mouseY})) {

      if (scrolling == true) {
        Body.setAngularVelocity(this.body, 0);
        Body.rotate(this.body, scrollDelta / 3);
      }
      scrolling = false;
    }

    // Creates liquid
    this.pos = this.body.parts[0].position;
    this.angle = this.body.parts[0].angle
    var tempAngle = abs(this.body.parts[0].angle % (Math.PI * 2));
    if (tempAngle > Math.PI - (Math.PI / 2) && tempAngle < Math.PI + (Math.PI / 2)) {
      var vector = createVector(this.body.parts[3].vertices[0].x, this.body.parts[3].vertices[0].y);
      var vector2 = createVector(20, 0);

      // console.log(topPos);
      this.newObject = new Liquid(vector.x, vector.y, this.liquidSize, this.liquidSize);
      this.liquid.push(this.newObject);
      World.add(world, this.newObject);
      objectList.push(this.newObject);

      // Deletes the liquid if needed
      if (this.liquid.length >= this.liquidMaxSize) {
        var tempIndex = objectList.indexOf(this.liquid[0]);
        objectList.splice(tempIndex, 1);
        this.liquid.splice(0,1);
        World.remove(world, this.liquid[0].body);
      }

      console.log(world.bodies.length);
    }
  }
  // Draws the shaker
  display() {

    // var pos;
    // var angle;
    // var currentBody;
    // Draws the graphics
    push();
      // this.pos = this.body.parts[0].position;
      // this.angle = this.body.parts[0].angle;
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(this.graphics,0,-24);
    pop();



    // Draws each individual part
    // for (var i = 1; i < this.body.parts.length; i++) {
    //   currentBody = this.body.parts[i];
    //   pos = currentBody.position;
    //   angle = currentBody.angle;
    //   var tempBounds = Bounds.create(currentBody.vertices);
    //
    //   // Draws the shapes
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


  }
}

class Liquid extends Shapes {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h);
    this.body.collisionFilter = this.canCollide;

    World.add(world, this.body);
    this.bounds = Bounds.create(this.body.vertices);
  }
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    rectMode(CENTER);
    fill(255,108,0,150);
    rect(0, 0, this.w, this.h);
    // image(this.graphics, 4, -18,this.w, this.h)
    pop();
  }
}
