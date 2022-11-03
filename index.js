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

//CART-OVERLAY
const cartOverlay = document.getElementsByClassName("cart-overlay")[0];
const cartOpen = document.getElementsByClassName("cart")[0];
const cartClose = document.getElementsByClassName("cart-close")[0];
const cartFinish = document.getElementsByClassName("cart-finish")[0];
const cartContinue = document.getElementsByClassName("cart-continue")[0];

cartOpen.addEventListener("click", () => {
  cartOverlay.style.left = "0";
  document.body.classList.add("stop-scrolling");
});
cartClose.addEventListener("click", () => {
  cartOverlay.style.left = "-100vw";
  document.body.classList.remove("stop-scrolling");
});
cartFinish.addEventListener("click", () => {
  console.log("Data sent to Stripe");
});
cartContinue.addEventListener("click", () => {
  cartOverlay.style.left = "-100vw";
  document.body.classList.remove("stop-scrolling");
});

//NAVBAR-OVERLAY
const navOverlay = document.getElementsByClassName("nav-overlay")[0];
const navOpen = document.getElementsByClassName("hamburger")[0];
const navClose = document.getElementsByClassName("nav-close")[0];

navOpen.addEventListener("click", () => {
  navOverlay.style.right = "0";
  document.body.classList.add("stop-scrolling");
});
navClose.addEventListener("click", () => {
  navOverlay.style.right = "-100vw";
  document.body.classList.remove("stop-scrolling");
});
