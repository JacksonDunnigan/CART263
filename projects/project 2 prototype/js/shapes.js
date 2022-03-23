// Parent class for shapes
class Shapes {
  constructor(x, y, w, h, isStatic) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.static = isStatic;
    this.body;
  }

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
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    // rotate(angle);
    rectMode(CENTER);
    // console.log(this.body.vertices[1].y);
    quad(this.body.vertices[1].x - pos.x, this.body.vertices[1].y - pos.y,
         this.body.vertices[2].x - pos.x, this.body.vertices[2].y - pos.y,
         this.body.vertices[3].x - pos.x, this.body.vertices[3].y - pos.y,
         this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y);
    // rect(0, 0, this.w, this.h);
    pop();
  }

}
// Makes a rectangle
class Rectangle extends Shapes {
  constructor(x, y, w, h, isStatic) {
    super(x, y, w, h, isStatic);

    if (this.static == 0) {
      this.body = Bodies.rectangle(x, y, w, h, { isStatic: false });
    } else {
      this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
    }
    World.add(world, this.body);
  }
}


// Makes a trapezoid
class Trapezoid extends Shapes {
  constructor(x, y, w, h, angle, modifier, isStatic) {
    super(x, y, w, h, isStatic);

    if (this.static == 0) {
      this.body = Bodies.trapezoid(x, y, w, h, angle, modifier);
    } else {
      this.body = Bodies.trapezoid(x, y, w, h, angle, modifier);
    }
    console.log(this.body.vertices);
    World.add(world, this.body);
  }
}
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
