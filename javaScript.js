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

const slides = document.querySelectorAll(".news-item");
const totalSlides = slides.length;
const newsWrapper = document.querySelector(".news-wrapper");

function setSlideWidth() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  slides.forEach((slide) => (slide.style.width = `${sliderWidth}px`));
  updateSlidePosition();
}

setSlideWidth();
window.addEventListener("resize", setSlideWidth);

function updateSlidePosition() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  newsWrapper.style.transform = `translateX(-${currentSlide * sliderWidth}px)`;
}

function moveToNextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
}

function moveToPreviousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

document.querySelector(".forth-btn").addEventListener("click", moveToNextSlide);
document
  .querySelector(".back-btn")
  .addEventListener("click", moveToPreviousSlide);

setInterval(moveToNextSlide, 7000);

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
  previousTranslate = currentTranslate;
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const touchX = e.touches[0].clientX;
  const deltaX = touchX - startX;

  currentTranslate = previousTranslate + deltaX;
  newsWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function handleTouchEnd(e) {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  // Only handle swipe if side menu is not open
  if (!isSideMenuOpen) {
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
}

newsWrapper.addEventListener("touchstart", handleTouchStart);
newsWrapper.addEventListener("touchmove", handleTouchMove);
newsWrapper.addEventListener("touchend", handleTouchEnd);

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

// Handle swipe gestures for opening and closing the side navigation
toggleButton.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

toggleButton.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

function handleSwipeGesture() {
  if (isSideMenuOpen) return; // Prevent opening the side menu if it's already open

  // Check for a right swipe to open the side navigation (swiping left to right)
  if (touchEndX > touchStartX && touchEndX - touchStartX > 50) {
    openSideNavigation(); // Open the side navigation if swipe is from left to right
  }

  // Check for a left swipe to close the side navigation (swiping right to left)
  if (touchStartX > touchEndX && touchStartX - touchEndX > 50) {
    closeSideNavigation(); // Close the side navigation if swipe is from right to left
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
