/**
Fantastic Mr. Fox
Jackson Dunnigan

This project is inspired by fantastic Mr. Fox
*/

"use strict";


// Generation variables
let tileSize = 32
let tileScale = 2.5;
let tileFinalSize = tileSize * tileScale;
let mapSize = 32;
let state = 'title';
let tiles = [];
let objects = [];
let grid = [];

// Sprite Variables
let spriteBackground;
let spriteSkyBackground;
let spriteDirtTiles;
let spritePlayer;
let spriteDust;

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
  spriteDust = loadImage('assets/images/dust.png');

  // spritePlayer = loadImage('assets/images/player.png');

}


/**
Sets up the map and classes
*/
function setup() {
  createCanvas(1000,700)

  // Creates the player
  player = new Player(width / 2, height *.55);

  // Defines the tile and object arrays
  for (var y = 0; y < mapSize; y++) {
    tiles[y] = [];
    for (var x = 0; x < mapSize; x++) {
      tiles[y].push(null);
    }
  }

  // Generates the map
  for (var y = mapSize/2 + 5; y < mapSize; y++) {
    for (var x = 0; x < mapSize; x++) {

      // Generates grass tiles
      if (tiles[y-1][x] == null) {
        tiles[y][x] = new Tile((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                              (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                              tileFinalSize,
                              2);
      // Generates dirt tiles
      } else {
        tiles[y][x] = new Tile((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                              (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                              tileFinalSize,
                              1);
      }
    }
  }
}

/**
Aligns the tiles
*/
function alignTiles() {
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        // Moving y tiles
        // if (tiles[y][x].y % tileFinalSize < tileFinalSize/2){
        //   tiles[y][x].y -= tiles[y][x].y % tileFinalSize;
        // }
        // else {
        //   tiles[y][x].y += tiles[y][x].y % tileFinalSize;
        // }
        // Moving x tiles
        if (tiles[y][x].x % tileFinalSize < tileFinalSize/2){
          tiles[y][x].x -= tiles[y][x].x % tileFinalSize + tileFinalSize/2;
        }
        else {
          tiles[y][x].x += (tiles[y][x].x % tileFinalSize) - tileFinalSize/2;
        }
      }
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
  image(spriteSkyBackground, 0, 0, width * 2, height);

  // Player collision
  var xCollide = false;
  var yCollide = false;

  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      // if (tiles[y][x].tileIndex != 5) {
      if (tiles[y][x] != null && (xCollide == false && yCollide == false)) {
        xCollide = player.xCollision(tiles[y][x]);
        yCollide = player.yCollision(tiles[y][x]);

        // Digging holes
        if (player.digging == true && (xCollide == true || yCollide == true)){

          //Changes the tiles to be dug out
          tiles[y][x].tileIndex = 5;
          player.diggingY = tiles[y][x].y + tileFinalSize/2;
          player.diggingX = tiles[y][x].x + tileFinalSize/2;
        }
      }
    }
  }
  player.xCollide = xCollide;
  player.yCollide = yCollide;

  // Moving tiles
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {

      // Non digging movement
      if (player.digging == false && tiles[y][x] != null) {
        // X collision
        if (xCollide == false) {
          tiles[y][x].x -= player.xVelocity;
        }
        // Y collision
        if (yCollide == false) {
          if (player.onGround == false || player.digging == true) {
            tiles[y][x].y -= player.yVelocity;
          }
        }
      // Digging movement
      } else {
        // Snaps the y values to the player
        if (tiles[y][x] != null && player.xVelocity != 0) {
          tiles[y][x].x -= player.xVelocity;
        }
        // Snaps the x values to the player
        if (tiles[y][x] != null && player.yVelocity != 0) {
          tiles[y][x].y -= player.yVelocity;
        }
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
  player.move();
  player.display();
}
