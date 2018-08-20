/////////////////////////////////////
//   Player Animation Controller   //
/////////////////////////////////////

// Set Animation Direction
function setAnimDir() {
 if (player.Dir === "Right") {
   player.AnimDir = 10;
 }
 if (player.Dir === "Left") {
   player.AnimDir = 7;
 }
 if (player.Dir === "Up") {
   player.AnimDir = 1;
 }
 if (player.Dir === "Down") {
   player.AnimDir = 4;
 }
}

// Player Animation Frame Controller
function setAnimStep() {
 if (player.AnimStep === 0) {
   player.AnimStep = -1;
 } else if (player.AnimStep === -1) {
   player.AnimStep = 1;
 } else if (player.AnimStep === 1) {
   player.AnimStep = 0;
 }
}

// NPC Animation Frame Controller
function setNpcAnimFrame(npcId) {
  if (activeMap.Npcs[npcId].animFrame === 0) {
    activeMap.Npcs[npcId].animFrame = -1;
  } else if (activeMap.Npcs[npcId].animFrame === -1) {
    activeMap.Npcs[npcId].animFrame = 1;
  } else if (activeMap.Npcs[npcId].animFrame === 1) {
    activeMap.Npcs[npcId].animFrame = 0;
  }
}
      
////////////////////////////////////
//   Main Player Animation Loop   //
////////////////////////////////////
setInterval(function(){
  if (player.isMoving === true) {
    setAnimStep();
  } else {
    player.AnimStep = 0;
  }
},1000/8.5);

/////////////////////////////////
//   Main NPC Animation Loop   //
/////////////////////////////////
setInterval(function(){
  // Loop Through All Map Npcs
  for (let npcId = 0; npcId <= activeMap.Npcs.length; npcId++) {
    if (activeMap.Npcs[npcId] === undefined) { break; }
    if (activeMap.Npcs[npcId].isMoving === true) {
      setNpcAnimFrame(npcId);
    } else {
      activeMap.Npcs[npcId].animFrame = 0;
    }
  }
},1000/9.25);

//////////////////////////////////
//   Map Tiles Animation Loop   //
//////////////////////////////////
setInterval(function(){
  if (mapAnimFrame === true) {
    mapAnimFrame = false;
  } else {
    mapAnimFrame = true;
  }
},1000/4.25);

//////////////////////////////////////
// mapEditor Tile Preview Animation //
//////////////////////////////////////
setInterval(function(){
  var canvasPreview = document.getElementById("editorPreview");
  var tilePreview = canvasPreview.getContext("2d");
  tilePreview.fillStyle = "black";
  tilePreview.fillRect(0, 0, 32, 32);
  
  if (mapEditorLayer === "Ground" || mapEditorLayer === "Mask" || mapEditorLayer === "Mask2" ||
      mapEditorLayer === "Fringe" || mapEditorLayer === "Fringe2") {
    tilePreview.drawImage(tile_sheet, brush_Coord_X * 32, brush_Coord_Y * 32, 32, 32, 0, 0, 32, 32);
  }  
  if (mapEditorLayer === "Animation") {
    if (mapAnimFrame === false) {
      tilePreview.drawImage(tile_sheet, mapAnimation[0] * 32, mapAnimation[1] * 32, 32, 32, 0, 0, 32, 32);
    } else {
      tilePreview.drawImage(tile_sheet, mapAnimation[2] * 32, mapAnimation[3] * 32, 32, 32, 0, 0, 32, 32);
    }
  }  
  if (mapEditorLayer === "Collision") {
    tilePreview.drawImage(collider_tile, 0, 0, 32, 32, 0, 0, 32, 32);
    tilePreview.drawImage(collider_tile, 32, 0, 32, 32, 0, 0, 32, 32);
    tilePreview.drawImage(collider_tile, 64, 0, 32, 32, 0, 0, 32, 32);
    tilePreview.drawImage(collider_tile, 96, 0, 32, 32, 0, 0, 32, 32);
  }  
  if (mapEditorLayer === "NpcSpawn") {
    tilePreview.drawImage(collider_tile, 128, 0, 32, 32, 0, 0, 32, 32);
  }  
  if (mapEditorLayer === "NpcAvoid") {
    tilePreview.drawImage(collider_tile, 160, 0, 32, 32, 0, 0, 32, 32);
  }  
  if (mapEditorLayer === "DoorKey") {
    tilePreview.drawImage(collider_tile, 192, 0, 32, 32, 0, 0, 32, 32);
  }  
  if (mapEditorLayer === "LootChest") {
    tilePreview.drawImage(collider_tile, 224, 0, 32, 32, 0, 0, 32, 32);
  }  
  if (mapEditorLayer === "Teleport") {
    tilePreview.drawImage(collider_tile, 256, 0, 32, 32, 0, 0, 32, 32);
  }
  
},1000/60);

/////////////////////////////////////
// npcEditor Npc Preview Animation //
/////////////////////////////////////
setInterval(function(){
  var canvasNpcPreview = document.getElementById("npcEditorPreview");
  var npcPreview = canvasNpcPreview.getContext("2d");
  npcPreview.fillStyle = "black";
  npcPreview.fillRect(0, 0, 32, 32);
  
  let npcSpriteNum = $('#npcSprite').val() || 0;
  
  if ($('#npcSprite').val() >= 0 && $('#npcSprite').val() <= maxSprites) {
    let npc_width = getSprites[npcSpriteNum].width / 12;
    let npc_height = getSprites[npcSpriteNum].height;  
    npcPreview.drawImage(getSprites[npcSpriteNum], (npc_width * 4) + npc_width, 0, npc_width, npc_height, 0, 0, 32, 32);
  } else {
    npcSpriteNum =0;
  }
  
  
  
},1000/60);
