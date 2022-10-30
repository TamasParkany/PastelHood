//NAVBAR-OVERLAY
const menuButton = document.getElementsByClassName("hamburger")[0];
const closeButton = document.getElementsByClassName("nav-close")[0];
const navOverlay = document.getElementsByClassName("nav-overlay")[0];

menuButton.addEventListener("click", () => {
  navOverlay.style.left = "0";
});
closeButton.addEventListener("click", () => {
  navOverlay.style.left = "-100vw";
});

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
const carousel = document.getElementsByClassName("product-carousel")[0];

const flkty = new Flickity(carousel, {
  wrapAround: true,
  imagesLoaded: true,
  prevNextButtons: false,
});

//ACCORDION
const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    let openOrClose = this.children[1];
    if (openOrClose.innerText === "+") {
      openOrClose.innerText = "-";
    } else {
      openOrClose.innerText = "+";
    }

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
