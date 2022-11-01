const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

image1.addEventListener("mouseover", () => {
  image1.src = "/assets/images/real/real_alt.JPG";
});
image1.addEventListener("mouseout", () => {
  image1.src = "/assets/images/real/real_front.JPG";
});
image2.addEventListener("mouseover", () => {
  image2.src = "/assets/images/slasher/slasher_alt.JPG";
});
image2.addEventListener("mouseout", () => {
  image2.src = "/assets/images/slasher/slasher_front_f.JPG";
});
image3.addEventListener("mouseover", () => {
  image3.src = "/assets/images/lost/lost_alt_f.JPG";
});
image3.addEventListener("mouseout", () => {
  image3.src = "/assets/images/lost/lost_front_f.JPG";
});
