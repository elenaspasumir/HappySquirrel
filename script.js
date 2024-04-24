let snail = document.querySelector("#snail");
let snailCoordinate = 730;
let renderSnail = function() {
  snail.style.left = snailCoordinate + "px";
  snailCoordinate -= 2;
  if(snailCoordinate <= -60) {
    snailCoordinate = 730;
  }
}
setInterval(renderSnail, 1000/60);

let belcha = document.querySelector("#belcha");
let landBelcha = function() {
  belcha.style.bottom = "0px";
}
window.onkeydown = function (evt) {
  if (evt.code == "Space") {
    belcha.style.bottom = "80px";
    setTimeout(landBelcha, 1500); 
  }
};