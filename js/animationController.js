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

    
    function setAnimStep() {
     if (player.AnimStep === 0) {
       player.AnimStep = -1;
     } else if (player.AnimStep === -1) {
       player.AnimStep = 1;
     } else if (player.AnimStep === 1) {
       player.AnimStep = 0;
     }
    }
      
    ////////////////////////
    //   Main Anim Loop   //
    ////////////////////////
    setInterval(function(){
      if (player.isMoving === true) {
        setAnimStep();
      } else {
        player.AnimStep = 0;
      }
    },1000/8.5);

    ////////////////////////////
    //   Map Animation Loop   //
    ////////////////////////////
    setInterval(function(){
      if (mapAnimFrame === true) {
        mapAnimFrame = false;
      } else {
        mapAnimFrame = true;
      }
    },1000/4.25);