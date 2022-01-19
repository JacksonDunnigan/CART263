// SausageDog
// An extension of the Animal class
// Adds the idea of being found when clicked
// and spinning when found

class SausageDog extends Animal {
  // constructor(x,y,image)
  // Calls the super constructor
  // Adds properties for being found and for a rotation speed
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;

    // Timer if you take too long
    this.helpTimer = 0;
    this.maxHelpTimer = 800;

    // Victory timer
    this.victoryTimer = 0;
    this.maxVictoryTimer = 120;
  }

  // update()
  // Calls the super update() and changes angle if found (to rotate!)
  update() {
    super.update();

    // Help timer
    this.helpTimer = min(this.helpTimer + 1,this.maxHelpTimer);
    if (this.helpTimer == this.maxHelpTimer) {
      this.helpTimer = 0;
    }

    // Logic for finding the dog
    if (this.found) {
      this.victoryTimer = min(this.victoryTimer + 1, this.maxVictoryTimer);
      this.angle += this.rotationSpeed;
    }
    // Timer for switching to the end screen
    if (this.victoryTimer == this.maxVictoryTimer) {
      state = 'victory';
    }
  }

  // mousePressed()
  // Checks if this sausage dog was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      score += 1;
      this.found = true;
    }
  }
}
