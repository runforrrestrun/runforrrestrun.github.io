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
let isDragging = false;
let startX = 0;
let previousTranslate = 0;
let currentTranslate = 0;
let animationID;

const slides = document.querySelectorAll(".news-item");
const totalSlides = slides.length;
const newsWrapper = document.querySelector(".news-wrapper");

// Function to set each slide width based on the container width
function setSlideWidth() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  slides.forEach((slide) => (slide.style.width = `${sliderWidth}px`));
  updateSlidePosition();
}

// Initialize widths on load and on window resize
setSlideWidth();
window.addEventListener("resize", setSlideWidth);

// Function to update the slide position based on the current slide index
function updateSlidePosition() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  newsWrapper.style.transform = `translateX(-${currentSlide * sliderWidth}px)`;
}

// Move to the next slide function (looping back to the start if needed)
function moveToNextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides; // Automatically loops back to 0 after last slide
  updateSlidePosition();
}

// Move to the previous slide function
function moveToPreviousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loops back to the last slide if at the start
  updateSlidePosition();
}

// Move to next slide button
document.querySelector(".forth-btn").addEventListener("click", () => {
  moveToNextSlide();
});

// Move to previous slide button
document.querySelector(".back-btn").addEventListener("click", () => {
  moveToPreviousSlide();
});

// Automatically transition to the next slide every 30 seconds
setInterval(moveToNextSlide, 7000); // 5 seconds in milliseconds

// Handle touch events for mobile swipe functionality
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
  previousTranslate = currentTranslate;
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const touchX = e.touches[0].clientX;
  const deltaX = touchX - startX;

  // Update the position while dragging
  currentTranslate = previousTranslate + deltaX;

  // Apply the transform to show the dragging effect
  newsWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function handleTouchEnd(e) {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  // Determine if we should move to the next or previous slide based on swipe distance
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

// Add event listeners for touch events
newsWrapper.addEventListener("touchstart", handleTouchStart);
newsWrapper.addEventListener("touchmove", handleTouchMove);
newsWrapper.addEventListener("touchend", handleTouchEnd);

// Optional: Mouse event handlers (for desktop support)
newsWrapper.addEventListener("mousedown", handleTouchStart);
newsWrapper.addEventListener("mousemove", handleTouchMove);
newsWrapper.addEventListener("mouseup", handleTouchEnd);
newsWrapper.addEventListener("mouseleave", handleTouchEnd);
