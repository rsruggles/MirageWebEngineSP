/////////////////////////////////
//   Handle Player Character   //
/////////////////////////////////

// Player Variables
var walkSpeed = 2;
var runSpeed = 3;
var playerSprite = 0;  // Move to Player Model in the future

// Define Player
const Player = function(x,y,worldMap,isMoving,Dir,Speed,AnimDir,AnimStep){
  this.x = x; this.y = y;
  this.worldMap = worldMap;
  this.isMoving = isMoving;
  this.Dir = Dir;
  this.Speed = Speed;
  this.AnimDir = AnimDir;
  this.AnimStep = AnimStep;
};

// Get Player Tile Coordinates
function getPlayerTileCoord(x, y) {
  var mapDimension = max_map_X + 1;        
  var PlayerLoc = (Math.floor((y + scaled_size) / scaled_size) * max_map_X + Math.floor((x + scaled_size) / scaled_size) - mapDimension);
  return PlayerLoc;
}

// Handle Player Movement
Player.prototype = {
  moveX: function(x) {
    if (player.Dir === "Right") {
      //let PlayerLoc = getPlayerTileCoord(this.x + (scaled_size * 0.5), this.y);
      let PlayerLocTop = getPlayerTileCoord(this.x + (scaled_size * 0.5), this.y - (scaled_size * 0.5 - 6));
      let PlayerLocBottom = getPlayerTileCoord(this.x + (scaled_size * 0.5), this.y + (scaled_size * 0.5 - 6));
      // Check Map Boundaries
      if ((this.x += (x)) >= ((max_map_X * scaled_size) - (scaled_size * 0.5))) {
        this.x = (max_map_X * scaled_size) - (scaled_size * 0.5);
        player.isMoving = false;
      // Check Collision Boundaries
      } else if (/*activeMap.Collisions[PlayerLoc].right == "True" || */
                 activeMap.Collisions[PlayerLocTop].right == "True" ||
                 activeMap.Collisions[PlayerLocBottom].right == "True") {
        player.isMoving = false;
        this.x -= (x);
      } else {
        this.x += (x);
      }
    } else if (player.Dir === "Left") {
      //let PlayerLoc = getPlayerTileCoord(this.x - (scaled_size * 0.5), this.y);
      let PlayerLocTop = getPlayerTileCoord(this.x - (scaled_size * 0.5), this.y - (scaled_size * 0.5 - 6));
      let PlayerLocBottom = getPlayerTileCoord(this.x - (scaled_size * 0.5), this.y + (scaled_size * 0.5 - 6));
      if ((this.x -= (x)) <= (0 + (scaled_size * 0.5))) {
        this.x = (0 + (scaled_size * 0.5));
        player.isMoving = false;
      } else if (/*activeMap.Collisions[PlayerLoc].left == "True" || */
                 activeMap.Collisions[PlayerLocTop].left == "True" ||
                 activeMap.Collisions[PlayerLocBottom].left == "True") {
        player.isMoving = false;
        this.x += (x);
      } else {
        this.x -= (x);
      }
    }         
  },
  moveY: function(y) {
    if (player.Dir === "Up") {
      //let PlayerLoc = getPlayerTileCoord(this.x, this.y - (scaled_size * 0.5));
      let PlayerLocLeft = getPlayerTileCoord(this.x - (scaled_size * 0.5 -6), this.y - (scaled_size * 0.5));
      let PlayerLocRight = getPlayerTileCoord(this.x + (scaled_size * 0.5 -6), this.y - (scaled_size * 0.5));
      if ((this.y -= (y)) <= (0 + (scaled_size * 0.5))) {
        this.y = (0 + (scaled_size * 0.5));
        player.isMoving = false;
      } else if (/*activeMap.Collisions[PlayerLoc].up == "True" ||*/
                 activeMap.Collisions[PlayerLocLeft].up == "True" || 
                 activeMap.Collisions[PlayerLocRight].up == "True") {
        this.y += (y);
        player.isMoving = false;
      } else {
        this.y -= (y);
      }
    } else if (player.Dir === "Down") {
      //let PlayerLoc = getPlayerTileCoord(this.x, this.y + (scaled_size * 0.5));
      let PlayerLocLeft = getPlayerTileCoord(this.x - (scaled_size * 0.5 -6), this.y + (scaled_size * 0.5));
      let PlayerLocRight = getPlayerTileCoord(this.x + (scaled_size * 0.5 -6), this.y + (scaled_size * 0.5));
      if ((this.y += (y)) >= (max_map_Y * scaled_size) - (scaled_size * 0.5)) {
        this.y = (max_map_Y * scaled_size) - (scaled_size * 0.5);
        player.isMoving = false;
      } else if (/*activeMap.Collisions[PlayerLoc].down == "True" ||*/
                 activeMap.Collisions[PlayerLocLeft].down == "True" || 
                 activeMap.Collisions[PlayerLocRight].down == "True") {
        this.y -= (y);
        player.isMoving = false;
      } else {
        this.y += (y);
      }
    }
  }
};



