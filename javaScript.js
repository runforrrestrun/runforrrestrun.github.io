"use strict";
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
// sidebar menu dropedown bonus
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".box-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const content = dropdown.querySelector(".dropdown-content-bonus");

    button.addEventListener("click", (event) => {
      // If the dropdown is already open, prevent the link click from firing
      if (content.classList.contains("visible")) {
        event.preventDefault();
      }

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown
            .querySelector(".dropdown-content-bonus")
            .classList.remove("visible");
          otherDropdown.style.marginBottom = "0";
        }
      });

      // Toggle the current dropdown
      const isVisible = content.classList.toggle("visible");

      if (isVisible) {
        dropdown.style.marginBottom = "250px";
        content.style.opacity = "1";
        content.style.visibility = "visible";
      } else {
        dropdown.style.marginBottom = "0";
        content.style.opacity = "0";
        content.style.visibility = "hidden";
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    const isDropdownClick = [...dropdowns].some((dropdown) =>
      dropdown.contains(event.target)
    );

    if (!isDropdownClick) {
      dropdowns.forEach((dropdown) => {
        dropdown
          .querySelector(".dropdown-content-bonus")
          .classList.remove("visible");
        dropdown.style.marginBottom = "0";
        const content = dropdown.querySelector(".dropdown-content-bonus");
        content.style.opacity = "0";
        content.style.visibility = "hidden";
      });
    }
  });
});
// the dropdowns in the hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const dropdownButtons = document.querySelectorAll(".dropedownbtn");

  dropdownButtons.forEach((button) => {
    const dropdownContent = button.querySelector(".dropdown-content");

    button.addEventListener("click", (event) => {
      // Close other dropdowns
      dropdownButtons.forEach((otherButton) => {
        const otherContent = otherButton.querySelector(".dropdown-content");
        if (otherButton !== button) {
          otherContent.classList.remove("visible");
        }
      });

      // Toggle current dropdown
      dropdownContent.classList.toggle("visible");
      event.stopPropagation(); // Prevent event bubbling
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    dropdownButtons.forEach((button) => {
      const dropdownContent = button.querySelector(".dropdown-content");
      dropdownContent.classList.remove("visible");
    });
  });
});

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
// Get references to the toggle button, side navigation, overlay, and close button
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const sideNavigation = document.getElementById("side-navigation");
  const overlay = document.getElementById("navigation-overlay");
  const closeButton = document.querySelector(".close-button");

  const reviewsDropdown = document.querySelector(".reviews-dropdown-toggle");
  const bonusDropdown = document.querySelector(".bonus-dropdown-toggle");
  const reviewsDropdownContent = document.getElementById(
    "reviews-dropdown-content"
  );
  const bonusDropdownContent = document.getElementById(
    "bonus-dropdown-content"
  );

  // Check if elements exist
  if (
    !toggleButton ||
    !sideNavigation ||
    !overlay ||
    !closeButton ||
    !reviewsDropdown ||
    !bonusDropdown ||
    !reviewsDropdownContent ||
    !bonusDropdownContent
  ) {
    console.error("One or more elements are missing.");
    return;
  }

  // Functions to toggle navigation
  function openSideNavigation() {
    sideNavigation.classList.add("open");
    overlay.classList.add("show");
    toggleButton.style.display = "none";
  }

  function closeSideNavigation() {
    sideNavigation.classList.remove("open");
    overlay.classList.remove("show");
    toggleButton.style.display = "block";
  }

  function toggleNavigation() {
    if (sideNavigation.classList.contains("open")) {
      closeSideNavigation();
    } else {
      openSideNavigation();
    }
  }

  // Functions to toggle dropdown menus
  function toggleReviewsDropdown() {
    reviewsDropdownContent.classList.toggle("show");
  }

  function toggleBonusDropdown() {
    bonusDropdownContent.classList.toggle("show");
  }

  // Attach event listeners
  toggleButton.addEventListener("click", toggleNavigation);
  closeButton.addEventListener("click", toggleNavigation);
  overlay.addEventListener("click", toggleNavigation);

  reviewsDropdown.addEventListener("click", toggleReviewsDropdown);
  bonusDropdown.addEventListener("click", toggleBonusDropdown);
});

console.log("JavaScript is loaded!");
