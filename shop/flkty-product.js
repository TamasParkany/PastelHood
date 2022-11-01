//GALLERY-FLKTY
const carousel = document.getElementsByClassName("product-carousel")[0];

const flkty = new Flickity(carousel, {
  wrapAround: true,
  imagesLoaded: true,
  prevNextButtons: false,
});
