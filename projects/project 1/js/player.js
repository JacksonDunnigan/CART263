// Defines the player class
class Player {
  constructor(x, y) {

    // Physics variables
    this.x = x;
    this.y = y;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.terminalXVelocity = 3.5;
    this.terminalYVelocity = 3.5;
    this.xDirection = 0;
    this.yDirection = 0;
    this.xCollide = false;
    this.yCollide = false;

    // Visual variables
    this.sprite = spritePlayer;
    this.tileIndex = 0;
    this.state = 0;
    this.frameSpeed = 16;
    this.timer = 0;
    this.size = this.sprite.width * tileScale / 8;
    this.spriteWidth = this.sprite.width * tileScale / 4;
    this.spriteHeight = this.sprite.height * tileScale / 2;

    // Inventory
    // this.inventory = [];
    // this.inventorySize = 24;
    //
    //
    // // Synth
    // soundMove.volume(0.25);
  }



  // Moving and interaction logic
  move() {

    // Keyboard input
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){ // && this.xCollide == false) {
      this.xDirection = 1;
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){ //&& this.xCollide == false) {
      this.xDirection = -1;
    } else {
      this.xDirection = 0;
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // && this.yCollide == false) {
      this.yDirection = -1;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){ //&& this.yCollide == false) {
      this.yDirection = 1;
    } else {
      this.yDirection = 0;
    }

    // Adds acceleration to the velocity
    if (this.xCollide == false) {
      this.xVelocity += this.xDirection * this.acceleration;
    }

    if (this.yCollide == false) {
      this.yVelocity += this.yDirection * this.acceleration;
    }

    // Adds deceleration to the velocity
    if (this.xDirection == 0) {
      this.xVelocity = 0;
    }

    if (this.yDirection == 0) {
      this.yVelocity = 0;
    }
    // Capping the x velocity
    this.xVelocity = constrain(this.xVelocity, -this.terminalXVelocity, this.terminalXVelocity);
    this.yVelocity = constrain(this.yVelocity, -this.terminalYVelocity, this.terminalYVelocity);

  //
  //   // Plays sound when walking
  //   if ((this.xVelocity != 0 || this.yVelocity != 0) && frameCount % 20 == 0) {
  //     soundMove.play();
  //   }
  // }

  xCollision(obj) {
    if (this.xDirection != 0 &&
      this.x + this.size / 2 + this.xVelocity >= obj.bboxX &&
      this.x - this.size / 2 + this.xVelocity <=  obj.bboxX + obj.bboxWidth &&
      this.y  + this.yVelocity <= obj.bboxY + obj.bboxHeight &&
      this.y + this.size / 2 + this.yVelocity >= obj.bboxY) {
      this.xVelocity = 0;
      this.xCollide = true;
      return true;
    }

    this.xCollide = false;
    return false;
  }

  yCollision(obj) {
    if (this.yDirection != 0 &&
      this.y + this.size / 2 + this.yVelocity >= obj.bboxY &&
      this.y  + this.yVelocity <=  obj.bboxY + obj.bboxHeight &&
      this.x - this.size / 2 + this.xVelocity <= obj.bboxX + obj.bboxWidth &&
      this.x + this.size / 2 + this.xVelocity >= obj.bboxX) {
      this.yVelocity = 0;
      this.yCollide = true;
      return true;
    }
    this.yCollide = false;
    return false;

  }

  // Draws the player
  display() {

    push();
    noSmooth();
    imageMode(CENTER);

    // Switching between idle and moving states

    // Moving
    if (this.xVelocity == 0 && this.yVelocity == 0) {

      // Resets the timer when switching states
      if (this.state == 1) {
        this.state = 0;
        this.timer = 0;
      }

      this.frameSpeed = 16;

    // Idle
    } else {

      // Resets the timer when switching states
      if (this.state == 0) {
        this.state = 1;
        this.timer = 0;
      }

      this.frameSpeed = 11;//floor(this.xVelocity)*5;
    }

    // Switches the current frame
    this.timer += 1;
    if (this.timer % this.frameSpeed == 0) {
      this.tileIndex += 1;
      if (this.tileIndex > 3) {
        this.tileIndex = 0;
      }
    }

    // Draws the sprite
    if (this.xVelocity < 0) {
      push();
      scale(-1, 1);
      image(this.sprite, -this.x, this.y, this.spriteWidth, this.spriteHeight, this.tileIndex * this.spriteWidth/4, this.state * this.spriteHeight/4, this.spriteWidth/4, this.spriteHeight/4);
      pop();
    } else if (this.xVelocity >= 0) {
      image(this.sprite, this.x, this.y, this.spriteWidth, this.spriteHeight, this.tileIndex * this.spriteWidth/4, this.state * this.spriteHeight/4, this.spriteWidth/4, this.spriteHeight/4);
    }

    pop();
  }
}

// Shadow object
// class Shadow {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.spriteWidth = spriteShadow.width * tileScale;
//     this.spriteHeight= spriteShadow.height * tileScale;
//   }
//
//
//   // Draws the shadow
//   display() {
//     push();
//     imageMode(CENTER);
//     image(spriteShadow, this.x + tileSize/8, this.y + this.spriteHeight * 2, this.spriteWidth, this.spriteHeight);
//     pop();
//   }
// }
