console.log("Pastel Hood s.r.o.");

//HEADER-HIDER
const header = document.getElementsByTagName("header")[0];

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    header.style.top = "0";
  } else {
    header.style.top = "-150px";
  }
  prevScrollpos = currentScrollPos;
};

//GALLERY-FLKTY
const carousel = document.getElementsByClassName("carousel")[0];
const prev = document.getElementsByClassName("carousel-prev")[0];
const next = document.getElementsByClassName("carousel-next")[0];

let flkty = new Flickity(carousel, {
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
