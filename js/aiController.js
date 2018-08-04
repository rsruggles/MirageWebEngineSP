////////////////////////////
//   Main AI Controller   //
////////////////////////////
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
      
      // Move Based on Npc's Type
      switch (activeMap.Npcs[npcId].Type) {
        case "Wander":
          npcTypeWander(npcId);
          break;
        case "AoS":
          npcTypeAoS(npcId);
          break;
      }
      
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

///////////////////////////
//   Wander Type Logic   //
///////////////////////////
function npcTypeWander(npcId) {
  // Should we start or stop moving?
  let movChange = Math.floor(Math.random() * 1000) + 1;
  if (movChange <= 10) { // Start/Stop 0.01% of the time
    if (activeMap.Npcs[npcId].isMoving === false) {
      activeMap.Npcs[npcId].isMoving = true;
    } else {
      activeMap.Npcs[npcId].isMoving = false;
    }
  }
      
  // Should we change directions?
  if (activeMap.Npcs[npcId].isMoving === true) {
    let dirChange = Math.floor(Math.random() * 1000) + 1;
    if (dirChange <= 5) { // Change Direction 0.005% of the time

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
}

///////////////////////////////
//   Attack on Sight Logic   //
///////////////////////////////
function npcTypeAoS(npcId) {
  // Calculate X/Y axis difference
  let xDiff = Math.abs(activeMap.Npcs[npcId].X - player.x);
  let yDiff = Math.abs(activeMap.Npcs[npcId].Y - player.y);
  // Add a little random difference when
  // X/Y axis difference are similar
  let axisDiff = Math.abs(xDiff - yDiff);
  let rndDiff = (Math.floor(Math.random() * (scaled_size / 2)) + 1) + (scaled_size / 2);

  // Only change direction when the axis difference.
  // is greater than the random difference.
  if (axisDiff >= rndDiff) {
    // Chase Player on X Axis
    if (xDiff > yDiff) {
      if (Math.sign(activeMap.Npcs[npcId].X - player.x) === -1) {
        activeMap.Npcs[npcId].Direction = 10; // Right
      } else {
        activeMap.Npcs[npcId].Direction = 7; // Left
      }
    // Chase Player on Y Axis
    } else {
      if (Math.sign(activeMap.Npcs[npcId].Y - player.y) === -1) {
        activeMap.Npcs[npcId].Direction = 4; // Down
      } else {
        activeMap.Npcs[npcId].Direction = 1; // Up
      }
    }    
  }
  
  // Cycle the walking animation
  activeMap.Npcs[npcId].isMoving = true;
}