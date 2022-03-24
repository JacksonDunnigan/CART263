// Coctail shaker
class Shaker {
  constructor() {

    // Creates inital shapes
    this.topBody = Bodies.rectangle(120, 260, 45, 35);//new Rectangle(120, 260, 45, 35, 0);
    this.middleBody = Bodies.trapezoid(120, 295, 108, 35, .6, 200);//new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    this.bottomBody = Bodies.trapezoid(120, 400, 80, 190, -.35, 200);//new Trapezoid(120, 400, 80, 190, -.35, 200, 0);

    this.bodyList = [this.topBody, this.middleBody, this.bottomBody];

    // Connects the objects
    this.compoundBody = Body.create({
        parts: this.bodyList,
        mass: 30,
        friction: 0.6
    });
    Composite.add(world, this.compoundBody);
  }

  // Draws the shaker
  display() {

    // Holding logic
      // if (mouseConstraint.body != null) {
    for (var i = 1; i < this.compoundBody.parts.length; i++) {
      var currentBody = this.compoundBody.parts[i];
      var pos = currentBody.position;
      var angle = currentBody.angle;
      var tempBounds = Bounds.create(currentBody.vertices);

      // Mouse interaction
      if (mouseConstraint.body != null && Bounds.contains(tempBounds, {x: mouseX, y: mouseY})) {
        console.log(i);

        // Takes off the top
        if (currentBody == this.topBody) {
          Body.setPosition(this.topBody, {x:mouseX, y: mouseY})
          // Body.setStatic(this.middleBody, true);
          // Body.setStatic(this.bottomBody, true);
        // Takes off the middle and top
        } else if (i == 2) {

        }
      }

      // Draws the shapes
      // var pos = currentBody.position;
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER);
      quad(currentBody.vertices[1].x - pos.x, currentBody.vertices[1].y - pos.y,
           currentBody.vertices[2].x - pos.x, currentBody.vertices[2].y - pos.y,
           currentBody.vertices[3].x - pos.x, currentBody.vertices[3].y - pos.y,
           currentBody.vertices[0].x - pos.x, currentBody.vertices[0].y - pos.y);
      pop();
    }

    // Draws the shaker
    // for (var i = 1; i < this.compoundBody.parts.length; i++){
    //   var currentBody = this.bodyList[i];
    //   var pos = currentBody.position;
    //   var angle = currentBody.angle;
    //   push();
    //   translate(pos.x, pos.y);
    //   rectMode(CENTER);
    //   quad(currentBody.vertices[1].x - pos.x, currentBody.vertices[1].y - pos.y,
    //        currentBody.vertices[2].x - pos.x, currentBody.vertices[2].y - pos.y,
    //        currentBody.vertices[3].x - pos.x, currentBody.vertices[3].y - pos.y,
    //        currentBody.vertices[0].x - pos.x, currentBody.vertices[0].y - pos.y);
    //   pop();
    // }
  }
}
