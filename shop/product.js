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

//SIZE-GUIDE
const sizeTable = {
  XS: {
    chest: 106,
    waist: 99,
    length: 64,
    sleeve: 74,
  },
  S: {
    chest: 112,
    waist: 105,
    length: 66,
    sleeve: 76,
  },
  M: {
    chest: 118,
    waist: 111,
    length: 68,
    sleeve: 78,
  },
  L: {
    chest: 124,
    waist: 117,
    length: 70,
    sleeve: 80,
  },
  XL: {
    chest: 130,
    waist: 123,
    length: 72,
    sleeve: 82,
  },
  XXL: {
    chest: 136,
    waist: 129,
    length: 74,
    sleeve: 84,
  },
};

const sizeGuideOverlay =
  document.getElementsByClassName("size-guide-overlay")[0];
const sizeGuideOpen = document.getElementsByClassName("product-size-info")[0];
const sizeGuideClose = document.getElementsByClassName("size-guide-close")[0];
const sizeGuideSelector = Array.from(
  document.getElementsByClassName("size-selector")
);

const chest = document.getElementById("chest");
const waist = document.getElementById("waist");
const length = document.getElementById("length");
const sleeve = document.getElementById("sleeve");

sizeGuideOpen.addEventListener("click", () => {
  sizeGuideOverlay.style.display = "block";
});
sizeGuideClose.addEventListener("click", () => {
  sizeGuideOverlay.style.display = "none";
});

function sizeGuideSelect(e) {
  sizeGuideSelector.forEach((size) => {
    size.classList.remove("selected-size");
  });

  e.target.classList.add("selected-size");
  chest.innerText = `${sizeTable[e.target.dataset.sizeTable]["chest"]}cm`;
  waist.innerText = `${sizeTable[e.target.dataset.sizeTable]["waist"]}cm`;
  length.innerText = `${sizeTable[e.target.dataset.sizeTable]["length"]}cm`;
  sleeve.innerText = `${sizeTable[e.target.dataset.sizeTable]["sleeve"]}cm`;
}

sizeGuideSelector.forEach((size) => {
  size.addEventListener("click", sizeGuideSelect);
});

//PRODUCT-SIZE-SELECTOR
const productSizeSelector = Array.from(document.getElementsByClassName("size"));

function sizeSelect(e) {
  productSizeSelector.forEach((size) => {
    size.classList.remove("selected-size");
  });

  e.target.classList.add("selected-size");
}

productSizeSelector.forEach((size) => {
  size.addEventListener("click", sizeSelect);
});

//ADD-TO-CART
document
  .getElementsByClassName("add-button")[0]
  .addEventListener("click", () => {
    console.log(
      `Added an ${
        document.getElementsByClassName("selected-size")[0].dataset.size
      } sized Hoodie to your Cart!`
    );
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
