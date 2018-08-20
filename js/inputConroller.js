////////////////////////////////////
//   Input Controller Variables   //
////////////////////////////////////

// Player Movement Variables
var wKey = false, aKey = false, sKey = false, dKey = false;

// gameScreen Click Variables
var pointer = {x:32,y:32};



///////////////////////////////////
//   Movement Input Controller   //
///////////////////////////////////

// Interpret Player Movement   
document.onkeydown = function(event){
  if (chatBoxOpened === false) {
    if (event.keyCode === 68)  {
      // D - Right
      player.Dir = "Right";
      setAnimDir();
      inputController("d", true);
    } else if (event.keyCode === 65)  {
      // A - Left
      player.Dir = "Left";
      setAnimDir();
      inputController("a", true);
    } else if (event.keyCode === 87)  {
      // W - Up
      player.Dir = "Up";
      setAnimDir();
      inputController("w", true);
    } else if (event.keyCode === 83)  {
      // S - Down
      player.Dir = "Down";
      setAnimDir();
      inputController("s", true);
    }
    // Shift - Running
    if (event.keyCode === 16) {
      player.Speed = runSpeed;
    }
    // Open Chat BOx
    if (event.keyCode === 13) {
      openChatBox();
    }
  }
};

// Stop Player Movement
document.onkeyup = function(event){
  if (event.keyCode === 68)  {
    inputController("d", false);
  } else if (event.keyCode === 65) {
    inputController("a", false);
  } else if (event.keyCode === 87) {
    inputController("w", false);
  } else if (event.keyCode === 83) {
    inputController("s", false);
  }
  if (event.keyCode === 16) {
    player.Speed = walkSpeed;
  }
};
      
// Interpret Movement KeyPresses
function inputController(keyPressed, keyBool) {        
  switch(keyPressed) {
    case "w":
      wKey = keyBool;
      break;
    case "a":
      aKey = keyBool;
      break;
    case "s":
      sKey = keyBool;
      break;
    case "d":
      dKey = keyBool;
      break;
  }          
  if (wKey === false && aKey === false && sKey === false && dKey === false) {
    player.isMoving = false;
        } else {
    player.isMoving = true;
  }        
}



//////////////////////////////
//   UI Input Interpreter   //
//////////////////////////////

// Open Chatbox
function openChatBox() {
  if (!$("#chatInput").is(":focus")) {
    if (chatBoxOpened == false) {
      chatBoxOpened = true;
      $("#chatBox").show("slide", { direction: "left" }, 750);
      setTimeout(function(){ $("#chatInput").focus(); }, 800);
    }
  }
}



