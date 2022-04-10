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
    if (mouseConstraint.body != null && Bounds.contains(this.bounds, {x: mouseX, y: mouseY})) {
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
// Makes a rectangle
// class Rectangle extends Shapes {
//   constructor(x, y, w, h, isStatic, sprite) {
//     super(x, y, w, h, isStatic, sprite);
//     var options = {
//       friction: 0.3,
//       restitution: 0.6,
//     };
//
//     if (this.static == 0) {
//       this.body = Bodies.rectangle(x, y, w, h, {options});
//     } else {
//       this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
//     }
//     World.add(world, this.body);
//   }
// }


// Class for static ground elements
class Ground extends Shapes {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
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

// Makes a trapezoid
// class Trapezoid extends Shapes {
//   constructor(x, y, w, h, angle, modifier, isStatic) {
//     super(x, y, w, h, isStatic);
//
//     if (this.static == 0) {
//       this.body = Bodies.trapezoid(x, y, w, h, angle, modifier);
//     } else {
//       this.body = Bodies.trapezoid(x, y, w, h, angle, modifier);
//     }
//     console.log(this.body.vertices);
//     World.add(world, this.body);
//   }
// }
//
//








  // Displays the trapezoid
  // display() {
  //   var pos = this.body.position;
  //   var angle = this.body.angle;
  //   push();
  //   translate(pos.x, pos.y);
  //   // rotate(angle);
  //   rectMode(CENTER);
  //   // console.log(this.body.vertices[1].y);
  //   quad(this.body.vertices[1].x - pos.x, this.body.vertices[1].y - pos.y,
  //        this.body.vertices[2].x - pos.x, this.body.vertices[2].y - pos.y,
  //        this.body.vertices[3].x - pos.x, this.body.vertices[3].y - pos.y,
  //        this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y);
  //   // rect(0, 0, this.w, this.h);
  //   pop();
  // }
// }

  // Draws the shape
  // display() {
  //   var pos = this.body.position;
  //   var angle = this.body.angle;
  //   push();
  //   translate(pos.x, pos.y);
  //   rotate(angle);
  //   rectMode(CENTER);
  //   rect(0, 0, this.w, this.h);
  //   pop();
  // }
  // function Trapezoid(x, y, w, h, is angle, modifier, static) {
    // World.add(world, this.body);

    // Draws the shape
    // this.show = function() {
    //   var pos = this.body.position;
    //   var angle = this.body.angle;
    //   push();
    //   translate(pos.x, pos.y);
    //   // rotate(radians(angle));
    //   rect(0, 0, this.w, this.h);
    //   pop();
    // }
