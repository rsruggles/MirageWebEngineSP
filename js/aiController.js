function aiController() {
  // Loop Through All Map Npcs
  for (let npcId = 0; npcId <= activeMap.Npcs.length; npcId++) {
    if (activeMap.Npcs[npcId] === undefined) { break; }
    
    // Npc Location Variables
    let npcX = activeMap.Npcs[npcId].X;
    let npcY = activeMap.Npcs[npcId].Y;
    
    // Line of Site Variables
    let losX = Math.round((width / 2) + (scaled_size * 3));
    let losY = Math.round((height / 2) + (scaled_size * 3));
    
    
    // Only Move NPCs in our Line-of-Sight
    if (npcX > (player.x - losX) && npcX < (player.x + losX) &&
        npcY > (player.y - losY) && npcY < (player.y + losY)) {
      
      // Should we start or stop moving?
      let movChange = Math.floor(Math.random() * 1000) + 1;
      if (movChange <= 10) {
        if (activeMap.Npcs[npcId].isMoving === false) {
          activeMap.Npcs[npcId].isMoving = true;
        } else {
          activeMap.Npcs[npcId].isMoving = false;
        }
      }
      
      // Should we change directions?
      if (activeMap.Npcs[npcId].isMoving === true) {
        let dirChange = Math.floor(Math.random() * 1000) + 1;
        if (dirChange <= 5) { // Change Direction 20% of the time

          let moveDir = Math.floor(Math.random() * 4);

          switch(moveDir) {
            case 0: // Up
              activeMap.Npcs[npcId].Direction = 1;
              break;
            case 1: // Down
              activeMap.Npcs[npcId].Direction = 4;
              break;
            case 2: // Left
              activeMap.Npcs[npcId].Direction = 7;
              break;
            case 3: // Right
              activeMap.Npcs[npcId].Direction = 10;
              break;
          }
        }
      }
            
      //let moveDir = Math.floor(Math.random() * 4);
      if (activeMap.Npcs[npcId].isMoving === true) {
        switch(activeMap.Npcs[npcId].Direction) {
          case 1: // Up
            activeMap.Npcs[npcId].Y -= walkSpeed;
            break;
          case 4: // Down
            activeMap.Npcs[npcId].Y += walkSpeed;
            break;
          case 7: // Left
            activeMap.Npcs[npcId].X -= walkSpeed;
            break;
          case 10: // Right
            activeMap.Npcs[npcId].X += walkSpeed;
            break;
        }
      }
      
      
        
    }
    
    
    
  }
}