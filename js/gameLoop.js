function loop() {
  
  // Set height/width vars equal to browser dimension
  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;      
  
  // Set gameScreen dimensions to browswer dimension
  gameScreen.canvas.height = height;
  gameScreen.canvas.width = width;
  
  // Prevent fuzziness when scaling
  // sprites and tilesets (crispy!)
  gameScreen.imageSmoothingEnabled = false;   
      
  // Set boundaries. Only draw what that the 
  // gameScreen Camera (viewport) can see
  var x_min = Math.floor(viewport.x / scaled_size);
  var y_min = Math.floor(viewport.y / scaled_size);
  var x_max = Math.ceil((viewport.x + viewport.w) / scaled_size);
  var y_max = Math.ceil((viewport.y + viewport.h) / scaled_size);        
  
  // Make sure min & max are within the
  // boundaries of the map dimensions
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
      let valueX = activeMap.Ground[y * max_map_X + x].PosX;
      let valueY = activeMap.Ground[y * max_map_Y + x].PosY;
      let tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
      let tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
      gameScreen.drawImage(tile_sheet, valueX * tile_size, valueY * tile_size, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
      // Draw Animation Layer
      if (mapAnimFrame == false) {
        valueX = activeMap.Animation[y * max_map_X + x].PosX_1;
        valueY = activeMap.Animation[y * max_map_Y + x].PosY_1;
      } else {
        valueX = activeMap.Animation[y * max_map_X + x].PosX_2;
        valueY = activeMap.Animation[y * max_map_Y + x].PosY_2;
      }
      if (valueX + valueY > 0) {
        tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
        tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
        gameScreen.drawImage(tile_sheet, valueX * tile_size, valueY * tile_size, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
      }
      // Draw Mask Layer
      valueX = activeMap.Mask[y * max_map_X + x].PosX;
      valueY = activeMap.Mask[y * max_map_Y + x].PosY;
      if (valueX + valueY > 0) {
        tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
        tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
        gameScreen.drawImage(tile_sheet, valueX * tile_size, valueY * tile_size, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size); 
      }            
      // Draw Mask2 Layer
      valueX = activeMap.Mask2[y * max_map_X + x].PosX;
      valueY = activeMap.Mask2[y * max_map_Y + x].PosY;
      if (valueX + valueY > 0) {
        tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
        tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
        gameScreen.drawImage(tile_sheet, valueX * tile_size, valueY * tile_size, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size); 
      }
    }
  }
        
  ///////////////////////////
  //   DRAW PLAYER MODEL   //
  ///////////////////////////
  let player_width = getSprites[playerSprite].width / 12;
  let player_height = getSprites[playerSprite].height;
  let pScale_w = player_width * 3;
  let pScale_h = player_height * 3;
  let pOffset = Math.floor((pScale_h - scaled_size) / 2);
  
  gameScreen.drawImage(getSprites[playerSprite], (player_width * player.AnimDir) + (player.AnimStep * player_width), 0,
                      player_width, player_height, Math.ceil((player.x - viewport.x + width * 0.5 - viewport.w * 0.5) - pScale_w * 0.5), 
                       Math.ceil(((player.y - viewport.y + height * 0.5 - viewport.h * 0.5) - pScale_w * 0.5) - pOffset), pScale_w, pScale_h);

  /////////////////////////
  //   DRAW WORLD NPCS   //
  /////////////////////////
  if (Array.isArray(activeMap.Npcs) && activeMap.Npcs.length) {
    for (let npcId = 0; npcId <= activeMap.Npcs.length; npcId++) {
      if (activeMap.Npcs[npcId] === undefined) { break; }
      let npc_width = getSprites[activeMap.Npcs[npcId].Sprite].width / 12;
      let npc_height = getSprites[activeMap.Npcs[npcId].Sprite].height;
      let npcScale_w = npc_width * 3;
      let npcScale_h = npc_height * 3;
      let npcOffset = Math.floor((npcScale_h - scaled_size) / 2);
        
      let npcX = Math.floor(activeMap.Npcs[npcId].X - viewport.x + width * 0.5 - viewport.w * 0.5);
          
      let npcY = Math.floor(activeMap.Npcs[npcId].Y - viewport.y + height * 0.5 - viewport.h * 0.5);
      
      let npcDir = activeMap.Npcs[npcId].Direction;
          
      gameScreen.drawImage(getSprites[activeMap.Npcs[npcId].Sprite], (npc_width * npcDir) + (activeMap.Npcs[npcId].animFrame * npc_width), 0, npc_width, npc_height,
                           (npcX - (npcScale_w / 2)), 
                           (npcY - (npcScale_h / 2) - npcOffset),
                           npcScale_w, npcScale_h);

    }
  }
  
        
  //////////////////////////
  //   DRAW ABOVE PLAYER  //
  //////////////////////////
  for (let x = x_min; x < x_max; x++) {
    for (let y = y_min; y < y_max; y++) {
      // Draw Fringe Layer
      let valueX = activeMap.Fringe[y * max_map_X + x].PosX;
      let valueY = activeMap.Fringe[y * max_map_Y + x].PosY;
      let tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
      let tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
      if (valueX + valueY > 0) {
        gameScreen.drawImage(tile_sheet, valueX * tile_size, valueY * tile_size, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
      }            
      // Draw Fringe2 Layer
      valueX = activeMap.Fringe2[y * max_map_X + x].PosX;
      valueY = activeMap.Fringe2[y * max_map_Y + x].PosY;
      tile_x = Math.floor(x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5);
      tile_y = Math.floor(y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5);
      if (valueX + valueY > 0) {
        gameScreen.drawImage(tile_sheet, valueX * tile_size, valueY * tile_size, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
      }
      // Draw Collision Tiles
      if (worldColliders === true && mapEditorState != "Closed") {
        if (activeMap.Collisions[y * max_map_Y + x].up === "True") {
          gameScreen.drawImage(collider_tile, 0, 0, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
        }
        if (activeMap.Collisions[y * max_map_Y + x].down === "True") {
          gameScreen.drawImage(collider_tile, 32, 0, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
        }
        if (activeMap.Collisions[y * max_map_Y + x].left === "True") {
          gameScreen.drawImage(collider_tile, 64, 0, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
        }
        if (activeMap.Collisions[y * max_map_Y + x].right === "True") {
          gameScreen.drawImage(collider_tile, 96, 0, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
        }
      }
      // Draw Npc Spawners
      if (mapEditorState != "Closed") {
        if (activeMap.NpcSpawn[y * max_map_Y + x].npcID != null) {
          gameScreen.drawImage(collider_tile, 128, 0, tile_size, tile_size, tile_x, tile_y, scaled_size, scaled_size);
        }
      }
      // Draw Grid Lines
      if (worldGrid === true && mapEditorState != "Closed") {
        gameScreen.strokeRect(tile_x,tile_y,scaled_size,scaled_size);
      }
    }
  }
        
  //////////////////////////////////
  //   Update Player's Position   //
  //////////////////////////////////
  if (player.isMoving === true) {
    if (player.Dir === "Right" || player.Dir === "Left") {
      if (player.isMoving == true) {
        player.moveX(player.Speed);
      }            
    }
    if (player.Dir === "Up" || player.Dir === "Down") {
      if (player.isMoving == true) {
        player.moveY(player.Speed);
      }     
    }
  }
  
  ////////////////////////////////////////////
  //   Update gameScreens Camera Position   //
  ////////////////////////////////////////////
  if (player.y >= viewport.h * 0.5 && player.y <= (scaled_size * max_map_Y) - viewport.h * 0.5) {
    viewport.scrollToY(player.y);
  }        
  if (player.x >= viewport.w * 0.5 && player.x <= (scaled_size * max_map_X) - viewport.w * 0.5) {
    viewport.scrollToX(player.x);
  }
  
  //////////////////////////////////
  //   Update the AI Controller   //
  //////////////////////////////////
  aiController();
  
  ///////////////////////////////////////
  //   Draw The Next Animation Frame   //
  ///////////////////////////////////////
  window.requestAnimationFrame(loop);
    
}