/**
Fantastic Mr. Fox
Jackson Dunnigan

This project is inspired by fantastic Mr. Fox
*/

"use strict";


// Generation variables
let tileSize = 16
let tileScale = 3;
let tileFinalSize = tileSize * tileScale;
let mapSize = 128;
let state = 'title';
let tiles = [];
let objects = [];
let grid = [];

// Sprite Variables
let spriteBackground;
let spriteSkyBackground;
let spriteDirtTiles;
let spritePlayer;

// Defines Objects
let player;

/**
Loads Sprites and audio
*/
function preload() {
  spriteBackground = loadImage('assets/images/menuBackground.png');
  spriteSkyBackground = loadImage('assets/images/skyBackground.png');
  spriteDirtTiles = loadImage('assets/images/dirtTiles.png');
  spritePlayer = loadImage('assets/images/player.png');
  // spritePlayer = loadImage('assets/images/player.png');

}


/**
Sets up the map and classes
*/
function setup() {
  createCanvas(800,600)

  // Creates the player
  player = new Player(width / 2, height *.55);


  // Defines the tile and object arrays
  for (var y = 0; y < mapSize; y++) {
    tiles[y] = [];
    // objects[y] = [];

    // grid[y] = [];
    for (var x = 0; x < mapSize; x++) {
      tiles[y].push(null);
      // objects[y].push(null);
      // grid[y].push(null);
    }
  }

  // Generates the map
  for (var y = mapSize/2 + 5; y < mapSize; y++) {
    for (var x = 0; x < mapSize; x++) {

      //Generates tiles
      tiles[y][x] = new Tile((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                            (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                            tileFinalSize,
                            floor(random(8)));
    }
  }
}

/**
Draws the game
*/
function draw() {
  background(0);
  noSmooth()

  // Changes states
  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
}

/**
Changing Game States
*/
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}

/**
Menu state
*/
function title() {
  push();
  background(spriteBackground);
  pop();
}

/**
Simulation States
*/
function simulation() {
  // Background
  // background(spriteSkyBackground);
  image(spriteSkyBackground, 0, 0, width * 2, height);


  // Player collision
  var xCollide = false;
  var yCollide = false;
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        xCollide = player.xCollision(tiles[y][x]);
        yCollide = player.yCollision(tiles[y][x]);
      }
    }
  }


  // Moving tiles
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {

      // X collision
      if (xCollide == false) {
        if (tiles[y][x] != null) {
          tiles[y][x].x -= player.xVelocity;
          // tiles[y][x].bboxX -= player.xVelocity;
        }
        // tiles[y][x].x -= player.xVelocity;
      }

      // Y collision
      if (yCollide == false) {
        if (tiles[y][x] != null && player.onGround == false) {
          tiles[y][x].y -= player.yVelocity;
          // tiles[y][x].bboxY -= player.yVelocity;
        }
        // tiles[y][x].y -= player.yVelocity;
      }

      // Draws the tiles
      if (tiles[y][x] != null
        && tiles[y][x].x + tileFinalSize > 0 && tiles[y][x].x < width
        && tiles[y][x].y + tileFinalSize > 0 && tiles[y][x].y < height) {
        tiles[y][x].display();
      }
    }
  }

  // Draws the players
  player.display();
  player.move();
}
