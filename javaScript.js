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

// news slidebar
let currentSlide = 0;
let isDragging = false;
let isTransitioning = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;

const slides = document.querySelectorAll(".news-item");
const newsWrapper = document.querySelector(".news-wrapper");

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
newsWrapper.append(firstClone);
newsWrapper.prepend(lastClone);

const allSlides = document.querySelectorAll(".news-item"); // Include clones
const totalSlides = allSlides.length;

// Function to set slide widths and initial position
function setSlideWidth() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;

  // Set width for all slides
  allSlides.forEach((slide) => {
    slide.style.width = `${sliderWidth}px`;
  });

  // Set the wrapper width to fit all slides
  newsWrapper.style.width = `${totalSlides * sliderWidth}px`;

  // Position at the first real slide (account for cloned slides)
  newsWrapper.style.transform = `translateX(-${
    (currentSlide + 1) * sliderWidth
  }px)`;
}

setSlideWidth();
window.addEventListener("resize", setSlideWidth);

// Function to update slide position with smooth transitions
function updateSlidePosition() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  newsWrapper.style.transition = "transform 0.5s ease";
  newsWrapper.style.transform = `translateX(-${
    (currentSlide + 1) * sliderWidth
  }px)`;
}

// Move to the next slide
function moveToNextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide++;
  updateSlidePosition();
  newsWrapper.addEventListener("transitionend", handleTransitionEnd);
}

// Move to the previous slide
function moveToPreviousSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide--;
  updateSlidePosition();
  newsWrapper.addEventListener("transitionend", handleTransitionEnd);
}

// Handle transition end for wrapping logic
function handleTransitionEnd() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  isTransitioning = false;
  newsWrapper.style.transition = "none";

  // Wrap around logic
  if (currentSlide === totalSlides - 2) {
    currentSlide = 0; // Go to the first real slide
    newsWrapper.style.transform = `translateX(-${
      (currentSlide + 1) * sliderWidth
    }px)`;
  } else if (currentSlide === -1) {
    currentSlide = totalSlides - 3; // Go to the last real slide
    newsWrapper.style.transform = `translateX(-${
      (currentSlide + 1) * sliderWidth
    }px)`;
  }

  newsWrapper.removeEventListener("transitionend", handleTransitionEnd);
}

// Touch/drag events
function handleTouchStart(e) {
  if (isTransitioning) return;
  isDragging = true;
  startX = getPointerPosition(e);
  previousTranslate = -(
    (currentSlide + 1) *
    document.querySelector(".news-slider").offsetWidth
  );
  newsWrapper.style.transition = "none"; // Disable transition during drag
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const currentX = getPointerPosition(e);
  const deltaX = currentX - startX;

  currentTranslate = previousTranslate + deltaX;
  newsWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function handleTouchEnd() {
  if (!isDragging) return;
  isDragging = false;

  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  const movementThreshold = sliderWidth / 4; // Minimum drag distance to change slide
  const movedBy = currentTranslate - previousTranslate;

  if (movedBy < -movementThreshold) {
    moveToNextSlide();
  } else if (movedBy > movementThreshold) {
    moveToPreviousSlide();
  } else {
    updateSlidePosition(); // Snap back to the current slide
  }
}

// Helper to get touch or mouse position
function getPointerPosition(e) {
  return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

// Event listeners for buttons
document.querySelector(".forth-btn").addEventListener("click", moveToNextSlide);
document
  .querySelector(".back-btn")
  .addEventListener("click", moveToPreviousSlide);

// Event listeners for touch/drag
newsWrapper.addEventListener("touchstart", handleTouchStart);
newsWrapper.addEventListener("touchmove", handleTouchMove);
newsWrapper.addEventListener("touchend", handleTouchEnd);

newsWrapper.addEventListener("mousedown", handleTouchStart);
newsWrapper.addEventListener("mousemove", handleTouchMove);
newsWrapper.addEventListener("mouseup", handleTouchEnd);
newsWrapper.addEventListener("mouseleave", handleTouchEnd);

// Auto-slide
setInterval(() => {
  if (!isDragging) moveToNextSlide();
}, 7000);

// sanow
document.addEventListener("DOMContentLoaded", function () {
  const snowContainer = document.getElementById("snow");
  const snowflakeCount = 100; // Number of snowflakes

  for (let i = 0; i < snowflakeCount; i++) {
    let snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄"; // Snowflake character

    // Random position, size, speed, and delay for smoother animation
    snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    snowflake.style.fontSize = `${Math.random() * 1 + 0.5}em`; // Smaller random size (0.5em to 1.5em)
    snowflake.style.animationDuration = `${Math.random() * 8 + 8}s`; // Random speed for the animation
    snowflake.style.animationDelay = `${Math.random() * 5}s`; // Random start time

    snowContainer.appendChild(snowflake);
  }

  // Update snowflakes based on scroll position
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY; // Get the current scroll position

    // Adjust the top position of snowflakes based on scroll
    const snowflakes = document.querySelectorAll(".snowflake");
    snowflakes.forEach((snowflake, index) => {
      const fallDistance = (scrollPosition * (index + 1)) / 50; // Calculate distance based on scroll
      snowflake.style.top = `${fallDistance}px`; // Move snowflake based on scroll
    });
  });
});

