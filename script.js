let snail = document.querySelector("#snail");
let chestnut = document.querySelector("#chestnut");
let belcha = document.querySelector("#belcha");
let forest = document.querySelector(".forest");
let message = document.querySelector(".message");
let messageButtonYes = document.querySelector(".messageButtonYes");
let messageButtonNo = document.querySelector(".messageButtonNo");
let statsCounter = document.querySelector(".statsCounter");
let statsTimer = document.querySelector(".statsTimer");

let snailCoordinate = null;
let chestnutCoordinate = null;

let isBelchaUp = false;

let nutsAmount = null;

let startTime = null;

let intervalID = null;

let startGame = function() {
  belcha.className = "runningBelcha";
  snail.style.animation = null;
  chestnut.style.animation = null;
  forest.className = "movingForest forest";
  snailCoordinate = 730;
  chestnutCoordinate = 800;
  nutsAmount = 0;
  startTime = Date.now();
  statsCounter.textContent = nutsAmount;
  
  window.onkeydown = function (evt) {
    if (evt.code == "Space") {
      belcha.style.bottom = "90px";
      isBelchaUp = true;
      setTimeout(landBelcha, 1900); 
    }
  };
  
  intervalID = setInterval(renderFrame, 1000/60);
}

let endGame = function() {
  belcha.className = "happyBelcha";
}

let confirmReset = function() {
  message.style.display = "block";
  messageButtonYes.focus();
  
  messageButtonYes.onclick = function () {
    message.style.display = "none";
    startGame();
  }
  
  messageButtonNo.onclick = function () {
    message.style.display = "none";
    endGame();
  };
};

let renderFrame = function() {
  let timeSpent = Date.now() - startTime;
  statsTimer.textContent = timeFormatter(timeSpent);
  
  snail.style.left = snailCoordinate + "px";
  snailCoordinate -= 2;
  if(snailCoordinate <= -60) {
    snailCoordinate = 730;
  }
  
  chestnut.style.left = chestnutCoordinate + "px";
  chestnutCoordinate -= 1;
  if(chestnutCoordinate <= -40) {
    chestnutCoordinate = 800;
  } 

  if(isBelchaUp == true && chestnutCoordinate < 250 && chestnutCoordinate > 90) {
    chestnutCoordinate = 800;
    nutsAmount += 1;
    statsCounter.textContent = nutsAmount;
  }

  if(isBelchaUp == false && snailCoordinate < 231 && snailCoordinate > 70) {
    clearInterval(intervalID);
    belcha.className = "";
    forest.className = "forest";
    snail.style.animation = "none";
    chestnut.style.animation = "none";
    confirmReset();
  }
}

let landBelcha = function() {
  belcha.style.bottom = "0px";
  isBelchaUp = false;
}

let timeFormatter = function(time) {
  let seconds = Math.round(time/1000);
  if(seconds<10) {
    seconds = "0"+ seconds;
  }
  return "00:" + seconds;
}

startGame();

