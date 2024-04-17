let snail = document.querySelector("#snail");
let snailCoordinate = 730;
let renderSnail = function() {
  snail.style.left = snailCoordinate + "px";
  snailCoordinate -= 1;
  if(snailCoordinate <= -60) {
    snailCoordinate = 730;
  }
}
setInterval(renderSnail, 1000/24);
