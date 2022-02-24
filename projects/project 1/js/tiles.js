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

  }
  // Timer
  move() {
    // if (this.tileIndex != this.originalTileIndex) {
    this.timer = max(this.timer - 1, 0);
    if (this.timer <= 0) {
      this.tileIndex = this.originalTileIndex;
      this.timer = 0;
    }

  }

  // Draws the tile
  display() {
    push();

    // Changes and draws the current tile
    // if (this.originalTileIndex != 4){
      image(this.sprite, this.x, this.y, this.size, this.size, this.tileIndex * tileSize, 0, tileSize, tileSize);
    // } else {
    //   image(this.sprite, this.x, this.y, this.size, this.size, this.originalTileIndex * tileSize, 0, tileSize, tileSize);
    // }

    // Timer for digging
    if (this.timer > 0){
      push();
      // max(this.timer * 2 - 60, 0)
      var tempOpacity = max(255 - this.timer * 2 - 60, 0); //max(this.timer * 2 - 60, 0) - (max(this.timer * 2 - 60, 0) % 20);
      tint(255, tempOpacity); // Display at half opacity
      image(this.sprite, this.x, this.y, this.size, this.size, this.originalTileIndex * tileSize, 0, tileSize, tileSize);
      pop();
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
