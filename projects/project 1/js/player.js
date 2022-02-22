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
    this.terminalYVelocity = 6;
    this.xDirection = 0;
    this.yDirection = 0;
    this.xCollide = false;
    this.yCollide = false;
    this.gravity = 0.3;
    this.jumpVelocity = -6;
    this.onGround = false;

    // Visual variables
    this.sprite = spritePlayer;
    this.tileIndex = 0;
    this.state = 0;
    this.frameSpeed = 22;
    this.timer = 0;
    this.spriteWidth = this.sprite.width * tileScale / 4;
    this.spriteHeight = this.sprite.height * tileScale / 2;

    // Digging
    this.digging = false;
    this.diggingVelocity = 5;
    this.nonDiggingVelocity = 6;

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

    // Input for Digging
    if (this.digging == true) {
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // && this.yCollide == false) {
        this.yDirection = -1;
      } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){ //&& this.yCollide == false) {
        this.yDirection = 1;
      } else {
        this.yDirection = 0;
      }

    // Allows jumping when not digging
    } else {
      // Jumping
      if (keyIsDown(32) && this.onGround) {
        this.yVelocity = this.jumpVelocity;
        this.onGround = false;
        console.log(1);
      }

      // Switching to digging mode
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){ //&& this.yCollide == false) {
        this.yCollide = false;
        this.xCollide = false;
        this.digging = true;
        this.terminalYVelocity = this.diggingVelocity;
        this.terminalXVelocity = this.diggingVelocity;

      }
    }


    // Adds acceleration and velocity
    if (this.digging == true) {
      // X velocity
      this.xVelocity += this.xDirection * this.acceleration;

      // Y velocity
      this.yVelocity += this.yDirection * this.acceleration;
      // console.log(this.yCollide);
      // Stops moving
      if (this.yDirection == 0) {
        this.yVelocity = 0;
      }
      if (this.xDirection == 0) {
        this.xVelocity = 0;
      }
    } else {
      // X velocity
      if (this.xCollide == false) {
        this.xVelocity += this.xDirection * this.acceleration;
      }

      // Y velocity and gravity
      if (this.yCollide == false) {
        this.yVelocity += this.gravity;
      }

      // Stops moving
      if (this.xDirection == 0) {
        this.xVelocity = 0;
      }
    }


    // Capping the x and y velocity
    this.xVelocity = constrain(this.xVelocity, -this.terminalXVelocity, this.terminalXVelocity);
    this.yVelocity = constrain(this.yVelocity, -this.terminalYVelocity, this.terminalYVelocity);

  }

  xCollision(obj) {
    if (this.x + this.spriteWidth / 2 + this.xVelocity >= obj.x &&
      this.x - this.spriteWidth / 2 + this.xVelocity <=  obj.x + obj.size &&
      this.y  + this.yVelocity <= obj.y + obj.size &&
      this.y + this.spriteHeight/2 + this.yVelocity >= obj.y &&
      this.digging == false) {
      // this.xVelocity = 0;
      this.xCollide = true;
      return true;
    }
    this.xCollide = false;
    return false;
  }

  yCollision(obj) {
    if (this.y + this.spriteHeight/2 + this.yVelocity - 3 >= obj.y &&
      this.y + this.yVelocity <=  obj.y + obj.size &&
      this.x - this.spriteWidth / 2 + this.xVelocity <= obj.x + obj.size &&
      this.x + this.spriteWidth / 2 + this.xVelocity >= obj.x &&
      this.digging == false) {
      // this.yVelocity = 0;
      this.yCollide = true;
      this.onGround = true;
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

    // Idle
    if (this.xVelocity == 0) {

      // Resets the timer when switching states
      if (this.state == 1) {
        this.state = 0;
        this.timer = 0;
      }

      this.frameSpeed = 16;

    // Moving
    } else {

      // Resets the timer when switching states
      if (this.state == 0) {
        this.state = 1;
        this.timer = 0;
      }

      this.frameSpeed = 10;//floor(this.xVelocity)*5;
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
      image(this.sprite,
            -this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight,
            this.tileIndex * this.spriteWidth / tileScale,
            this.state * this.spriteHeight / tileScale,
            this.spriteWidth / tileScale,
            this.spriteHeight / tileScale);
      pop();
    } else if (this.xVelocity >= 0) {
      image(this.sprite,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight,
            this.tileIndex * this.spriteWidth / tileScale,
            this.state * this.spriteHeight / tileScale,
            this.spriteWidth / tileScale,
            this.spriteHeight / tileScale);
    }
    // image(this.sprite, this.x, this.y, this.spriteWidth, this.spriteHeight);

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
