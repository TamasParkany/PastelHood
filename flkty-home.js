const carousel = document.getElementsByClassName("carousel")[0];
const prev = document.getElementsByClassName("carousel-prev")[0];
const next = document.getElementsByClassName("carousel-next")[0];

const flkty = new Flickity(carousel, {
  wrapAround: true,
  imagesLoaded: true,
  prevNextButtons: false,
  pageDots: false,
});

prev.addEventListener("click", () => {
  flkty.previous();
});
next.addEventListener("click", () => {
  flkty.next();
});

//resizes carousel after content has finished loading

window.addEventListener("load", () => {
  flkty.resize();
});
