"use strict";

/*****************
Spy Profile Generator
Pippin Barr
Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again.
Uses:
Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/
******************/

// URLs to JSON data
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};
// Array of profiles
let profileList = [];

// Defining the reset button
let button;
let accepted;

// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;

/**
Loads the JSON data used to generate the profile
*/
function preload() {
  tarotData = loadJSON(TAROT_DATA_URL);
  objectsData = loadJSON(OBJECT_DATA_URL);
  instrumentsData = loadJSON(INSTRUMENT_DATA_URL);
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {

  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Creates a button to reset the name
  button = createButton('Reset Profile');
  button.position(63, 235);
  button.style('background-color',color(0,0,0));
  button.style('font-size','22px');
  button.style('color',color(0,255,0));
  button.style('font-family','Courier New');
  button.style('transition-duration','0.1s');
  button.style('width','200px');
  button.style('height','40px');
  button.style('border', '2px solid #00FF00');

  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  // Check if there was data to load
  if (data) {
    // If so, ask for the password
    let password = prompt(`What's ya password?`);
    // Prints the password for debugging
    console.log(data.password);
    // Check if the password is correct
    if (password === data.password) {
      // If is is, then setup the spy profile with the data
      accepted = true;
      setupSpyProfile(data);
    } else {
      accepted = false;
    }
  }
  else {
    // If there is no data, generate a spy profile for the user
    generateSpyProfile();
  }
}

/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
}

/**
Generates a spy profile from JSON data
*/

function generateSpyProfile() {
  if (spyProfile.name == null || spyProfile.name == `**REDACTED**`) {
    spyProfile.name = prompt(`What's ya name?`);
  }
  // Generate an alias from a random instrument
  spyProfile.alias = `The ${random(instrumentsData.instruments)}`;
  // Generate a secret weapon from a random object
  spyProfile.secretWeapon = random(objectsData.objects);
  // Generate a password from a random keyword for a random tarot card
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  // Adds the name to a list
  profileList.push(spyProfile);

  // Save the resulting profile to local storage
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
}
// Whipes the profile
function resetName() {

  if (accepted == true) {
    localStorage.setItem(PROFILE_DATA_KEY, null);
    console.log(1);
    generateSpyProfile()
  }
}
// Changed the background
function changeButton(){
  button.style('background-color',color(0,255,0));
  button.style('color',color(0,0,0));
}
function revertButton(){
  button.style('background-color',color(0,0,0));
  button.style('color',color(0,255,0));

}
/**
Displays the current spy profile.
*/
function draw() {
  background(0);

  // Updates the button
  // button.style('background-color',color(0,0,0));
  button.mouseOver(changeButton);
  button.mouseOut(revertButton);
  button.mousePressed(resetName);

  // Generate the profile as a string using the data
  let spyText = `** TOP SECRET SPY PROFILE **
  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  // Display the profile
  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textFont(`Courier, monospace`);
  fill(0,255,0);
  text(spyText, 25, 25);
  pop();
}
