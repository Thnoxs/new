const boxs = document.querySelectorAll(".box");
const win = new Audio("asstes/arcade-game-jump.wav");
const loose = new Audio("asstes/wrong-answer.wav");
const img = document.querySelectorAll(".img-box");
const lifeSpan = document.querySelectorAll(".lifeSpan");
const lifeUpdater = document.getElementById("lifeUpdater");
const boomConatiner = [];
let totalLife = 3;
for (let i = 0; i < boxs.length - 25; i++) {
  let numberString = Math.floor(1 + Math.random() * boxs.length).toString();
  boomConatiner.push(numberString);
}
console.log(boomConatiner);
boxs.forEach((el) => {
  el.addEventListener("click", function () {
    const index = el.getAttribute("data-index");
    if (boomConatiner.includes(index)) {
      totalLife--;
      lifeSpan[totalLife].classList.add("hidden");
      lifeUpdater.textContent = totalLife;
      if (totalLife > 0) {
        el.classList.add("bom");
        clear(boxs, "selected");
        img[Number(index - 1)].src = "/asstes/tnt.png";
        loose.play();
      } else {
        boxs.forEach((n) => {
          n.style.pointerEvents = "none";
        });
        img[Number(index - 1)].src = "/asstes/tnt.png";
        clear(boxs, "selected");
        el.classList.add("bom");
        loose.play();
        setTimeout(() => {
          location.reload();
          totalLife = 3;
        }, 3000);
      }
    } else {
      win.play();
      img[Number(index - 1)].src = "/asstes/basket.png";
      el.classList.add("selected");
    }
  });
});

function clear(el, className) {
  return el.forEach((e) => {
    setTimeout(() => {
      e.classList.remove(className);
      e.classList.remove("bom");
    }, 1000);
  });
}
