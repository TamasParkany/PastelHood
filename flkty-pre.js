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

//ANIMATE.CSS

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

const text = document.getElementsByClassName("text")[0];

animateCSS(".text", "fadeIn").then(() => {
  animateCSS(".text", "fadeOut").then(() => {
    text.style.opacity = "0";
    text.innerText = "18.11.2022";
    animateCSS(".text", "fadeIn").then(() => {
      text.style.opacity = "1";
    });
  });
});
