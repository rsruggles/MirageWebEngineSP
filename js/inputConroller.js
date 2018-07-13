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
      
      // var wKey = false, aKey = false, sKey = false, dKey = false;
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
      };

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
      