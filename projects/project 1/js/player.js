// Defines the player class
class Player {
  constructor(x, y) {

    // Physics variables
    this.x = x;//- x % tileFinalSize;
    this.y = y;// - y % tileFinalSize;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.normalXVelocity = 4.5;
    this.normalYVelocity = 8;
    this.terminalXVelocity = this.normalXVelocity;
    this.terminalYVelocity = this.normalYVelocity;
    this.xDirection = 0;
    this.yDirection = 0;
    this.xCollide = false;
    this.yCollide = false;
    this.gravity = 0.3;
    this.jumpVelocity = -this.normalYVelocity;
    this.onGround = false;

    // Visual variables
    this.normalSprite = spritePlayer;
    this.diggingSprite = spriteDust;
    this.sprite = this.normalSprite;
    this.tileIndex = 0;
    this.state = 0;
    this.frameSpeed = 22;
    this.timer = 0;
    this.initialSpriteWidth = this.sprite.width * tileScale / 4;
    this.initialSpriteHeight = this.sprite.height * tileScale / 2;
    this.spriteWidth = this.initialSpriteWidth;
    this.spriteHeight = this.initialSpriteHeight;
    this.boundingBox = true;
    this.frameAmountWalking = 3;
    this.frameAmountDigging = 13;
    this.frameAmount = this.frameAmountWalking;

    // Digging
    this.digging = false;
    this.diggingVelocity = 6;
    this.diggingX = x;
    this.diggingY = y;
    this.maxDigCount = 40;
    this.digCount = this.maxDigCount;
  }

