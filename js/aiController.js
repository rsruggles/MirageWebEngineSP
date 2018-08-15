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
      
      // Check Collisions
      if (activeMap.Npcs[npcId].isMoving === true) {
        if (!isNpcBlockedByPlayer(npcId)) {
          switch(activeMap.Npcs[npcId].Direction) {
            case 1: // Up activeMap.Npcs[npcId].Y -= walkSpeed;
              if (!isNpcBlockedByNpc(npcId)) {
                activeMap.Npcs[npcId].Y -= walkSpeed;
              } else {
                activeMap.Npcs[npcId].Y += walkSpeed;
                npcChangeDirection(npcId);
              }              
              break;
            case 4: // Down activeMap.Npcs[npcId].Y += walkSpeed;
              if (!isNpcBlockedByNpc(npcId)) {
                activeMap.Npcs[npcId].Y += walkSpeed;
              } else {
                activeMap.Npcs[npcId].Y -= walkSpeed;
                npcChangeDirection(npcId);
              }   
              break;
            case 7: // Left activeMap.Npcs[npcId].X -= walkSpeed;
              if (!isNpcBlockedByNpc(npcId)) {
                activeMap.Npcs[npcId].X -= walkSpeed;
              } else {
                activeMap.Npcs[npcId].X += walkSpeed;
                npcChangeDirection(npcId);
              }   
              break;
            case 10: // Right activeMap.Npcs[npcId].X += walkSpeed;
              if (!isNpcBlockedByNpc(npcId)) {
                activeMap.Npcs[npcId].X += walkSpeed;
              } else {
                activeMap.Npcs[npcId].X -= walkSpeed;
                npcChangeDirection(npcId);
              }   
              break;
          }
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
  // Set Step Count Variable
  let npcStep = activeMap.Npcs[npcId].stepCounter;

  // Only change direction when the axis difference
  // is greater than the random difference && make
  // sure we're not in the middle of a step count
  if (axisDiff >= rndDiff && npcStep === 0) {
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
  
  // Update Direction Change
  if (npcStep === scaled_size) {
    npcChangeDirection(npcId);
  }
  
  // Reset the Step Counter
  if (npcStep >= 0) {
    activeMap.Npcs[npcId].stepCounter = npcStep - 1;
  } else {
    activeMap.Npcs[npcId].stepCounter = 0;
  }
  
  
  
  // Check if we need to start moving again
  if (xDiff > scaled_size || yDiff > scaled_size) {
    activeMap.Npcs[npcId].isMoving = true;
  }
}

//////////////////////////////
//   Npc Change Direction   //
//////////////////////////////
function npcChangeDirection(npcId) {
  let npcDirection = activeMap.Npcs[npcId].Direction;
  let rndDirection = Math.floor(Math.random() * 2);
  let npcStep = activeMap.Npcs[npcId].stepCounter;
  
  // Walk Opposite Direction
  if (npcStep === scaled_size + Math.floor(scaled_size / 2)) {
    switch(npcDirection) {
      case 4: // Down
        activeMap.Npcs[npcId].Direction = 1; // Up
        break;
      case 1: // Up
        activeMap.Npcs[npcId].Direction = 4; // Down
        break;
      case 10: // Right
        activeMap.Npcs[npcId].Direction = 7; // Left
        break;
      case 7: // Left
        activeMap.Npcs[npcId].Direction = 10; // Right
        break;
    }
  }
  
  // Walk Random Direction
  if (npcStep === scaled_size) {
    if (npcDirection === 10 || npcDirection === 7) {
      if (rndDirection === 0) {
        activeMap.Npcs[npcId].Direction = 4; // Down
      } else {
        activeMap.Npcs[npcId].Direction = 1; // Up
      }
    } else {
      if (rndDirection === 0) {
        activeMap.Npcs[npcId].Direction = 10; // Right
      } else {
        activeMap.Npcs[npcId].Direction = 7; // Left
      }
    }
  }
  
}

///////////////////////////////
//   Is Npc Blocked By Npc   //
///////////////////////////////
function isNpcBlockedByNpc(activeNpc) {
  var isBlocked = false;
  let activeNpcX = activeMap.Npcs[activeNpc].X;
  let activeNpcY = activeMap.Npcs[activeNpc].Y;
  
  for (let npcId = 0; npcId <= activeMap.Npcs.length; npcId++) {
    
    if (activeMap.Npcs[npcId] === undefined) { break; }
    if (activeNpc === npcId) { continue; }
        
    let npcX = activeMap.Npcs[npcId].X;
    let npcY = activeMap.Npcs[npcId].Y;
    
    switch(activeMap.Npcs[activeNpc].Direction) {
      case 10: // While moving RIGHT
        if ((activeNpcX + scaled_size) >= npcX) {
          if (activeNpcY < npcY + (scaled_size) && activeNpcY > npcY - (scaled_size)) {
            if (Math.abs(activeNpcX - npcX) <= scaled_size) {
              isBlocked = true;
              activeMap.Npcs[activeNpc].stepCounter = scaled_size + Math.floor(scaled_size / 2);
            }
          }
        }
        break;
      case 7: // While moving LEFT
        if ((activeNpcX - scaled_size) <= npcX) {
          if (activeNpcY < npcY + (scaled_size) && activeNpcY > npcY - (scaled_size)) {
            if (Math.abs(activeNpcX - npcX) <= scaled_size) {
              isBlocked = true;
              activeMap.Npcs[activeNpc].stepCounter = scaled_size + Math.floor(scaled_size / 2);
            }
          }
        }
        break;
      case 1: // While moving UP
        if ((activeNpcY - (scaled_size)) <= npcY) {
          if (activeNpcX < npcX + (scaled_size) && activeNpcX > npcX - (scaled_size)) {
            if (Math.abs(activeNpcY - npcY) <= scaled_size) {
              isBlocked = true;
              activeMap.Npcs[activeNpc].stepCounter = scaled_size + Math.floor(scaled_size / 2);
            }
          }
        }
        break;
      case 4: // While moving DOWN
        if ((activeNpcY + (scaled_size)) >= npcY) {
          if (activeNpcX < npcX + (scaled_size) && activeNpcX > npcX - (scaled_size)) {
            if (Math.abs(activeNpcY - npcY) <= scaled_size) {
              isBlocked = true;
              activeMap.Npcs[activeNpc].stepCounter = scaled_size + Math.floor(scaled_size / 2);
            }
          }
        }
        break;
    }    
  }
  return isBlocked;
}

//////////////////////////////////
//   Is Npc Blocked By Player   //
//////////////////////////////////
function isNpcBlockedByPlayer(npcId) {  
  let npcX = activeMap.Npcs[npcId].X;
  let npcY = activeMap.Npcs[npcId].Y;
  var isBlocked = false;
  
  switch(activeMap.Npcs[npcId].Direction) {
    case 10: // While Moving Right
      if ((npcX + (scaled_size + 1)) >= player.x) {
        if (npcY < player.y + (scaled_size) && npcY > player.y - (scaled_size)) {
          if (Math.abs(npcX - player.x) <= scaled_size) {
            activeMap.Npcs[npcId].isMoving = false;
            isBlocked = true;
          } else {
            activeMap.Npcs[npcId].isMoving = true;
          }
        }
      }
      break;
    case 7: // While Moving Left
      if ((npcX - (scaled_size + 1)) <= player.x) {
        if (npcY < player.y + (scaled_size) && npcY > player.y - (scaled_size)) {
          if (Math.abs(npcX - player.x) <= scaled_size) {
            activeMap.Npcs[npcId].isMoving = false;
            isBlocked = true;
          } else {
            activeMap.Npcs[npcId].isMoving = true;
          }
        }
      }
      break;
    case 4: // While Moving Down
      if ((npcY + (scaled_size)) >= player.y) {
          if (npcX < player.x + (scaled_size) && npcX > player.x - (scaled_size)) {
            if (Math.abs(npcY - player.y) <= scaled_size) {
              activeMap.Npcs[npcId].isMoving = false;
              isBlocked = true;
            } else {
              activeMap.Npcs[npcId].isMoving = true;
            }
          }
        }
      break;
    case 1: // While Moving Up
      if ((npcY - (scaled_size)) <= player.y) {
          if (npcX < player.x + (scaled_size) && npcX > player.x - (scaled_size)) {
            if (Math.abs(npcY - player.y) <= scaled_size) {
              activeMap.Npcs[npcId].isMoving = false;
              isBlocked = true;
            } else {
              activeMap.Npcs[npcId].isMoving = true;
            }
          }
        }
  }
    
  return isBlocked;
}