// smartphone menu
// Select necessary elements
const toggleButton = document.querySelector(".toggle-button");
const sideNavigation = document.querySelector(".side-navigation");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");

// Track if the side menu is open
let isSideMenuOpen = false;

// Variables to track swipe gestures
let touchStartX = 0;
let touchEndX = 0;

// Function to open the side navigation
function openSideNavigation() {
  sideNavigation.classList.add("open"); // Open the side navigation
  overlay.classList.add("show"); // Show the overlay
  toggleButton.style.display = "none"; // Hide the toggle button
  isSideMenuOpen = true; // Set the flag to true when side menu is open
}

// Function to close the side navigation
function closeSideNavigation() {
  sideNavigation.classList.remove("open"); // Close the side navigation
  overlay.classList.remove("show"); // Hide the overlay
  toggleButton.style.display = "block"; // Show the toggle button
  isSideMenuOpen = false; // Set the flag to false when side menu is closed
}

// Function to toggle dropdown menus (Review and Bonus)
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  // Toggle the display of the dropdown
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

// Event listener for the toggle button to open the side navigation
toggleButton.addEventListener("click", openSideNavigation);

// Event listener for the overlay to close the side navigation
overlay.addEventListener("click", closeSideNavigation);

// Event listener for the close button to close the side navigation
closeButton.addEventListener("click", closeSideNavigation);

// Handle swipe gestures for opening
toggleButton.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

toggleButton.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

// Handle swipe gestures for closing
sideNavigation.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

sideNavigation.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

overlay.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

overlay.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

// Function to handle swipe gestures
function handleSwipeGesture() {
  if (isSideMenuOpen) {
    // Check for a left swipe to close the side navigation (swiping right to left)
    if (touchStartX > touchEndX && touchStartX - touchEndX > 50) {
      closeSideNavigation(); // Close the side navigation if swipe is from right to left
    }
  } else {
    // Check for a right swipe to open the side navigation (swiping left to right)
    if (touchEndX > touchStartX && touchEndX - touchStartX > 50) {
      openSideNavigation(); // Open the side navigation if swipe is from left to right
    }
  }
}

// Close dropdowns if clicked outside
document.addEventListener("click", function (event) {
  const isClickInsideNavigation = sideNavigation.contains(event.target);

  if (!isClickInsideNavigation) {
    // Close all dropdowns if clicked outside the navigation
    document.querySelectorAll(".dropdown-menu").forEach(function (dropdown) {
      dropdown.style.display = "none";
    });
  }
});

// Make sure that clicking on the dropdown button toggles the dropdown menu
document.querySelector(".dropdownbtn-review").addEventListener("click", () => {
  toggleDropdown("dropdown-content-review");
});

document.querySelector(".dropdownbtn-bonus").addEventListener("click", () => {
  toggleDropdown("dropdown-content-bonus");
});

console.log("JavaScript is loaded!");

// Prevent default behavior for swipe gestures on mobile
document
  .querySelector(".side-navigation")
  .addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent the default browser swipe action
    touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
  });

document
  .querySelector(".side-navigation")
  .addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent the default browser swipe action
  });

document.querySelector(".side-navigation").addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});
