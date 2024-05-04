let snail = document.querySelector("#snail");
let chestnut = document.querySelector("#chestnut");
let belcha = document.querySelector("#belcha");
let forest = document.querySelector(".forest");

let snailCoordinate = null;
let chestnutCoordinate = null;

let isBelchaUp = false;

let intervalID = null;

let startGame = function() {
  belcha.className = "runningBelcha";
  forest.className = "movingForest forest";
  snailCoordinate = 730;
  chestnutCoordinate = 800;
  
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
  let userResponse = confirm("Вы врезались в улитку. Игра окончена. Попробовать еще?");
  if(userResponse == true) {
    startGame();
  } else {
    endGame();
  }
};

let renderFrame = function() {
  snail.style.left = snailCoordinate + "px";
  snailCoordinate -= 2;
  if(snailCoordinate <= -60) {
    snailCoordinate = 730;
  }
  
  chestnut.style.left = chestnutCoordinate + "px";
  chestnutCoordinate -= 1;
  if(chestnutCoordinate <= -40) {
    chestnutCoordinate = 800;
    chestnut.style.visibility = "visible";
  } 

  if(isBelchaUp == true && chestnutCoordinate < 250 && chestnutCoordinate > 90) {
    chestnut.style.visibility = "hidden";
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

startGame();