  // Updating the sprite
  updateSprite() {
    this.spriteWidth = this.sprite.width * tileScale / 4;
    this.spriteHeight = this.sprite.height * tileScale / 2;
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

    // Digging movement
    if (this.digging) {
      if (keyIsDown(UP_ARROW) == false && keyIsDown(87) == false && keyIsDown(DOWN_ARROW) == false && keyIsDown(83) == false) {
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
          if (this.xVelocity == 0) {
            this.xVelocity = this.xDirection * this.terminalXVelocity;
            this.yDirection = 0;
            this.yVelocity = 0
          }
        }
      }
      if (keyIsDown(RIGHT_ARROW) == false && keyIsDown(68) == false && keyIsDown(LEFT_ARROW) == false && keyIsDown(65) == false) {
        if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
          if (this.yVelocity == 0) {
            this.yVelocity = this.yDirection * this.terminalYVelocity;
            this.xDirection = 0;
            this.xVelocity = 0
          }
        }
      }
    }

    // Jumping
    if (keyIsDown(32) && this.onGround && this.digging == false) {
      this.yVelocity = this.jumpVelocity;
      this.onGround = false;
    }

    // Switching out of digging mode
    if (this.digging == true) {
      if (this.xCollide == false && this.yCollide == false && this.yVelocity < 0) {
        this.digging = false;
        this.digCount = this.maxDigCount;
        this.sprite = this.normalSprite;
        this.spriteWidth = this.initialSpriteWidth;
        this.spriteHeight = this.initialSpriteHeight;
        this.frameAmount = this.frameAmountWalking;
        this.terminalYVelocity = this.normalYVelocity;
        this.terminalXVelocity = this.normalXVelocity;
        this.yVelocity = this.jumpVelocity;
        this.onGround = false;
      }

    // Switching to digging mode
    } else {
      if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && this.onGround == true){
        if (keyIsDown(RIGHT_ARROW) == false && keyIsDown(68) == false && keyIsDown(LEFT_ARROW) == false && keyIsDown(65) == false) {
          this.digging = true;
          this.sprite = this.diggingSprite;
          this.spriteWidth = this.sprite.width * tileScale / 14;
          this.spriteHeight = this.sprite.height * tileScale;
          this.frameAmount = this.frameAmountDigging;
          this.terminalYVelocity = this.diggingVelocity;
          this.terminalXVelocity = this.diggingVelocity;
          this.yVelocity = this.terminalYVelocity;
          this.xVelocity = 0;
          // alignTiles();
        }
      }
    }


    // Acceleration and velocity
    if (this.digging == false) {
      // X velocity
      if (this.xCollide == false) {
        this.xVelocity += this.xDirection * this.acceleration;
      }
      // Gravity
      if (this.yCollide == false) {
        this.yVelocity += this.gravity;
      }
      // Stops the movement
      if (this.xDirection == 0) {
        this.xVelocity = 0;
      }
    }

    // Capping velocity
    this.xVelocity = constrain(this.xVelocity, -this.terminalXVelocity, this.terminalXVelocity);
    this.yVelocity = constrain(this.yVelocity, -this.terminalYVelocity, this.terminalYVelocity);

  }

  xCollision(obj) {
    // Colliding when walking
    if (this.digging == false) {
      if (this.x + this.spriteWidth / 4 + this.xVelocity >= obj.x &&
        this.x - this.spriteWidth / 4 + this.xVelocity <=  obj.x + obj.size &&
        this.y  - this.spriteHeight / 2 + 8 + this.yVelocity <= obj.y + obj.size &&
        this.y + this.spriteHeight / 2 + this.yVelocity  >= obj.y) {// &&
        // obj.tileIndex != 5) {
          this.xCollide = true;
          this.xVelocity = 0;
          return true;
      }
      this.xCollide = false;
      return false;
    }
    // Colliding when Digging
    else {
      if (this.x + this.spriteWidth / 4 + this.xVelocity>= obj.x &&
        this.x - this.spriteWidth / 4 + this.xVelocity <=  obj.x + obj.size &&
        this.y + this.spriteHeight / 4 + this.yVelocity <= obj.y + obj.size &&
        this.y + this.spriteHeight / 2 + this.yVelocity >= obj.y) {//&&
        this.xCollide = true;
        if (obj.tileIndex == 4 && this.xVelocity != 0){
          this.xVelocity *= -1;
        }
        return true;
      }
      this.xCollide = false;
      return false;
    }
  }

  yCollision(obj) {
    // Colliding when walking
    if (this.digging == false) {
      if (this.y + this.initialSpriteHeight / 2 + this.yVelocity + 1 >= obj.y &&
        this.y - this.initialSpriteHeight / 2 + 8 + this.yVelocity <=  obj.y + obj.size &&
        this.x - this.initialSpriteWidth / 4 + this.xVelocity <= obj.x + obj.size &&
        this.x + this.initialSpriteWidth / 4 + this.xVelocity >= obj.x) { //&&
        // obj.tileIndex != 5) {
          this.yCollide = true;
          this.onGround = true;
          this.yVelocity = 0;
          return true;
      }
      this.onGround = false;
      this.yCollide = false;
      return false;
    }
    // Colliding when Digging
    else {
      if (this.y + this.initialSpriteHeight / 2 + this.yVelocity >= obj.y &&
        this.y + this.initialSpriteHeight / 4 + this.yVelocity <=  obj.y + obj.size &&
        this.x - this.initialSpriteWidth / 4 + this.xVelocity <= obj.x + obj.size &&
        this.x + this.initialSpriteWidth / 4 + this.xVelocity >= obj.x) {
        this.yCollide = true;
        if (obj.tileIndex == 4 && this.yVelocity != 0){
          console.log(this.yVelocity);

          this.yVelocity *= -1;
        }
        return true;
      }
      this.yCollide = false;
      return false;
    }
  }



  // Draws the player
  display() {

    push();
    noSmooth();
    imageMode(CENTER);

    // Switching between animation states

    // Digging
    if (this.digging == true) {
      this.frameSpeed = 1;
    // Idle
    } else if (this.xVelocity == 0 && this.xDirection == 0) {

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
      if (this.tileIndex > this.frameAmount) {
        this.tileIndex = 0;
      }
    }

    // Draws the sprite
    if (this.digging == false){
      if (this.xVelocity < 0 || this.xDirection == -1) {
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
      } else if (this.xVelocity >= 0 || this.xDirection == 1) {
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
    } else {
      image(this.sprite,
            this.diggingX,
            this.diggingY,
            this.spriteWidth,
            this.spriteHeight,
            this.tileIndex * this.spriteWidth / tileScale,
            this.state * this.spriteHeight / tileScale,
            this.spriteWidth / tileScale,
            this.spriteHeight / tileScale);

    }

    // Draws the dig count
    push();
    fill(255);
    stroke(0);
    strokeWeight(3);
    textFont(pixelFont, 42);
    text(this.digCount, 40, 100);
    pop();


    // Draws the players bounding box for debbugging
    if (this.digging == false){
      if (this.boundingBox == true) {
        noFill();
        rect(this.x - this.spriteWidth / 2,
            this.y - this.spriteHeight / 2,
            this.spriteWidth,
            this.spriteHeight);
      }
    } else {
      if (this.boundingBox == true) {
        noFill();
        rect(this.x - this.spriteWidth / 4,
            this.y,
            this.spriteWidth / 2,
            this.spriteHeight / 2);
      }
    }

    pop();
  }
}
