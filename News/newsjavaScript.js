"use strict";

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

// Select necessary elements
const toggleButton = document.querySelector(".toggle-button");
const sideNavigation = document.querySelector(".side-navigation");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");
const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

// Track if the side menu is open
let isSideMenuOpen = false;

// Variables to track swipe gestures
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Function to open the side navigation
function openSideNavigation() {
  sideNavigation.classList.add("open"); // Open the side navigation
  overlay.classList.add("show"); // Show the overlay
  toggleButton.style.display = "none"; // Hide the toggle button
  isSideMenuOpen = true; // Set the flag to true when side menu is open
}

// Add event listeners to each button to toggle the dropdown menu
dropdownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the next sibling (dropdown menu)
    const dropdownMenu = event.target.nextElementSibling;

    // Toggle the 'show' class to display or hide the dropdown
    dropdownMenu.classList.toggle("show");
  });
});

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
  if (dropdown) {
    // Toggle the visibility by adding/removing the 'show' class
    dropdown.classList.toggle("show");
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
  touchStartY = e.touches[0].clientY; // Record the starting point of the swipe
});

toggleButton.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  touchEndY = e.changedTouches[0].clientY; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

// Handle swipe gestures for closing
sideNavigation.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
  touchStartY = e.touches[0].clientY; // Record the starting point of the swipe
});

sideNavigation.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  touchEndY = e.changedTouches[0].clientY; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

overlay.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
  touchStartY = e.touches[0].clientY; // Record the starting point of the swipe
});

overlay.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  touchEndY = e.changedTouches[0].clientY; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

// Function to handle swipe gestures
function handleSwipeGesture() {
  // Check for horizontal swipes (left or right)
  const horizontalSwipe = Math.abs(touchEndX - touchStartX) > 50;
  const verticalSwipe = Math.abs(touchEndY - touchStartY) < 50; // Ensure it's primarily horizontal

  if (isSideMenuOpen && horizontalSwipe && verticalSwipe) {
    // Check for a left swipe to close the side navigation (swiping right to left)
    if (touchStartX > touchEndX) {
      closeSideNavigation(); // Close the side navigation if swipe is from right to left
    }
  } else if (!isSideMenuOpen && horizontalSwipe && verticalSwipe) {
    // Check for a right swipe to open the side navigation (swiping left to right)
    if (touchEndX > touchStartX) {
      openSideNavigation(); // Open the side navigation if swipe is from left to right
    }
  }
}

// Close dropdowns if clicked outside
document.addEventListener("click", function (event) {
  const isClickInsideNavigation = sideNavigation.contains(event.target);
  const isClickInsideDropdown =
    event.target.closest(".dropdownbtn-review") ||
    event.target.closest(".dropdownbtn-bonus");

  // Close the dropdowns if clicked outside the navigation or dropdown button
  if (!isClickInsideNavigation && !isClickInsideDropdown) {
    document
      .querySelectorAll(".dropdown-content-review, .dropdown-content-bonus")
      .forEach(function (dropdown) {
        dropdown.classList.remove("show"); // Hide the dropdown by removing 'show' class
      });
  }
});

// Make sure that clicking on the dropdown button toggles the dropdown menu
document
  .querySelector(".dropdownbtn-review")
  ?.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the document
    toggleDropdown("dropdown-content-review");
  });

document.querySelector(".dropdownbtn-bonus")?.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the event from bubbling up to the document
  toggleDropdown("dropdown-content-bonus");
});

console.log("JavaScript is loaded!");

// prevent pshone browser back forward on swipe
window.addEventListener(
  "touchmove",
  function (e) {
    // Only prevent horizontal swipe if the movement is primarily horizontal
    if (e.touches.length === 1) {
      const touchMoveX = e.touches[0].pageX;
      const touchMoveY = e.touches[0].pageY;
      const deltaX = touchMoveX - this.touchStartX;
      const deltaY = touchMoveY - this.touchStartY;

      // Allow vertical scrolling (deltaY) but prevent horizontal swipe (deltaX)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault(); // Prevent horizontal swipe navigation
      }
    }
  },
  { passive: false }
);

// Disable popstate event to prevent browser's back navigation
window.addEventListener("popstate", function (e) {
  history.pushState(null, null, location.href); // Keep the current state, prevent back navigation
});

// Track touch start position for swipe detection
window.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    this.touchStartX = e.touches[0].pageX;
    this.touchStartY = e.touches[0].pageY;
  }
});

// back to the top arrow
// Event listener to show the scroll-to-top button when scrolling
window.addEventListener("scroll", function () {
  const scrollButton = document.querySelector(".scroll-to-top");

  // Show the button when the page is scrolled down 100px or more
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
});
