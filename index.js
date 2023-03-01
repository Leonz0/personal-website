const navLinks = document.querySelectorAll(".nav-target");
const sections = document.querySelectorAll("section");
const homeNav = document.querySelector(".home");
const backHomeButton = document.querySelector(".back-home");
const logoContainer = document.querySelector(".logo-container");
const mainHeader = document.querySelector(".main-header");
const navBar = document.querySelector(".navbar");
const inputForm = document.querySelector("form");
const formItem = document.querySelector(".form-item");
const inputV = document.querySelectorAll(".input-v");
const inputName = document.querySelector(".input-name");
const homeEl = document.querySelector(".home-page");

// navBar.style.position = "fixed";
// [...navLinks].map((link) => {
//   link.addEventListener("click", function () {
//     [...navLinks].map((link) => link.classList.remove("active"));
//     this.classList.add("active");
//   });
// });
const isMobile = () => (window.innerWidth < 721 ? true : false);

window.onload = (function () {
  //   navigator.userAgent.indexOf('Safari') != -1;
  homeEl.scrollIntoView();
  document.querySelector("html").style.scrollBehavior = "smooth";
})();

const hamburger = document.getElementById("nav-toggle");
const navContainer = document.querySelector(".nav-container");

document.addEventListener("click", (e) => {
  e.target.parentNode == hamburger || e.target == navBar
    ? (hamburger.classList.toggle("active"),
      navContainer.classList.toggle("active"),
      navBar.classList.toggle("active"))
    : // : e.target.parentNode == document.querySelector(".nav-container")
      // ? setTimeout(() => {
      //     hamburger.classList.remove("active"),
      //       navContainer.classList.remove("active");
      //   }, 500)
      (hamburger.classList.remove("active"),
      navContainer.classList.remove("active"),
      navBar.classList.remove("active"));
});

const isAtHome = () => {
  if (isMobile()) return;

  homeNav.classList.contains("active")
    ? (backHomeButton.style.display = "none")
    : //   !mobile
      //     ? (logoContainer.style.display = "flex")
      //     : ((logoContainer.style.display = "none"),
      //       (navBar.style.justifyContent = "center")),
      //   (navBar.style.gap = "4em"))
      // : //   [...navLinks].map((navLink) => (navLink.style.fontSize = "1.1rem")))
      // !mobile
      //?
      ((backHomeButton.style.display = "flex"),
      //: null,
      (backHomeButton.style.justifyContent = "center"),
      (backHomeButton.style.alignItems = "center"));
  // (logoContainer.style.display = "flex"),
  // (navBar.style.justifyContent = "space-between"),
  // (navBar.style.gap = "1.5em");
  // [...navLinks].map((navLink) => (navLink.style.fontSize = "1rem"));
};

isAtHome();
//Prevent scrollY = 0 sticky navbar jitter
// let zeroSticky = 0;
window.addEventListener("scroll", (e) => {
  scrollY === 0
    ? //   && isMobile() && zeroSticky === 0
      (navBar.style.position = "absolute")
    : (navBar.style.position = "sticky");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - sectionHeight / 1.8)
      current = section.getAttribute("id");
  });

  [...navLinks].forEach((nav) => {
    nav.classList.remove("active");
    if (nav.classList.contains(current)) {
      nav.classList.add("active");
    }
  });

  //   zeroSticky = 1;
  isAtHome();
});

const slide3 = document.querySelector(".slide-1");
const slide1 = document.querySelector(".slide-3");
const mobileSlide = document.querySelector(".slide-2");
const rightPic = document.querySelector(".pic1");
const leftPic = document.querySelector(".pic3");
const curPic = document.querySelector(".pic2");
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");
let initialTouchPos = null;
let noOfPics = 3;
let slideIndex = 2;

let right = 1;
let mid = 2;
let left = 3;

showSlides(slideIndex);

const slideLeftRight = (direction) => {
  direction === "left"
    ? ((right = mid),
      (mid = left),
      left !== noOfPics ? left++ : (left = 1),
      changePicSource(left, mid, right),
      moveSlides(-1))
    : ((left = mid),
      (mid = right),
      right !== 1 ? right-- : (right = noOfPics),
      changePicSource(left, mid, right),
      moveSlides(1));
};

const mobileSlider = (() => {
  mobileSlide.addEventListener("touchstart", (e) => {
    initialTouchPos = e.touches[0].clientX;
  });

  mobileSlide.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (initialTouchPos === null) {
      return;
    }

    const currentTouchPos = e.touches[0].clientX;
    const distance = currentTouchPos - initialTouchPos;

    // Move the image horizontally based on the touch movement
    mobileSlide.style.transform = `translateX(${distance}px)`;
  });

  mobileSlide.addEventListener("touchend", (e) => {
    if (initialTouchPos === null) {
      return;
    }

    const currentTouchPos = e.changedTouches[0].clientX;
    const distance = currentTouchPos - initialTouchPos;

    if (distance > 0) {
      slideLeftRight("right");
    } else {
      slideLeftRight("left");
    }

    // Reset the image container position
    mobileSlide.style.transform = "translateX(0)";

    initialTouchPos = null;
  });
})();

function moveSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  [...dots].map(
    (dot) => (dot.className = dot.className.replace(" active", ""))
  );

  // slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function changePicSource(left, mid, right) {
  leftPic.src = `image${left}.jpg`;
  curPic.src = `image${mid}.jpg`;
  rightPic.src = `image${right}.jpg`;
}

slide3.addEventListener("click", function () {
  slideLeftRight("right");
});

slide1.addEventListener("click", function () {
  slideLeftRight("left");
});

[...inputV].map((input) =>
  input.addEventListener("input", function (e) {
    e.target.value !== ""
      ? e.target.closest(".form-item").classList.add("input-there")
      : e.target.closest(".form-item").classList.remove("input-there");
  })
);

const btnSendMsg = document.querySelector(".submit-btn");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  btnSendMsg.style.background = "rgba(0, 0, 255, 0.4)";
  btnSendMsg.style.boxShadow = "0 0 1em 0.1em rgba(0, 0, 175, 0.0)";
  btnSendMsg.innerText = "Message sent";
  inputForm.style.backgroundColor = "rgba(0, 0, 255, 0.04)";
  console.log("no submit ");
});
