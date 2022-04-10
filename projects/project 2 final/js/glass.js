// Makes the Glass
class Glass extends Shapes {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    var options = {
      friction: 0.3,
      restitution: 0.6,
    };
    this.body = Bodies.rectangle(x, y, w, h, {options});
    World.add(world, this.body);

    // Creates graphics
    // push();

    this.graphics = createGraphics(this.w, this.h);
    this.graphics.noStroke();
    this.graphics.fill(255,255,255,70);
    this.graphics.noSmooth();

    // this.graphics.rect(0, 0, this.w, this.h);
    // this.graphics.rect(0, this.h * .75, this.w, this.h);
    this.graphics.image(this.sprite, 0, 0, this.w, this.h);
    // pop();

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
    // fill(200, 216, 230, 70);
    // pointLight(250, 250, 250, width/2, height/2, 50);
    // glassGraphics
    // this.graphics.background('rgba(255,255,255,80)');

    image(this.graphics,0,0,this.w, this.h)
    // rect(0, 0, this.w, this.h);
    // quad(this.body.vertices[1].x - pos.x, this.body.vertices[1].y - pos.y,
    //      this.body.vertices[2].x - pos.x, this.body.vertices[2].y - pos.y,
    //      this.body.vertices[3].x - pos.x, this.body.vertices[3].y - pos.y,
    //      this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y);
    // quad(this.body.vertices[1].x - pos.x, this.body.vertices[1].y - pos.y+75,
    //      this.body.vertices[2].x - pos.x, this.body.vertices[2].y - pos.y,
    //      this.body.vertices[3].x - pos.x, this.body.vertices[3].y - pos.y,
    //      this.body.vertices[0].x - pos.x, this.body.vertices[0].y - pos.y+75);
    pop();
  }
}
