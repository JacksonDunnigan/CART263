
// Buckets
class Buckets extends Ground {
  constructor(x, y, w, h, isStatic, sprite) {
    super(x, y, w, h, isStatic, sprite);
    this.bounds = Bounds.create(this.body.vertices);
    this.inBounds = false;
    this.newObject = null;
    this.holdingConstraint = null;
    this.objectSize = 50;

  }
  move(){
    // Creates ice cubes and limes
    Bounds.update(this.bounds, this.body.vertices,0);
    this.inBounds = (Bounds.contains(this.bounds, {x: mouseX, y: mouseY}));

    // Only creates ice cubes if the mouse is within the boundaries of the buckets
    if (this.inBounds) {
      if (mouseIsPressed && this.newObject == null) {
        this.inBounds = true;

        // Decides what type of object should be created

        // Creates ice
        if (mouseX > width * 2/3) {
          this.newObject = new Ice(mouseX, mouseY, this.objectSize, this.objectSize, 0);

        // Creates cherries
        } else if (mouseX > width / 3) {
          this.newObject = new Cherry(mouseX, mouseY, this.objectSize*.85, this.objectSize*.85, 0);
        // Creates oranges
        } else {
        this.newObject = new Orange(mouseX, mouseY, this.objectSize, this.objectSize, 0);
        }


        // Creates the constraint
        this.holdingConstraint = Constraint.create({
             pointB: mouseConstraint.mouse.position,
             bodyA: this.newObject.body,
             stiffness: 0.9,
         });

        // Adds constraints to the world
        World.add(world, this.holdingConstraint);
        objectList.push(this.newObject);
      }

    // Switches the constraints back to normal
    } else {
      if (this.newObject != null && !mouseIsPressed) {
        World.remove(world, this.holdingConstraint, true);
        this.holdingConstraint = undefined;
        this.newObject = null;
      }
    }
  }
}
