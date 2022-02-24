// Defines the tile class
class Tile {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tileIndex = type;
    this.originalTileIndex = this.tileIndex;
    this.sprite = spriteDirtTiles;
    this.boundingBox = false
    this.timer = 0;
    this.maxTimer = 120;
    this.digIndex = 0;
    this.frameAmount = 13;
    this.dustSpriteWidth = spriteDust.width * tileScale / 14;
    this.dustSpriteHeight = spriteDust.height * tileScale;
    this.currentOpacity = 0;
  }

  // Timer
  move() {
    this.timer = max(this.timer - 1, 0);
    if (this.timer <= 0) {
      this.tileIndex = this.originalTileIndex;
      this.timer = 0;
    }

    if (this.timer > 0) {
      this.currentOpacity = max(255 - this.timer * 2 - 60, 0);
      if (this.digIndex < this.frameAmount) {
        this.digIndex += 1;
      } else if (this.digIndex >= this.frameAmount){
        this.digIndex = 0;
      }
    }
  }

  // Draws the tile
  display() {
    push();

    // Changes and draws the current tile
    image(this.sprite, this.x, this.y, this.size, this.size, this.tileIndex * tileSize, 0, tileSize, tileSize);

    // Timer for digging
    if (this.timer > 0) {

      // Draws the dug out tiles
      push();
      tint(255, this.currentOpacity);
      image(this.sprite, this.x, this.y, this.size, this.size, this.originalTileIndex * tileSize, 0, tileSize, tileSize);
      pop();


      // Draws dust when digging
      if (this.digIndex < this.frameAmount && this.timer > this.maxTimer - this.frameAmount){
        image(spriteDust,
            this.x - this.dustSpriteWidth/4,
            this.y - this.dustSpriteHeight/4,
            this.dustSpriteWidth,
            this.dustSpriteHeight,
            this.digIndex * this.dustSpriteWidth / tileScale,
            0,
            this.dustSpriteWidth / tileScale,
            this.dustSpriteHeight / tileScale);
      }
    }



    // Bounding box for debbugging
    if (this.boundingBox){
      noFill()
      stroke(255,0,0,127);
      rect(this.x, this.y, this.size, this.size);
    }
    pop();
  }
}
