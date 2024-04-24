let snail = document.querySelector("#snail");
let chestnut = document.querySelector("#chestnut");

let snailCoordinate = 730;
let chestnutCoordinate = 800;

let isBelchaUp = false;

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

  if(isBelchaUp && chestnutCoordinate < 290 && chestnutCoordinate > 90) {
    chestnut.style.visibility = "hidden";
    
  }
}
setInterval(renderFrame, 1000/60);

let belcha = document.querySelector("#belcha");
let landBelcha = function() {
  belcha.style.bottom = "0px";
  isBelchaUp = false;
}
window.onkeydown = function (evt) {
  if (evt.code == "Space") {
    belcha.style.bottom = "90px";
    isBelchaUp = true;
    setTimeout(landBelcha, 1500); 
  }
};