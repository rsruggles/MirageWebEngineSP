/////////////////////////////////
//   Handle Player Character   //
/////////////////////////////////

// Player Variables
var walkSpeed = 0.75;
var runSpeed = 1.25;
var sprite_size = 32;  // Deprecrated?
var sprite_width = 33; // Deprecrated?
var playerSprite = 0;  // Move to Player Model in the future

// Define Player
const Player = function(x,y,isMoving,Dir,Speed,AnimDir,AnimStep){
  this.x = x; this.y = y;
  this.isMoving = isMoving;
  this.Dir = Dir;
  this.Speed = Speed;
  this.AnimDir = AnimDir;
  this.AnimStep = AnimStep;
};

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
      } else if (/*Map.Collisions[PlayerLoc].right == "True" || */
                 Map.Collisions[PlayerLocTop].right == "True" ||
                 Map.Collisions[PlayerLocBottom].right == "True") {
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
      } else if (/*Map.Collisions[PlayerLoc].left == "True" || */
                 Map.Collisions[PlayerLocTop].left == "True" ||
                 Map.Collisions[PlayerLocBottom].left == "True") {
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
      } else if (/*Map.Collisions[PlayerLoc].up == "True" ||*/
                 Map.Collisions[PlayerLocLeft].up == "True" || 
                 Map.Collisions[PlayerLocRight].up == "True") {
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
      } else if (/*Map.Collisions[PlayerLoc].down == "True" ||*/
                 Map.Collisions[PlayerLocLeft].down == "True" || 
                 Map.Collisions[PlayerLocRight].down == "True") {
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
    var npc = new Npc("", 0); // Populate the Nps array with empty Npcs
    Npcs.push(npc);
  }
}
loadNpcs(); // In the future we'll only load blank Npcs if
            // there aren't any Npcs saved in the database
      
      
      
      
      
      var chatBoxOpened = false;
      
      
      var scaled_size = 96;
      
      var max_map_X = 255;
      var max_map_Y = 255;
      
      var brush_Coord_X = 0;
      var brush_Coord_Y = 0;
      
      var worldGrid = true;
      var worldColliders = true;
      var mapEditorState = "Closed";
      var mapEditorWinLoc = [0,0];
      var mapEditorLayer = "Ground";
      var mapCollider = ["True", "True", "True", "True"];
      var mapAnimation = [0, 0, 0, 0];
      var mapAnimFrame = false;
      
      function mapTile(posX, posY) {
        this.PosX = posX;
        this.PosY = posY;
      }
      function mapAnimTile(posX1, posY1, posX2, posY2) {
        this.PosX_1 = posX1;
        this.PosY_1 = posY1;
        this.PosX_2 = posX2;
        this.PosY_2 = posY2;
      }
      function mapCollision(posX, posY, up, down, left, right) {
        this.PosX = posX;
        this.PosY = posY;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
      }

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

      var Map = {
        id: "1",
        Name: "Starting Map",
        Moral: "PvP",
        BootMap: "1",
        BootX: "1",
        BootY: "1",
        Ground : setGround(),
        Animation: setAnimation(),
        Mask: setMask(),
        Mask2: setMask2(),
        Fringe: setFringe(),
        Fringe2: setFringe2(),
        Collisions: setCollision()
      };
          
      //var gameScreen = document.getElementById("gameScreen");
      var gameScreen = document.querySelector("#gameScreen").getContext("2d");      
      var height = document.documentElement.clientHeight;
      var width = document.documentElement.clientWidth;      
      //                    X   Y  isMov   dir  spd animDir animstep
      var player = new Player(960,960,false,"down",walkSpeed,4,0);      
      //var viewport = new ViewPort(0,0,832,704);
      var viewport = new ViewPort(0,0,width,height);      
      var pointer = {x:32,y:32};      
      var wKey = false, aKey = false, sKey = false, dKey = false;
      
      
      
      
      
      function loop() {
      
        var height = document.documentElement.clientHeight;
        var width = document.documentElement.clientWidth;      
        
        gameScreen.canvas.height = height;
        gameScreen.canvas.width = width;
        gameScreen.imageSmoothingEnabled = false;   
        
        var x_min = Math.floor(viewport.x / scaled_size);
        var y_min = Math.floor(viewport.y / scaled_size);
        var x_max = Math.ceil((viewport.x + viewport.w) / scaled_size);
        var y_max = Math.ceil((viewport.y + viewport.h) / scaled_size);        
        
        if(x_min < 0) x_min = 0;
        if(y_min < 0) y_min = 0;
        if(x_max > max_map_X) x_max = max_map_X;
        if(y_max > max_map_Y) y_max = max_map_Y;
        
        ///////////////////////////
        //   DRAW BELOW PLAYER   //
        ///////////////////////////
        for (let x = x_min; x < x_max; x++) {
          for (let y = y_min; y < y_max; y++) {            
            // Draw Ground Layer
            let valueX = Map.Ground[y * max_map_X + x].PosX;
            let valueY = Map.Ground[y * max_map_Y + x].PosY;
            let tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
            let tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
            gameScreen.drawImage(tile_sheet, valueX * sprite_size, valueY * sprite_size, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
            // Draw Animation Layer
            if (mapAnimFrame == false) {
              valueX = Map.Animation[y * max_map_X + x].PosX_1;
              valueY = Map.Animation[y * max_map_Y + x].PosY_1;
            } else {
              valueX = Map.Animation[y * max_map_X + x].PosX_2;
              valueY = Map.Animation[y * max_map_Y + x].PosY_2;
            }
            if (valueX + valueY > 0) {
              tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
              tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
              gameScreen.drawImage(tile_sheet, valueX * sprite_size, valueY * sprite_size, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
            }
            // Draw Mask Layer
            valueX = Map.Mask[y * max_map_X + x].PosX;
            valueY = Map.Mask[y * max_map_Y + x].PosY;
            if (valueX + valueY > 0) {
              tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
              tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
              gameScreen.drawImage(tile_sheet, valueX * sprite_size, valueY * sprite_size, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size); 
            }            
            // Draw Mask2 Layer
            valueX = Map.Mask2[y * max_map_X + x].PosX;
            valueY = Map.Mask2[y * max_map_Y + x].PosY;
            if (valueX + valueY > 0) {
              tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
              tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
              gameScreen.drawImage(tile_sheet, valueX * sprite_size, valueY * sprite_size, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size); 
            }
          }
        }
        
        let player_width = getSprites[playerSprite].width / 12;
        let player_height = getSprites[playerSprite].height;
        let pScale_w = player_width * 3;
        let pScale_h = player_height * 3;
        
        ///////////////////////////
        //   DRAW PLAYER MODEL   //
        ///////////////////////////
        gameScreen.drawImage(getSprites[playerSprite], (player_width * player.AnimDir) + (player.AnimStep * player_width), 0,
                          getSprites[playerSprite].height, (getSprites[playerSprite].width/12), Math.round((player.x - viewport.x + width * 0.5 - viewport.w * 0.5) - pScale_w * 0.5), 
                          Math.round((player.y - viewport.y + height * 0.5 - viewport.h * 0.5) - pScale_w * 0.5), pScale_w, pScale_h);
        
        //////////////////////////
        //   DRAW ABOVE PLAYER  //
        //////////////////////////
        for (let x = x_min; x < x_max; x++) {
          for (let y = y_min; y < y_max; y++) {
            // Draw Fringe Layer
            let valueX = Map.Fringe[y * max_map_X + x].PosX;
            let valueY = Map.Fringe[y * max_map_Y + x].PosY;
            let tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
            let tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
            if (valueX + valueY > 0) {
              gameScreen.drawImage(tile_sheet, valueX * sprite_size, valueY * sprite_size, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
            }            
            // Draw Fringe2 Layer
            valueX = Map.Fringe2[y * max_map_X + x].PosX;
            valueY = Map.Fringe2[y * max_map_Y + x].PosY;
            tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
            tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
            if (valueX + valueY > 0) {
              gameScreen.drawImage(tile_sheet, valueX * sprite_size, valueY * sprite_size, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
            }            
            // Draw Collision Tiles
            if (worldColliders === true && mapEditorState != "Closed") {
              if (Map.Collisions[y * max_map_Y + x].up === "True") {
                gameScreen.drawImage(collider_tile, 0, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
              }
              if (Map.Collisions[y * max_map_Y + x].down === "True") {
                gameScreen.drawImage(collider_tile, 32, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
              }
              if (Map.Collisions[y * max_map_Y + x].left === "True") {
                gameScreen.drawImage(collider_tile, 64, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
              }
              if (Map.Collisions[y * max_map_Y + x].right === "True") {
                gameScreen.drawImage(collider_tile, 96, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
              }
            }            
            // Draw Grid Lines
            if (worldGrid === true && mapEditorState != "Closed") {
              gameScreen.strokeRect(tile_x,tile_y,scaled_size,scaled_size);
            }            
          }
        }
        
        ////////////////////////////////////
        //   PLAYER / VIEWPORT MOVEMENT   //
        ////////////////////////////////////
        if (player.isMoving === true) {
          if (player.Dir === "Right" || player.Dir === "Left") {
            if (player.isMoving == true) {
              player.moveX(player.Speed);
            }            
          }
          if (player.Dir === "Up" || player.Dir === "Down") {
            if (player.isMoving == true) {
              player.moveY(player.Speed);
//              console.log(Math.floor((player.x - scaled_size * 0.5)/scaled_size));
//              console.log(Math.floor((player.y - scaled_size * 0.5)/scaled_size));
            }     
          }
        }       
        if (player.y >= viewport.h * 0.5 && player.y <= (scaled_size * max_map_Y) - viewport.h * 0.5) {
          viewport.scrollToY(player.y);
        }        
        if (player.x >= viewport.w * 0.5 && player.x <= (scaled_size * max_map_X) - viewport.w * 0.5) {
          viewport.scrollToX(player.x);
        }
        
        window.requestAnimationFrame(loop);
        
      }
      
      var tile_sheet = new Image();
      tile_sheet.addEventListener("load", (event) => {loop();});
      tile_sheet.src = "img/tilesets/1.png";
      
      var sprite_sheet = new Image();
      sprite_sheet.addEventListener("load", (event) => {loop();});
      sprite_sheet.src = "img/sprites/2.png";
      
      var maxSprites = 5;
      var getSprites = new Array();
      var sprite;
      for (sprite = 0; sprite <= maxSprites; sprite++) {
        getSprites[sprite] = new Image();
        getSprites[sprite].src = "img/sprites/" + sprite + ".png";
      } 
      //getSprites.addEventListener("load", (event) => {loop();});
      
      var collider_tile = new Image();
      collider_tile.addEventListener("load", (event) => {loop();});
      collider_tile.src = "img/editors/block-tile.png";
      
      
      // Will be used later for targeting tiles/players/npcs
      gameScreen.canvas.addEventListener("click", (event) => {
        pointer.x = (event.pageX + viewport.x - width * 0.5 + viewport.w * 0.5 + scaled_size * 0.5) - scaled_size;
        pointer.y = (event.pageY + viewport.y - height * 0.5 + viewport.h * 0.5 + scaled_size *0.5) - scaled_size;
        // console.log(Math.floor((pointer.x - scaled_size * 0.5)/scaled_size));
        // console.log(Math.floor((pointer.y - scaled_size * 0.5)/scaled_size));
        let pointer_index = Math.floor((pointer.y + scaled_size * 0.5) / scaled_size) * max_map_X +
                            Math.floor((pointer.x + scaled_size * 0.5) / scaled_size);
        console.log(pointer_index);
        // Place world tiles if we're in the map editor
        if (mapEditorState == "Max") {
          switch(mapEditorLayer) {
          case "Ground":
            Map.Ground[pointer_index].PosX = brush_Coord_X;
            Map.Ground[pointer_index].PosY = brush_Coord_Y;
            break;
          case "Animation":
            Map.Animation[pointer_index].PosX_1 = mapAnimation[0];
            Map.Animation[pointer_index].PosY_1 = mapAnimation[1];
            Map.Animation[pointer_index].PosX_2 = mapAnimation[2];
            Map.Animation[pointer_index].PosY_2 = mapAnimation[3];
            break;
          case "Mask":
            Map.Mask[pointer_index].PosX = brush_Coord_X;
            Map.Mask[pointer_index].PosY = brush_Coord_Y;
            break;
          case "Mask2":
            Map.Mask2[pointer_index].PosX = brush_Coord_X;
            Map.Mask2[pointer_index].PosY = brush_Coord_Y;
            break;
          case "Fringe":
            Map.Fringe[pointer_index].PosX = brush_Coord_X;
            Map.Fringe[pointer_index].PosY = brush_Coord_Y;
            break;
          case "Fringe2":
            Map.Fringe2[pointer_index].PosX = brush_Coord_X;
            Map.Fringe2[pointer_index].PosY = brush_Coord_Y;
            break;
          case "Collision":
            Map.Collisions[pointer_index].PosX = brush_Coord_X;
            Map.Collisions[pointer_index].PosY = brush_Coord_Y;
            Map.Collisions[pointer_index].up = mapCollider[0];
            Map.Collisions[pointer_index].down = mapCollider[1];
            Map.Collisions[pointer_index].left = mapCollider[2];
            Map.Collisions[pointer_index].right = mapCollider[3];
            break;
        }
        }      
      });
      
      
      
      function getPlayerTileCoord(x, y) {
        var PlayerLoc, PlayerX, PlayerY;
        var mapDimension = max_map_X + 1;        
        PlayerLoc = (Math.floor((y + scaled_size) / scaled_size) * max_map_X + Math.floor((x + scaled_size) / scaled_size) - mapDimension);
        // PlayerLoc = Math.floor((y + scaled_size * 0.5) / scaled_size) * max_map_X + Math.floor((x + scaled_size * 0.5) / scaled_size);
        return PlayerLoc;
      }
      
      
      
      
      //////////////////////
      //   LOAD EDITORS   //
      //////////////////////
      $("#mapEditor").load("editors/mapEditor.html");
      $("#npcEditor").load("editors/npcEditor.html");
      
      //////////////////////////
      //   LOAD UI ELEMENTS   //
      //////////////////////////
      $("#chatBox").load("ui/chatBox.html");
      var chatTop = window.innerHeight - 276;
      $("#chatBox").css("top", chatTop);