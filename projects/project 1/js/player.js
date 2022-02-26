// Defines the player class
class Player {
  constructor(x, y) {

    // Physics variables
    this.x = x;
    this.y = y;
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
    this.boundingBox = false;
    this.frameAmountWalking = 3;
    this.frameAmountDigging = 13;
    this.frameAmount = this.frameAmountWalking;

    // Digging
    this.digging = false;
    this.diggingVelocity = 5;
    this.diggingX = x;
    this.diggingY = y;
    this.maxDigCount = 25;
    this.digCount = this.maxDigCount;
    this.currentTile;
    this.bottleCount = 0;


  }

  // Updating the sprite
  updateSprite() {
    this.spriteWidth = this.sprite.width * tileScale / 4;
    this.spriteHeight = this.sprite.height * tileScale / 2;
  }

  // Moving and interaction logic
  move() {

    // Keyboard input
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.xDirection = 1;
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.xDirection = -1;
    } else {
      this.xDirection = 0;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.yDirection = -1;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.yDirection = 1;
    } else {
      this.yDirection = 0;
    }

    // Digging movement
    if (this.digging) {
      if (keyIsDown(UP_ARROW) == false
      && keyIsDown(87) == false
      && keyIsDown(DOWN_ARROW) == false
      && keyIsDown(83) == false) {
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
          if (this.xVelocity == 0) {
            this.xVelocity = this.xDirection * this.terminalXVelocity;
            this.yDirection = 0;
            this.yVelocity = 0
          }
        }
      }
      if (keyIsDown(RIGHT_ARROW) == false
      && keyIsDown(68) == false
      && keyIsDown(LEFT_ARROW) == false
      && keyIsDown(65) == false) {
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
    if (keyIsDown(32)
    && this.onGround
    && this.digging == false) {
      soundJump.play();
      this.yVelocity = this.jumpVelocity;
      this.onGround = false;
    }

    // Switching out of digging mode
    if (this.digging == true) {
      if (this.xCollide == false
        && this.yCollide == false
        && this.yVelocity < 0) {
        soundJump.play();
        this.digging = false;
        this.digCount = this.maxDigCount;
        // this.sprite = this.normalSprite;
        // this.spriteWidth = this.initialSpriteWidth;
        // this.spriteHeight = this.initialSpriteHeight;
        this.frameAmount = this.frameAmountWalking;
        this.terminalYVelocity = this.normalYVelocity;
        this.terminalXVelocity = this.normalXVelocity;
        this.yVelocity = this.jumpVelocity;
        this.onGround = false;
      }

    // Switching to digging mode
    } else {
      if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && this.onGround == true){
        if (keyIsDown(RIGHT_ARROW) == false
        && keyIsDown(68) == false
        && keyIsDown(LEFT_ARROW) == false
        && keyIsDown(65) == false) {
          this.digging = true;
          this.terminalYVelocity = this.diggingVelocity;
          this.terminalXVelocity = this.diggingVelocity;
          this.yVelocity = this.terminalYVelocity;
          this.xVelocity = 0;
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
          this.digCount = max(this.digCount - 5, 0);
          this.xVelocity *= -1;
          soundBeep.play();
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
        this.x + this.initialSpriteWidth / 4 + this.xVelocity >= obj.x) {

          if (this.onGround == false && this.yVelocity == this.terminalYVelocity){
            soundDig.play();
          }
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
          this.digCount = max(this.digCount - 5, 0);
          this.yVelocity *= -1;
          soundBeep.play();
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
        this.tileIndex = 0;
      }
      this.frameSpeed = 16;

    // Moving
    } else {

      // Resets the timer when switching states
      if (this.state == 0) {
        this.state = 1;
        this.timer = 0;
        this.tileIndex = 0;
        soundWalk.play();
      }
      this.frameSpeed = 10;
    }

    // Switches the current frame
    this.timer += 1;
    if (this.timer % this.frameSpeed == 0) {
      this.tileIndex += 1;
      if (this.state == 1 && this.tileIndex % 2 == 0 && abs(this.yVelocity) < 1) {
        soundWalk.play();
      }
      if (this.tileIndex > this.frameAmount) {
        this.tileIndex = 0;
      }
    }

    // Draws the sprite
    if (this.digging == false) {
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
    }

    // Draws the dig count
    if (this.digging == true) {
      push();
      if (this.digCount > 15){
        fill(0,255,0);
      } else if (this.digCount > 8) {
        fill(255,240,0);
      } else {
        fill(240,0,0);
      }
      stroke(0);
      strokeWeight(3);
      textFont(pixelFont, 36);
      text(this.digCount, this.x + tileFinalSize * .9 + this.xVelocity * 5, this.y + tileFinalSize * .1 + this.yVelocity * 2);
      image(spriteShovel,  this.x + tileFinalSize * .4 + this.xVelocity * 5, this.y - tileFinalSize * .3 + this.yVelocity * 2, spriteShovel.width * tileScale * 1.5, spriteShovel.height * tileScale * 1.5)
      pop();
    }

    // Draws the score
    if (state === 'simulation'){
      push();
      fill(255);
      stroke(0);
      strokeWeight(3);
      textFont(pixelFont, 36);
      text(this.bottleCount, tileFinalSize * 1.6, tileFinalSize * 1.25);
      image(spriteBottle,  tileFinalSize*.75, tileFinalSize*.75, spriteShovel.width * tileScale * 3, spriteShovel.height * tileScale * 3);
      pop();
    }

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
