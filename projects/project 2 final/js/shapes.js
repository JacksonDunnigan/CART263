// Parent class for shapes
class Shapes {
  constructor(x, y, w, h, isStatic, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.static = isStatic;
    this.body;
    this.sprite = sprite || 0;
    this.bounds = null;
    this.noCollide = {
      'group': 2,
      'category': 0x0001,
      'mask': 0,
    };
    this.canCollide = {
      'group': 1,
      'category': 0x0001,
      'mask': 0,
    };
  }

  // Moving logic
  move() {
  }

  // Displays the shape
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    quad(this.body.vertices[1].x - pos.x, this.body.vertices[1].y - pos.y,
         this.body.vertices[2].x - pos.x, this.body.vertices[2].y - pos.y,
         this.body.vertices[3].x - pos.x, this.body.vertices[3].y - pos.y,
         this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y);
    pop();
  }
}

// Class for shapes that the player can interact with
class InteractableShapes extends Shapes {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
  }

  // Moving logic
  move() {
    Bounds.update(this.bounds,this.body.vertices,0);
    if (mouseConstraint.body === this.body
      && Bounds.contains(this.bounds, {x: mouseX, y: mouseY})) {

      if (scrolling == true) {
        Body.setAngularVelocity(this.body, 0);
        Body.rotate(this.body, scrollDelta / 3);
      }
      scrolling = false;
    }
  }

  // Displays the shape
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    quad(this.body.vertices[1].x - pos.x, this.body.vertices[1].y - pos.y,
         this.body.vertices[2].x - pos.x, this.body.vertices[2].y - pos.y,
         this.body.vertices[3].x - pos.x, this.body.vertices[3].y - pos.y,
         this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y);
    pop();
  }
}

// Class for static ground elements
class Ground extends Shapes {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
    this.body.collisionFilter = this.canCollide;
    World.add(world, this.body);
  }
  //Draws the boundaries
  display() {
    push();
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    if (this.sprite != 0){
      imageMode(CORNERS);
      image(this.sprite,
        this.body.vertices[1].x - pos.x,
        this.body.vertices[1].y - pos.y,
        this.body.vertices[3].x - pos.x,
        this.body.vertices[3].y - pos.y);
    }
    pop();
  }
}

// Buckets
class Buckets extends Ground {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    this.bounds = Bounds.create(this.body.vertices);
    this.inBounds = false;
    this.newIce = null;
    this.holdingConstraint = null;
  }
  move(){
    // Creates ice cubes and limes
    Bounds.update(this.bounds, this.body.vertices,0);
    this.inBounds = (Bounds.contains(this.bounds, {x: mouseX, y: mouseY}));

    // Only creates ice cubes if the mouse is within the boundaries of the buckets
    if (this.inBounds) {
      if (mouseIsPressed && this.newIce == null) {
        console.log(1);
        this.inBounds = true;
        var size = random(40, 50);

        // Creates the ice
        this.newIce = new Ice(mouseX, mouseY, size, size, 0, spriteIce);

        // Creates the constraint
        this.holdingConstraint = Constraint.create({
             pointB: mouseConstraint.mouse.position,
             bodyA: this.newIce.body,
             stiffness: 0.9,
         });
         
        // Adds constraints to the world
        World.add(world, this.holdingConstraint);
        objectList.push(this.newIce);
      }

    // Switches the constraints back to normal
    } else {
      if (this.newIce != null && !mouseIsPressed) {
        World.remove(world, this.holdingConstraint, true);
        this.holdingConstraint = undefined;
        this.newIce = null;
      }
    }
  }
}
