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

//NAVBAR-OVERLAY
const navOverlay = document.getElementsByClassName("nav-overlay")[0];
const navOpen = document.getElementsByClassName("hamburger")[0];
const navClose = document.getElementsByClassName("nav-close")[0];

navOpen.addEventListener("click", () => {
  navOverlay.style.right = "0";
});
navClose.addEventListener("click", () => {
  navOverlay.style.right = "-100vw";
});