//////////////////////////////////////////
//   Set Viewport (gameScreen camera)   //
//////////////////////////////////////////

// Define the Viewport Blueprint
const ViewPort = function(x, y, w, h) {
  this.x = x; this.y = y; this.w = w; this.h = h;
};

// Keep Viewport Centered on Player
ViewPort.prototype = {
  scrollToX:function(x) {
    this.x = x - this.w * 0.5;
  },
  scrollToY:function(y) {
    this.y = y - this.h * 0.5;
  }
};
      
      

///////////////////////////
//   Handle World Npcs   //
///////////////////////////

// Npc Variables
var maxNpcs = 100;
var Npcs = new Array();

// Create Npc Blueprint
function Npc(name, sprite) {
  this.name = name;
  this.sprite = sprite;
}

// Create New Unique Npc
function setNpc(id, name, sprite) {
  Npcs[id] = new Npc(name, sprite);
}

// Populate Blank Npcs
function loadNpcs() {
  let id = 0;
  for (id = 0; id < maxNpcs; id++) {
    let npc = new Npc("", 0); // Populate the Nps array with empty Npcs
    Npcs.push(npc);
  }
}
loadNpcs(); // In the future we'll only load blank Npcs if
            // there aren't any Npcs saved in the database



//////////////////////////////
//   General UI Variables   //
////////////////////////////// 
var chatBoxOpened = false;



////////////////////////////////
//   mapEditor UI Variables   //
////////////////////////////////
var worldGrid = true;
var worldColliders = true;
var mapEditorState = "Closed";
var mapEditorWinLoc = [0,0];
var mapEditorLayer = "Ground";
var mapCollider = ["True", "True", "True", "True"];
var mapAnimation = [0, 0, 0, 0];
var mapAnimFrame = false;   
var brush_Coord_X = 0;
var brush_Coord_Y = 0;



////////////////////////////////////
//   worldMap Generation Engine   //
////////////////////////////////////

// gameWorld Variables
var worldMaps = new Array();
var maxWorldMaps = 25;
var activeMap = 0;
var tile_size = 32;
var scaled_size = 96;      
var max_map_X = 255; // Game doesn't behave if these values aren't equal. Why?
var max_map_Y = 255; // Game doesn't behave if these values aren't equal. Why?
      
// mapTile Blueprint (ground, mask, mask2, fringe, fringe 2)   
function mapTile(posX, posY) {
  this.PosX = posX;
  this.PosY = posY;
}

// mapAnimationTiles Blueprint (animation)
function mapAnimTile(posX1, posY1, posX2, posY2) {
  this.PosX_1 = posX1;
  this.PosY_1 = posY1;
  this.PosX_2 = posX2;
  this.PosY_2 = posY2;
}

// mapCollisionTiles Blueprint (colliders)
function mapCollision(posX, posY, up, down, left, right) {
  this.PosX = posX;
  this.PosY = posY;
  this.up = up;
  this.down = down;
  this.left = left;
  this.right = right;
}

// Generate Empty Ground Layer
function setGround() {
  var Grounds = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var Ground = new mapTile(1, 0); // Fill world with grass
      Grounds.push(Ground);
    } 
  }
  return Grounds;
}

// Generate Empty Animations Layer
function setAnimation() {
  var Animations = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var mapAnim = new mapAnimTile(0, 0, 0, 0); // Fill world with void
      Animations.push(mapAnim);
    } 
  }
  return Animations;
}

