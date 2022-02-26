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
let mapWidth = 128;
let mapHeight = 128;
let startHeight = mapHeight/2 + 3;
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
let spriteHills;
let spriteHills2;
let spriteShovel;
let spriteBottle;

// Sounds
let soundWalk;
let soundDig;
let soundDig2;
let soundJump;
let soundDeath;
let soundBeep;
let soundInteract;

// Fonts
let pixelFont;

// Defines Objects
let player;

/**
Loads Sprites and audio
*/
function preload() {
  // Loads sprites
  spriteBackground = loadImage('assets/images/menuBackground.png');
  spriteSkyBackground = loadImage('assets/images/skyBackground.png');
  spriteDirtTiles = loadImage('assets/images/dirtTiles.png');
  spritePlayer = loadImage('assets/images/player.png');
  spriteDust = loadImage('assets/images/dust.png');
  spriteHills = loadImage('assets/images/hills.png');
  spriteHills2 = loadImage('assets/images/hills2.png');
  spriteShovel = loadImage('assets/images/shovel.png');
  spriteBottle = loadImage('assets/images/bottle.png');

  // Loads Sounds
  soundWalk = loadSound('assets/sounds/walk.wav');
  soundDig = loadSound('assets/sounds/dig.wav');
  soundDig2 = loadSound('assets/sounds/dig2.wav');
  soundJump = loadSound('assets/sounds/jump.wav');
  soundDeath = loadSound('assets/sounds/death.wav');
  soundBeep = loadSound('assets/sounds/beep.wav');
  soundInteract = loadSound('assets/sounds/interaction.wav');

  // Loads fonts
  pixelFont = loadFont('assets/Minecraftia.ttf');
}

