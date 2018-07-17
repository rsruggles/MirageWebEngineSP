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
        
  ///////////////////////////
  //   DRAW PLAYER MODEL   //
  ///////////////////////////
  let player_width = getSprites[playerSprite].width / 12;
  let player_height = getSprites[playerSprite].height;
  let pScale_w = player_width * 3;
  let pScale_h = player_height * 3;
  let pOffset = Math.floor((pScale_h - scaled_size) / 2);
  
  //Math.ceil((pScale_h - scaled_size) / 2) + 4; (This is broken)
  gameScreen.drawImage(getSprites[playerSprite], (player_width * player.AnimDir) + (player.AnimStep * player_width), 0,
                    (getSprites[playerSprite].width/12), (getSprites[playerSprite].height), Math.ceil((player.x - viewport.x + width * 0.5 - viewport.w * 0.5) - pScale_w * 0.5), 
                    Math.ceil(((player.y - viewport.y + height * 0.5 - viewport.h * 0.5) - pScale_w * 0.5) - pOffset), pScale_w, pScale_h);
        
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
  
  ///////////////////////////////////////
  //   Draw The Next Animation Frame   //
  ///////////////////////////////////////
  window.requestAnimationFrame(loop);
    
}