"use strict";

// more info popUp
const elsModals = document.querySelectorAll(".modal");

const toggleModal = (ev) => {
  const elBtn = ev.currentTarget;
  const elModal = document.querySelector(elBtn.dataset.modal);
  if (elModal) {
    // Close all currently open modals:
    elsModals.forEach((el) => {
      if (el !== elModal) el.classList.remove("is-active");
    });
    // Toggle open/close targeted one:
    elModal.classList.toggle("is-active");
  }
};

const elsBtns = document.querySelectorAll("[data-modal]");
elsBtns.forEach((el) => el.addEventListener("click", toggleModal));

// hamburger menu x animation
let navToggle = document.querySelector(".nav-toggle");
let bars = document.querySelectorAll(".bar");

function toggleHamburger(e) {
  if (bars) {
    bars.forEach((bar) => bar.classList.toggle("x"));
  }
}

if (navToggle) {
  navToggle.addEventListener("click", toggleHamburger);
}

// Hamburger menu
function myFunction() {
  const x = document.getElementById("myLinks");
  if (x) {
    x.style.display = x.style.display === "block" ? "" : "block";
  }
}

// Close menu click
const y = document.getElementById("myLinks");
function myFunction2() {
  if (y && y.style.display === "block") {
    y.style.display = "";
  }
}

//
// news slidebar

let currentSlide = 0;
const slides = document.querySelectorAll(".news-item");
const totalSlides = slides.length;
let startX = 0;
let isDragging = false;

document.querySelector(".forth-btn").addEventListener("click", () => {
  moveToNextSlide();
});

document.querySelector(".back-btn").addEventListener("click", () => {
  moveToPreviousSlide();
});

document
  .querySelector(".news-wrapper")
  .addEventListener("touchstart", handleTouchStart);
document
  .querySelector(".news-wrapper")
  .addEventListener("touchmove", handleTouchMove);
document
  .querySelector(".news-wrapper")
  .addEventListener("touchend", handleTouchEnd);

function moveToNextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0; // Loop back to the first slide
  }
  updateSlidePosition();
}

function moveToPreviousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1; // Loop back to the last slide
  }
  updateSlidePosition();
}

function updateSlidePosition() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  document.querySelector(".news-wrapper").style.transform = `translateX(-${
    currentSlide * sliderWidth
  }px)`;
}

// Touch event handlers
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const touchX = e.touches[0].clientX;
  const deltaX = touchX - startX;

  // Optional: add some feedback for drag movement (e.g., move the slide slightly)
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  document.querySelector(".news-wrapper").style.transform = `translateX(-${
    currentSlide * sliderWidth - deltaX
  }px)`;
}

function handleTouchEnd(e) {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      moveToNextSlide();
    } else {
      moveToPreviousSlide();
    }
  } else {
    updateSlidePosition();
  }
}