/////////////////////////////////////
//   gameScreen Click Controller   //
/////////////////////////////////////
function gameScreenClick(event) {
  pointer.x = (event.pageX + viewport.x - width * 0.5 + viewport.w * 0.5 + scaled_size * 0.5) - scaled_size;
  pointer.y = (event.pageY + viewport.y - height * 0.5 + viewport.h * 0.5 + scaled_size *0.5) - scaled_size;
  let pointer_index = Math.floor((pointer.y + scaled_size * 0.5) / scaled_size) * max_map_X +
                      Math.floor((pointer.x + scaled_size * 0.5) / scaled_size);
  console.log(pointer_index); // Will be useful probably forever
  
  // Place world tiles if we're in the map editor
  if (mapEditorState == "Max") {
    switch(mapEditorLayer) {
    case "Ground":
      if (eraserBrush === false) {
        activeMap.Ground[pointer_index].PosX = brush_Coord_X;
        activeMap.Ground[pointer_index].PosY = brush_Coord_Y;
      } else {
        activeMap.Ground[pointer_index].PosX = 0;
        activeMap.Ground[pointer_index].PosY = 0;
      }
      break;
    case "Animation":
      if (eraserBrush === false) {
        activeMap.Animation[pointer_index].PosX_1 = mapAnimation[0];
        activeMap.Animation[pointer_index].PosY_1 = mapAnimation[1];
        activeMap.Animation[pointer_index].PosX_2 = mapAnimation[2];
        activeMap.Animation[pointer_index].PosY_2 = mapAnimation[3];
      } else {
        activeMap.Animation[pointer_index].PosX_1 = 0;
        activeMap.Animation[pointer_index].PosY_1 = 0;
        activeMap.Animation[pointer_index].PosX_2 = 0;
        activeMap.Animation[pointer_index].PosY_2 = 0;
      }
      break;
    case "Mask":
      if (eraserBrush === false) {
        activeMap.Mask[pointer_index].PosX = brush_Coord_X;
        activeMap.Mask[pointer_index].PosY = brush_Coord_Y;
      } else {
        activeMap.Mask[pointer_index].PosX = 0;
        activeMap.Mask[pointer_index].PosY = 0;
      }
      break;
    case "Mask2":
      if (eraserBrush === false) {
        activeMap.Mask2[pointer_index].PosX = brush_Coord_X;
        activeMap.Mask2[pointer_index].PosY = brush_Coord_Y;
      } else {
        activeMap.Mask2[pointer_index].PosX = 0;
        activeMap.Mask2[pointer_index].PosY = 0;
      }
      break;
    case "Fringe":
      if (eraserBrush === false) {
        activeMap.Fringe[pointer_index].PosX = brush_Coord_X;
        activeMap.Fringe[pointer_index].PosY = brush_Coord_Y;
      } else {
        activeMap.Fringe[pointer_index].PosX = 0;
        activeMap.Fringe[pointer_index].PosY = 0;
      }
      break;
    case "Fringe2":
      if (eraserBrush === false) {
        activeMap.Fringe2[pointer_index].PosX = brush_Coord_X;
        activeMap.Fringe2[pointer_index].PosY = brush_Coord_Y;
      } else {
        activeMap.Fringe2[pointer_index].PosX = 0;
        activeMap.Fringe2[pointer_index].PosY = 0;
      }
      break;
    case "Collision":
      if (eraserBrush === false) {
        activeMap.Collisions[pointer_index].PosX = brush_Coord_X;
        activeMap.Collisions[pointer_index].PosY = brush_Coord_Y;
        activeMap.Collisions[pointer_index].up = mapCollider[0];
        activeMap.Collisions[pointer_index].down = mapCollider[1];
        activeMap.Collisions[pointer_index].left = mapCollider[2];
        activeMap.Collisions[pointer_index].right = mapCollider[3];
      } else {
        activeMap.Collisions[pointer_index].PosX = 0;
        activeMap.Collisions[pointer_index].PosY = 0;
        activeMap.Collisions[pointer_index].up = false;
        activeMap.Collisions[pointer_index].down = false;
        activeMap.Collisions[pointer_index].left = false;
        activeMap.Collisions[pointer_index].right = false;
      }
      break;
    case "NpcSpawn":
      if (eraserBrush === false) {
        activeMap.NpcSpawn[pointer_index].PosX = brush_Coord_X;
        activeMap.NpcSpawn[pointer_index].PosY = brush_Coord_Y;
        activeMap.NpcSpawn[pointer_index].npcID = mapNpcID;
        let mapNpcX = Math.round(pointer.x / scaled_size) * scaled_size;
            mapNpcX = Math.round(mapNpcX + (scaled_size/2));          
        let mapNpcY = Math.round(pointer.y / scaled_size) * scaled_size;
            mapNpcY = Math.round(mapNpcY + (scaled_size/2));
        let stepCount = 0; //scaled_size + Math.floor(scaled_size / 2);
        activeMap.Npcs.push(new mapNpc(mapNpcID, mapNpcX, mapNpcY, 4, true, 0, stepCount));
      } else {
        activeMap.NpcSpawn[pointer_index].PosX = 0;
        activeMap.NpcSpawn[pointer_index].PosY = 0;
        activeMap.NpcSpawn[pointer_index].npcID = null;
      }      
      break;
    case "NpcAvoid":
      if (eraserBrush === false) {
        activeMap.NpcAvoid[pointer_index].PosX = brush_Coord_X;
        activeMap.NpcAvoid[pointer_index].PosY = brush_Coord_Y;
        activeMap.NpcAvoid[pointer_index].Avoid = true;
      } else {
        activeMap.NpcAvoid[pointer_index].PosX = 0;
        activeMap.NpcAvoid[pointer_index].PosY = 0;
        activeMap.NpcAvoid[pointer_index].Avoid = false;
      }      
      break;
    case "Teleport":
      if (eraserBrush === false) {
        activeMap.Teleport[pointer_index].PosX = brush_Coord_X;
        activeMap.Teleport[pointer_index].PosY = brush_Coord_Y;
        activeMap.Teleport[pointer_index].Teleport = true;
        activeMap.Teleport[pointer_index].TelMap = mapTelId;
        activeMap.Teleport[pointer_index].TelX = mapTelX;
        activeMap.Teleport[pointer_index].TelY = mapTelY;
      } else {
        activeMap.Teleport[pointer_index].PosX = 0;
        activeMap.Teleport[pointer_index].PosY = 0;
        activeMap.Teleport[pointer_index].Teleport = false;
        activeMap.Teleport[pointer_index].TelMap = 0;
        activeMap.Teleport[pointer_index].TelX = 0;
        activeMap.Teleport[pointer_index].TelY = 0;
      }
      
    }
  }
  
  // Placeholder for mapNpc interaction / selection
}
      