// Generate Emtpy Mask Layer
function setMask() {
  var Masks = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var Mask = new mapTile(0, 0); // Fill world with void
      Masks.push(Mask);
    } 
  }
  return Masks;
}

// Generate Empty Mask2 Layer
function setMask2() {
  var Masks = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var Mask2 = new mapTile(0, 0); // Fill world with void
      Masks.push(Mask2);
    } 
  }
  return Masks;
}

// Generate Empty Fringe Layer
function setFringe() {
  var Fringes = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var Fringe = new mapTile(0, 0); // Fill world with void
      Fringes.push(Fringe);
    } 
  }
  return Fringes;
}

// Generate Empty Fringe2 Layer
function setFringe2() {
  var Fringes = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var Fringe2 = new mapTile(0, 0); // Fill world with void
      Fringes.push(Fringe2);
    } 
  }
  return Fringes;
}

// Generate Empty Collision Layer
function setCollision() {
  var Collisions = [];
  var x, y;
  for (x = 0; x < max_map_X; x++) {
    for (y = 0; y < max_map_Y; y++) {
      var Collision = new mapCollision(0, 0, null); // Fill Collisions with void
      Collisions.push(Collision);
    } 
  }
  return Collisions;
}

// Empty Map Blueprint
//var Map = {
//  Name: "Starting Map",
//  Moral: "PvP",
//  BootMap: "1",
//  BootX: "1",
//  BootY: "1",
//  Ground : setGround(),
//  Animation: setAnimation(),
//  Mask: setMask(),
//  Mask2: setMask2(),
//  Fringe: setFringe(),
//  Fringe2: setFringe2(),
//  Collisions: setCollision()
//};

function Map(Name, Moral, BootMap, BootX, BootY) {
  this.Name = Name;
  this.Moral = Moral;
  this.BootMap = BootMap;
  this.BootX = BootX;
  this.BootY = BootY;
  this.Ground = setGround();
  this.Animation = setAnimation();
  this.Mask = setMask();
  this.Mask2 = setMask2();
  this.Fringe = setFringe();
  this.Fringe2 = setFringe2();
  this.Collisions = setCollision();
}

// Generate worldMaps Array
function generateWorldMaps() {
  var id;
  for (id = 0; id < maxWorldMaps; id++) {
    //worldMaps[id] = Map;
    var thisMap = new Map("", "PvP", 0, 0, 0);
    worldMaps.push(thisMap);
  }
}
generateWorldMaps();

// Set Active Map
function setActiveMap(mapID) {
  activeMap = worldMaps[mapID];
}

//////////////////////////////////////////
//   Initialize gameEngine Components   //
//////////////////////////////////////////
          
// Init gameScreen Environment
var gameScreen = document.querySelector("#gameScreen").getContext("2d");
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

// Init gameScreen playerModel
//                      X   Y   map isMov  dir  spd animDir animstep
var player = new Player(960,960,0,false,"down",walkSpeed,4,0);     

// Init the active Map
setActiveMap(player.worldMap);

// Init gameScreen Camera
var viewport = new ViewPort(0,0,width,height);      



///////////////////////////////////////
//   Initialize Sprites & Tilesets   //
/////////////////////////////////////// 
      
// Initialize Tilesheet
var tile_sheet = new Image();
//tile_sheet.addEventListener("load", (event) => {loop();});
tile_sheet.src = "img/tilesets/1.png";

// Initialize ColliderSheet
var collider_tile = new Image();
//collider_tile.addEventListener("load", (event) => {loop();});
collider_tile.src = "img/editors/editor-tiles.png";

// Initialize SpriteSheets
var maxSprites = 5;
var getSprites = new Array();
var sprite;
for (sprite = 0; sprite <= maxSprites; sprite++) {
  getSprites[sprite] = new Image();
  getSprites[sprite].src = "img/sprites/" + sprite + ".png";
}



/////////////////////////////////////
//   gameScreen Click Controller   //
///////////////////////////////////// 
gameScreen.canvas.addEventListener("click", (event) => {
  gameScreenClick(event); // inputController.js
});
