const body = document.querySelector("body");

const IMG_NUMBER = 2;
const ASTRO_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `src/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function setAstro() {
    const ALL_ASTRO = document.querySelectorAll(".astro");
    ALL_ASTRO[0].style.visibility = 'hidden';
    ALL_ASTRO[1].style.visibility = 'hidden';
    ALL_ASTRO[2].style.visibility = 'hidden';
    const number = Math.floor(Math.random() * ASTRO_NUMBER);
    ALL_ASTRO[number].style.visibility = 'visible';
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
  setAstro();
  setInterval(setAstro, 50000);
}

init();
