// Coctail shaker
class Shaker {
  constructor() {
    // Size variables
    this.x = 120;
    this.y1 = 260;
    this.y2 = 295;
    this.y3 = 400;


    // Creates inital shapes
    this.topBody = Bodies.rectangle(this.x, this.y1, 45, 35);//new Rectangle(120, 260, 45, 35, 0);
    this.middleBody = Bodies.trapezoid(this.x, this.y2, 108, 35, .6, 200);//new Trapezoid(120, 295, 108, 35, .6, 200, 0);
    this.bottomBody = Bodies.trapezoid(this.x, this.y3, 80, 190, -.35, 200);//new Trapezoid(120, 400, 80, 190, -.35, 200, 0);
    this.bodyList = [this.topBody, this.middleBody, this.bottomBody];

    // Connects the objects
    this.compoundBody = Body.create({
        parts: this.bodyList,
        mass: 30,
        friction: 0.6
    });
    Composite.add(world, this.compoundBody);

    // Creates graphics
    this.graphics = shakerGraphics;
    this.graphics.background(cLightGrey);
    this.graphics.noFill();
    // this.graphics.fill(cLightGrey);

  }

  // Draws the shaker
  display() {

    // Draws each individual part
    for (var i = 1; i < this.compoundBody.parts.length; i++) {
      var currentBody = this.compoundBody.parts[i];
      var pos = currentBody.position;
      var angle = currentBody.angle;
      var tempBounds = Bounds.create(currentBody.vertices);


      // Draws the shapes
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER);
      fill(cLightGrey);
      quad(currentBody.vertices[1].x - pos.x, currentBody.vertices[1].y - pos.y,
           currentBody.vertices[2].x - pos.x, currentBody.vertices[2].y - pos.y,
           currentBody.vertices[3].x - pos.x, currentBody.vertices[3].y - pos.y,
           currentBody.vertices[0].x - pos.x, currentBody.vertices[0].y - pos.y);

      // if (i == 1) {
      //   rotate(angle);
      //   imageMode(CENTER);
      //   // noFill();
      //   image(this.graphics, currentBody.vertices[1].x - pos.x, currentBody.vertices[1].y - pos.y);
      //
      // }

      pop();
      // push();
      //   // Draws the graphics
      //   imageMode(CENTER);
      //   // console.log(1)
      //
      // pop();
    }


    // setGradient(this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y,
    //             this.body.vertices[2].x,
    //             this.body.vertices[2].y ,
    //             cDarkGrey, cLightGrey, 1);

          // Mouse interaction
          // if (mouseConstraint.body != null && Bounds.contains(tempBounds, {x: mouseX, y: mouseY})) {
          //   // console.log(i);
          //
          //   // Takes off the top
          //   // if (i == 1 && currentBody == this.topBody) {
          //     // this.bodyList.splice(1);
          //     // console.log(5);
          //     // this.bodyList[i] = new Rectangle(mouseX, mouseY, 45, 35, 0);
          //     // this.topBody = new Rectangle(mouseX, mouseY, 45, 35, 0);
          //
          //     //new Rectangle(120, 260, 45, 35, 0);
          //     // Body.setPosition(this.topBody, {x:mouseX, y: mouseY});
          //
          //     // Body.setParts(this.compoundBody, [this.compoundBody, this.middleBody, this.bottomBody]);
          //     // Body.setStatic(this.middleBody, true);
          //     // Body.setStatic(this.bottomBody, true);
          //   // Takes off the middle and top
          //   } else if (i == 2) {
          //
          //   }
          // }




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
