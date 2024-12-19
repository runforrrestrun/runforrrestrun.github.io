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
document.addEventListener("DOMContentLoaded", () => {
  // Get references to navigation and dropdown elements
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

  // Check if all elements exist
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
    console.error("One or more required elements are missing.");
    return;
  }

  // Open the side navigation
  function openSideNavigation() {
    sideNavigation.classList.add("open");
    overlay.classList.add("show");
    toggleButton.style.display = "none";
  }

  // Close the side navigation
  function closeSideNavigation() {
    sideNavigation.classList.remove("open");
    overlay.classList.remove("show");
    toggleButton.style.display = "flex";
  }

  // Toggle reviews dropdown
  function toggleReviewsDropdown() {
    reviewsDropdownContent.classList.toggle("show");
  }

  // Toggle bonus dropdown
  function toggleBonusDropdown() {
    bonusDropdownContent.classList.toggle("show");
  }

  // Event listeners
  toggleButton.addEventListener("click", openSideNavigation);
  closeButton.addEventListener("click", closeSideNavigation);
  overlay.addEventListener("click", closeSideNavigation);
  reviewsDropdown.addEventListener("click", toggleReviewsDropdown);
  bonusDropdown.addEventListener("click", toggleBonusDropdown);
});
