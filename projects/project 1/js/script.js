/**
Fantastic Mr. Fox
Jackson Dunnigan

This project is inspired by fantastic Mr. Fox
*/

"use strict";


// Generation variables
let tileSize = 16
let tileScale = 4;
let tileFinalSize = tileSize * tileScale;
let mapSize = 128;
let state = 'title';
let tiles = [];
let grid = [];

// Sprite Variables
let spriteBackground;

// Defines Objects
let player;

/**
Loads Sprites and audio
*/
function preload() {
  spriteBackground = loadImage('assets/images/menubackground.png');
}


/**
Sets up the map and classes
*/
function setup() {
  createCanvas(800,600);

  // Creates the player
  player = new Player(width / 2, height / 2);


  // Defines the tile and object arrays
  for (var y = 0; y < mapSize; y++) {
    tiles[y] = [];
    grid[y] = [];
    for (var x = 0; x < mapSize; x++) {
      tiles[y].push(null);
      grid[y].push(null);
    }
  }

  // Generates the map
  for (var y = mapSize/2; y < mapSize; y++) {
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
  background(255,0,0);
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

}
