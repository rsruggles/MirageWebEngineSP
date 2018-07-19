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
  
  // Placeholder for mapNpc interaction / selection
}
      