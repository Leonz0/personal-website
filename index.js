const navLinks = document.querySelectorAll(".nav-target");
const sections = document.querySelectorAll("section");
const homeNav = document.querySelector(".home");
const backHomeButton = document.querySelector(".back-home");
const logoContainer = document.querySelector(".logo-container");
const mainHeader = document.querySelector(".main-header");
const navBar = document.querySelector(".navbar");
const homeEl = document.querySelector(".home-page");

const isMobile = () => (window.innerWidth < 721 ? true : false);

addEventListener("load", function () {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute(
    "content",
    viewport.content + ", height=" + window.innerHeight
  );
});

const hamburger = document.getElementById("nav-toggle");
const navContainer = document.querySelector(".nav-container");

document.addEventListener("click", (e) => {
  e.target.parentNode == hamburger || e.target == navBar
    ? (hamburger.classList.toggle("active"),
      navContainer.classList.toggle("active"),
      navBar.classList.toggle("active"))
    : (hamburger.classList.remove("active"),
      navContainer.classList.remove("active"),
      navBar.classList.remove("active"));
});

const isAtHome = () => {
  if (isMobile()) return;
  homeNav.classList.contains("active")
    ? (backHomeButton.style.display = "none")
    : ((backHomeButton.style.display = "flex"),
      (backHomeButton.style.justifyContent = "center"),
      (backHomeButton.style.alignItems = "center"));
};

window.addEventListener("scroll", (e) => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - sectionHeight / 1.8)
      current = section.getAttribute("id");
  });

  [...navLinks].forEach((nav) => {
    nav.classList.contains(current)
      ? nav.classList.add("active")
      : nav.classList.remove("active");
  });

  isAtHome();
});

//Profolio page
const leftSlide = document.querySelector(".slide-3");
const rightSlide = document.querySelector(".slide-2");
const middleSlide = document.querySelector(".slide-1");
const rightPic = document.querySelector(".pic2");
const leftPic = document.querySelector(".pic3");
const curPic = document.querySelector(".pic1");
const slides = document.getElementsByClassName("mySlides");

const gallery = [1, 2, 3]; // After fetch projects.length

let initialTouchPos = null;
let right = 2;
let mid = 1;
let left = gallery.length;

function changePicSource(left, mid, right) {
  leftPic.src = `image${left}.jpg`;
  curPic.src = `image${mid}.jpg`;
  rightPic.src = `image${right}.jpg`;
}

const slideLeftOrRight = (direction) => {
  direction === "left"
    ? ((left = mid),
      (mid = right),
      right < gallery.length ? right++ : (right = 1),
      changePicSource(left, mid, right))
    : ((right = mid),
      (mid = left),
      left > 1 ? left-- : (left = gallery.length),
      changePicSource(left, mid, right));
};

const mobileSlider = (() => {
  middleSlide.addEventListener("touchstart", (e) => {
    initialTouchPos = e.touches[0].clientX;
  });

  middleSlide.addEventListener("touchmove", (e) => {
    // e.preventDefault();
    if (initialTouchPos === null) return;

    const currentTouchPos = e.touches[0].clientX;
    const distance = currentTouchPos - initialTouchPos;

    middleSlide.style.transform = `translateX(${distance > 0 ? 1 : -1}em)`;
  });

  middleSlide.addEventListener("touchend", (e) => {
    if (initialTouchPos === null) return;

    const currentTouchPos = e.changedTouches[0].clientX;
    const distance = currentTouchPos - initialTouchPos;

    distance > 0 ? slideLeftOrRight("right") : slideLeftOrRight("left");

    // Reset the image container position
    middleSlide.style.transform = "translateX(0)";

    initialTouchPos = null;
  });
})();

leftSlide.addEventListener("click", function () {
  slideLeftOrRight("right");
});

rightSlide.addEventListener("click", function () {
  slideLeftOrRight("left");
});

// Form page
const formInput = document.querySelectorAll(".form-input");
const btnSendMsg = document.querySelector(".submit-btn");
const inputForm = document.querySelector("form");

[...formInput].map((input) =>
  input.addEventListener("input", function (e) {
    e.target.value !== ""
      ? e.target.closest(".form-item").classList.add("input-there")
      : e.target.closest(".form-item").classList.remove("input-there");
  })
);

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  btnSendMsg.style.background = "rgba(0, 0, 255, 0.4)";
  btnSendMsg.style.boxShadow = "0 0 1em 0.1em rgba(0, 0, 175, 0.0)";
  btnSendMsg.innerText = "Message sent";
  inputForm.style.backgroundColor = "rgba(0, 0, 255, 0.04)";
  console.log("no submit ");
});
