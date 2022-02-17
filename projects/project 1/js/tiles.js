// Defines the tile class
class Tile {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tileIndex = type;
    this.sprite = spriteDirtTiles;
    // this.bboxX = this.x + tileSize;
    // this.bboxY = this.y - tileSize * 2;
    // this.bboxWidth = tileSize;
    // this.bboxHeight = tileSize;

  }

  // Draws the tile
  display() {
    push();
    image(this.sprite, this.x, this.y, this.size, this.size, this.tileIndex * tileSize, 0, tileSize, tileSize);
    pop();
  }
}
