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

// [...navLinks].map((link) => {
//   link.addEventListener("click", function () {
//     [...navLinks].map((link) => link.classList.remove("active"));
//     this.classList.add("active");
//   });
// });

// window.innerWidth < 767 ? backHomeButton.classList.remove(".back-home") : null;

const isMobile = () => (window.innerWidth < 721 ? true : false);

const hamburger = document.getElementById("nav-toggle");
const navContainer = document.querySelector(".nav-container");

document.addEventListener("click", (e) => {
  e.target.parentNode == hamburger || e.target == hamburger
    ? (hamburger.classList.toggle("active"),
      navContainer.classList.toggle("active"))
    : // : e.target.parentNode == document.querySelector(".nav-container")
      // ? setTimeout(() => {
      //     hamburger.classList.remove("active"),
      //       navContainer.classList.remove("active");
      //   }, 500)
      (hamburger.classList.remove("active"),
      navContainer.classList.remove("active"));
});

document.addEventListener("touchstart", (e) => {
  e.touches[0].target != hamburger &&
  e.touches[0].target != document.querySelector(".nav-container")
    ? (hamburger.classList.remove("active"),
      navContainer.classList.remove("active"))
    : null;
});

const isAtHome = () => {
  const mobile = isMobile();
  homeNav.classList.contains("active")
    ? ((backHomeButton.style.display = "none"),
      !mobile
        ? (logoContainer.style.display = "flex")
        : ((logoContainer.style.display = "none"),
          (mainHeader.style.justifyContent = "center")),
      (navBar.style.gap = "4em"),
      [...navLinks].map((navLink) => (navLink.style.fontSize = "1.1rem")))
    : !mobile
    ? (backHomeButton.style.display = "flex")
    : null,
    (backHomeButton.style.justifyContent = "center"),
    (backHomeButton.style.alignItems = "center"),
    (logoContainer.style.display = "flex"),
    (mainHeader.style.justifyContent = "space-between"),
    (navBar.style.gap = "1.5em"),
    [...navLinks].map((navLink) => (navLink.style.fontSize = "1rem"));
};

isAtHome();

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 1.8)
      current = section.getAttribute("id");
  });

  [...navLinks].forEach((nav) => {
    nav.classList.remove("active");
    if (nav.classList.contains(current)) {
      nav.classList.add("active");
    }
  });

  isAtHome();
});

const slideRight = document.querySelector(".slide-1");
const slideLeft = document.querySelector(".slide-3");
const rightPic = document.querySelector(".pic1");
const leftPic = document.querySelector(".pic3");
const curPic = document.querySelector(".pic2");
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

let noOfPics = 3;
let slideIndex = 2;

let right = 1;
let mid = 2;
let left = 3;

showSlides(slideIndex);

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

slideRight.addEventListener("click", function () {
  left = mid;
  mid = right;
  right !== 1 ? right-- : (right = noOfPics);

  changePicSource(left, mid, right);

  moveSlides(1);
});

slideLeft.addEventListener("click", function () {
  right = mid;
  mid = left;
  left !== noOfPics ? left++ : (left = 1);

  changePicSource(left, mid, right);

  moveSlides(-1);
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

  btnSendMsg.style.background = "rgba(0, 0, 255, 0.5)";
  btnSendMsg.style.boxShadow = "0 0 1em 0.1em rgba(0, 0, 175, 0.0)";
  btnSendMsg.innerText = "Message sent";
  inputForm.style.backgroundColor = "rgba(0, 0, 255, 0.04)";
  console.log("no submit ");
});
