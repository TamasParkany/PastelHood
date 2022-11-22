// COUNTDOWN
const countDownDate = new Date("Dec 2, 2022 19:00:00").getTime();
let prevMinutes = null;

const x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (minutes != prevMinutes) {
    prevMinutes = minutes;

    let d = days.toString().split("");
    let h = hours.toString().split("");
    let m = minutes.toString().split("");

    //days
    if (d.length > 1) {
      document.getElementById("days-left").textContent = d[0];
      document.getElementById("days-right").textContent = d[1];
    } else {
      document.getElementById("days-right").textContent = d[0];
    }
    //hours
    if (h.length > 1) {
      document.getElementById("hours-left").textContent = h[0];
      document.getElementById("hours-right").textContent = h[1];
    } else {
      document.getElementById("hours-right").textContent = h[0];
    }
    //minutes
    if (m.length > 1) {
      document.getElementById("minutes-left").textContent = m[0];
      document.getElementById("minutes-right").textContent = m[1];
    } else {
      document.getElementById("minutes-right").textContent = m[0];
    }
  }

  if (distance < 0) {
    clearInterval(x);
    console.log("countdown expired");
  }
}, 1000);

//IMAGE-MOUSEOVER
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  console.log("");
} else {
  const image1 = document.getElementById("image1");
  const image2 = document.getElementById("image2");
  const image3 = document.getElementById("image3");

  image1.addEventListener("mouseover", () => {
    image1.src = "/assets/images/real/real_front.JPG";
  });
  image1.addEventListener("mouseout", () => {
    image1.src = "/assets/images/real/real_group.JPG";
  });
  image2.addEventListener("mouseover", () => {
    image2.src = "/assets/images/slasher/slasher_front_f.JPG";
  });
  image2.addEventListener("mouseout", () => {
    image2.src = "/assets/images/slasher/slasher_group_alt.JPG";
  });
  image3.addEventListener("mouseover", () => {
    image3.src = "/assets/images/lost/lost_front_f.JPG";
  });
  image3.addEventListener("mouseout", () => {
    image3.src = "/assets/images/lost/lost_group_alt.JPG";
  });
}
