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