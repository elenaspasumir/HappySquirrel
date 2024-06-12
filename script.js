let snail = document.querySelector("#snail");
let chestnut = document.querySelector("#chestnut");
let belcha = document.querySelector("#belcha");
let forest = document.querySelector(".forest");
let message = document.querySelector(".message");
let messageButtonYes = document.querySelector(".messageButtonYes");
let messageButtonNo = document.querySelector(".messageButtonNo");
let statsCounter = document.querySelector(".statsCounter");
let statsTimer = document.querySelector(".statsTimer");
let controlJump = document.querySelector(".controlJump");

let snailCoordinate = null;
let chestnutCoordinate = null;
let forestCoordinate = 0;

let isBelchaUp = false;

let nutsAmount = null;

let startTime = null;

let intervalID = null;

let coordinateRange = 400;

let startGame = function() {
  belcha.className = "runningBelcha";
  snail.style.animation = null;
  chestnut.style.animation = null;
  snailCoordinate = getRandomNumber(730, 730 + coordinateRange);
  chestnutCoordinate = getRandomNumber(800, 800 + coordinateRange);
  nutsAmount = 0;
  startTime = Date.now();
  statsCounter.textContent = nutsAmount;
  
  window.onkeydown = function (evt) {
    if (evt.code == "Space") {
      jumpBelcha();
    }
  };

  controlJump.onclick = function() {
    jumpBelcha();
  }
  
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
    snailCoordinate = getRandomNumber(730, 730 + coordinateRange);
  }
  
  chestnut.style.left = chestnutCoordinate + "px";
  chestnutCoordinate -= 1;
  if(chestnutCoordinate <= -40) {
    chestnutCoordinate = getRandomNumber(800, 800 + coordinateRange);
  } 

  forest.style.backgroundPositionX = forestCoordinate + "px";
  forestCoordinate -= 1.5;

  if(isBelchaUp == true && chestnutCoordinate < 250 - 80 && chestnutCoordinate > 90 - 80) {
    chestnutCoordinate = getRandomNumber(800, 800 + coordinateRange);
    nutsAmount += 1;
    statsCounter.textContent = nutsAmount;
  }

  if(isBelchaUp == false && snailCoordinate < 231 - 80 && snailCoordinate > 70 - 80) {
    clearInterval(intervalID);
    belcha.className = "";
    snail.style.animation = "none";
    chestnut.style.animation = "none";
    confirmReset();
  }
}

let jumpBelcha = function() {
  belcha.style.bottom = "90px";
  isBelchaUp = true;
  setTimeout(landBelcha, 1900); 
}

let landBelcha = function() {
  belcha.style.bottom = "0px";
  isBelchaUp = false;
}

let timeFormatter = function(time) {
  let minutes = Math.floor(time / 60000);
  if(minutes < 10) {
    minutes = "0" + minutes;
  }
    
  let seconds = Math.floor(time % 60000 / 1000);
  if(seconds < 10) { 
    seconds = "0"+ seconds;
  }
  return minutes + ":" + seconds;
}

let preloadImages = function () {
  let imageUrls = [
    "chipmunk.png", 
    "snail_1f40c.png",
    "chestnut_1f330.png",
    "stopwatch_23f1-fe0f.png",
    "background.svg"
  ];

  let imagesLeft = imageUrls.length;

  for(let url of imageUrls) {
    let image = new Image();
    image.onload = function() {
      imagesLeft = imagesLeft - 1;
      if(imagesLeft == 0) {
        startGame();
      }
    }
    image.src = url;
  }
  
}

let getRandomNumber = function (from, to) {
  return from + Math.round(Math.random() * (to - from));
}

preloadImages();
