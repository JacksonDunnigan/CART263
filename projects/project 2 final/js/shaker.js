// Coctail shaker
class Shaker {
  constructor() {
    // Size variables
    this.x = 110;
    this.y1 = 270;
    this.y2 = 300;
    this.y3 = 400;

    // Creates inital shapes
    this.topBody = Bodies.rectangle(this.x, this.y1, 45, 35);//new Rectangle(120, 260, 45, 35, 0);
    this.middleBody = Bodies.trapezoid(this.x, this.y2, 108, 25, .6, 200);//new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    this.bottomBody = Bodies.trapezoid(this.x, this.y3, 80, 190, -.35, 200);//new Trapezoid(120, 400, 80, 190, -.35, 200, 0);
    this.bodyList = [this.bottomBody,this.middleBody,this.topBody];

    // Connects the objects
    this.compoundBody = Body.create({
        parts: this.bodyList,
        // mass: 200,
        // restitution: 0

    });
    Composite.add(world, this.compoundBody);
    this.bounds = Bounds.create(this.compoundBody.vertices);

    // Body.setMass(this.compoundBody, 100);

    // Creates graphics
    this.canRotate = true;
    this.sprite = spriteShaker;
    this.graphics = createGraphics(110, 260);
    this.graphics.noSmooth();
    this.graphics.image(spriteShaker, 0, -8, 110, 260);

  }
  // Mouse interaction
  move() {
    Bounds.update(this.bounds,this.compoundBody.vertices,0);

    if (mouseConstraint.body != null && Bounds.contains(this.bounds, {x: mouseX, y: mouseY})) {
      Body.setAngularVelocity(this.compoundBody, 0);

       if (this.compoundBody.angle % Math.PI > 0 && this.compoundBody.angle % Math.PI < Math.PI){
         Body.rotate(this.compoundBody, -0.015);
       } else if (this.compoundBody.angle % Math.PI < 0 && this.compoundBody.angle % Math.PI < Math.PI) {
         Body.rotate(this.compoundBody, 0.015);
      }
    }
  }
  // Draws the shaker
  display() {

    var pos;
    var angle;
    var currentBody;
    // Draws each individual part
    // for (var i = 1; i < this.compoundBody.parts.length; i++) {
    //   currentBody = this.compoundBody.parts[i];
    //   pos = currentBody.position;
    //   angle = currentBody.angle;
    //   var tempBounds = Bounds.create(currentBody.vertices);
    //
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

      // Draws the graphics
      push();
        pos = this.compoundBody.parts[0].position;
        angle = this.compoundBody.parts[0].angle;
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.graphics,0,0);
      pop();

  }
}


      // }
      // Takes off the top
      // if (i == 1 && currentBody == this.topBody) {
        // this.bodyList.splice(1);
        // console.log(5);
        // this.bodyList[i] = new Rectangle(mouseX, mouseY, 45, 35, 0);
        // this.topBody = new Rectangle(mouseX, mouseY, 45, 35, 0);

        //new Rectangle(120, 260, 45, 35, 0);
        // Body.setPosition(this.topBody, {x:mouseX, y: mouseY});

        // Body.setParts(this.compoundBody, [this.compoundBody, this.middleBody, this.bottomBody]);
        // Body.setStatic(this.middleBody, true);
        // Body.setStatic(this.bottomBody, true);
      // Takes off the middle and top

    // }
