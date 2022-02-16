// Defines the object class
class Objects {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.sprite = spriteGrass;
    this.bboxWidth = tileSize;//
    this.bboxHeight = tileSize;
    this.bboxX = this.x + tileSize;
    this.bboxY = this.y + tileSize * 2;
    this.tileIndex = type;
    this.objectType = 'object';
    this.canSpawnMushrooms = false;
  }

  // Draws the tile
  display() {
    image(this.sprite, this.x, this.y, this.size, this.size, this.tileIndex * tileSize, 0, tileSize, tileSize);
  }
}