/**
Sets up the map and classes
*/
function setup() {
  createCanvas(1000, 700)

  // Creates the player
  player = new Player(width / 2, height * .55 + 12);

  // Defines the tile and object arrays
  for (var y = 0; y < mapHeight; y++) {
    tiles[y] = [];
    for (var x = 0; x < mapWidth; x++) {
      tiles[y].push(null);
    }
  }

  // Generates the map
  for (var y = startHeight; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {

      // Generates grass tiles
      if (tiles[y-1][x] == null) {
        tiles[y][x] = new Tile((x - (mapWidth/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                              (y - (mapHeight/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                              tileFinalSize,
                              2);
      // Generates rock tiles
      } else if (y >= mapHeight -25 || floor(random(24)) == 1) {
            tiles[y][x] = new Tile((x - (mapWidth/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                                  (y - (mapHeight/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                                  tileFinalSize,
                                  4);

      // Generates bottles
      } else if (y >= startHeight + 5 && floor(random(120)) == 1) {
            tiles[y][x] = new Tile((x - (mapWidth/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                                  (y - (mapHeight/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                                  tileFinalSize,
                                  3);
      // Generates shovels
      } else if (y >= startHeight + 5 && floor(random(80)) == 1) {
              tiles[y][x] = new Tile((x - (mapWidth/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                                    (y - (mapHeight/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
                                    tileFinalSize,
                                    6);
      // Generates dirt tiles
      } else {
        tiles[y][x] = new Tile((x - (mapWidth/2) + floor(width / tileFinalSize) / 2) * tileFinalSize ,
                              (y - (mapHeight/2) + floor(height / tileFinalSize) / 2) * tileFinalSize,
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
  else if (state === `gameOver`) {
    gameOver();
  }
}

/**
Changing Game States
*/
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
    soundBeep.play();
  } else if (state === `gameOver`) {

    // Clears the map
    for (var y = 0; y < tiles.length; y++) {
      for (var x = 0; x < tiles[y].length; x++) {
        tiles[y].splice(x);
      }
    }
    state = `title`;
    soundBeep.play();
    setup();
  }
}
function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
    soundBeep.play();
  } else if (state === `gameOver`) {

    // Clears the map
    for (var y = 0; y < tiles.length; y++) {
      for (var x = 0; x < tiles[y].length; x++) {
        tiles[y].splice(x);
      }
    }
    state = `title`;
    soundBeep.play();
    setup();
  }
}

/**
Menu state
*/
function title() {
  image(spriteSkyBackground, 0, 0, width * 2, height);
  image(spriteHills2, 0, height * .45, width * 2, height);
  image(spriteHills, 0, height * .5, width * 2, height);

  player.display();
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null &&
        tiles[y][x].x + tileFinalSize > 0 && tiles[y][x].x < width &&
        tiles[y][x].y + tileFinalSize > 0 && tiles[y][x].y < height) {
          tiles[y][x].display();
        }
      }
    }
    push();
    textFont();
    fill(255);
    stroke(0);
    strokeWeight(1);
    textAlign(CENTER);
    textFont(pixelFont, 64);
    text('Super Cider Stealer', width /2, height * .24);
    textSize(28);
    text('dig up as much cider as you can', width /2, height * .26);
    // textSize(12);
    text('press any key to play', width /2, height * .95);
    pop();
  }



/**
Simulation States
*/
function simulation() {
  image(spriteSkyBackground, 0, 0, width * 2, height);
  image(spriteHills2, 0, height*.45, width * 2, height);
  image(spriteHills, 0, height*.5, width * 2, height);

  // Player collision
  var xCollide = false;
  var yCollide = false;

  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        if(xCollide == false && yCollide == false) {
          xCollide = player.xCollision(tiles[y][x]);
          yCollide = player.yCollision(tiles[y][x]);

          // Digs a hole
          if (player.digging == true &&
            tiles[y][x].timer <= 100 &&
            tiles[y][x].tileIndex != 4 &&
            (xCollide == true || yCollide == true)) {

              // Picking up shovels
              if (tiles[y][x].tileIndex == 6) {
                player.digCount += 10;
                tiles[y][x].originalTileIndex = 1;
                soundInteract.play();
              }
              // Collecting Cider
              if (tiles[y][x].tileIndex == 3) {
                player.bottleCount += 1;
                tiles[y][x].originalTileIndex = 1;
                soundInteract.play();
              }

              // Changes the tiles to be dug out
              tiles[y][x].timer = tiles[y][x].maxTimer;
              player.currentTile = tiles[y][x];

              // Only digs if the tile hasn't already been dug out
              if (tiles[y][x].tileIndex != 5) {
                tiles[y][x].tileIndex = 5;
                // player.diggingY = tiles[y][x].y + tileFinalSize/2;
                // player.diggingX = tiles[y][x].x + tileFinalSize/2;
                soundDig.play();
                player.digCount = max(player.digCount - 1, 0);
              } else {
                soundDig2.play();
              }

              // Game over if out of digs
              if (player.digCount <= 0) {
                state = 'gameOver';
                soundDeath.play();
            }
          }
        }
      }
    }
  }

  player.xCollide = xCollide;
  player.yCollide = yCollide;

  // Moving tiles
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null){
        // Non digging movement
        if (player.digging == false) {
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
          if (player.xVelocity != 0) {
            tiles[y][x].x -= player.xVelocity;
          }
          // Snaps the x values to the player
          if (player.yVelocity != 0) {
            tiles[y][x].y -= player.yVelocity;
          }
        }
        // Updates tile information
        tiles[y][x].move();


        // Draws the tiles
        if (tiles[y][x].x + tileFinalSize > 0 && tiles[y][x].x < width
          && tiles[y][x].y + tileFinalSize > 0 && tiles[y][x].y < height) {
          tiles[y][x].display();
        }
      }
    }
  }

  // Draws the players
  player.move();
  if (player.currentTile != null) {
    player.currentTile.display();

  }
  player.display();

}

/**
Game over*/
function gameOver() {
  image(spriteSkyBackground, 0, 0, width * 2, height);
  image(spriteHills2, 0, height*.45, width * 2, height);
  image(spriteHills, 0, height*.5, width * 2, height);

  // Draws the tiles
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null &&
        tiles[y][x].x + tileFinalSize > 0 && tiles[y][x].x < width &&
        tiles[y][x].y + tileFinalSize > 0 && tiles[y][x].y < height) {
          tiles[y][x].display();
      }
    }
  }
  push();
  fill(255);
  textAlign(CENTER);
  stroke(0);
  strokeWeight(3);
  textFont(pixelFont, 56);
  textStyle(BOLD);
  text('Game Over', width/2, height/2);
  pop();


}
