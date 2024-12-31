"use strict";
/// more info popUp
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

// Function to detect swipe gestures
function handleSwipeGesture() {
  const swipeThreshold = 50; // Minimum distance to recognize as a swipe
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold && !isSideMenuOpen) {
    openSideNavigation(); // Open side menu on swipe right
  } else if (swipeDistance < -swipeThreshold && isSideMenuOpen) {
    closeSideNavigation(); // Close side menu on swipe left
  }
}

// Prevent back and forward navigation from the browser
window.addEventListener("popstate", function (e) {
  // Prevent the browser from navigating back or forward
  history.pushState(null, null, location.href);
});

// Disable browser swipe back navigation (specifically for iOS)
document.body.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
  }
});

document.body.addEventListener("touchmove", function (e) {
  const swipeDistance = e.touches[0].clientX - touchStartX;
  // If swiping right, prevent default browser navigation
  if (swipeDistance > 0) {
    e.preventDefault(); // Prevent the browser's back action if swiping right
  }
});

console.log("JavaScript is loaded!");

// prevent back forward in browser

// Disable browser back and forward actions by preventing default on touchmove
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

// breadcrumbs.js
document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbsContainer = document.getElementById("breadcrumbs");
  const path = window.location.pathname.split("/").filter(Boolean);

  // Debug: Log the path to inspect how it's being split
  console.log("Full path segments:", path);

  // Home Link
  const homeCrumb = document.createElement("a");
  homeCrumb.href = "/";
  homeCrumb.textContent = "Home";
  breadcrumbsContainer.appendChild(homeCrumb);

  let cumulativePath = "";
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [],
  };

  path.forEach((segment, index) => {
    // Debug: Log each segment to check what's being processed
    console.log("Processing segment:", segment);

    // Skip "reviews-page", "news-articles", and "bonuses" folders
    if (
      segment.toLowerCase() === "reviews-page" ||
      segment.toLowerCase() === "bonuses"
    ) {
      console.log("Skipping segment:", segment); // Debug log to confirm the filtering
      return; // Skip this segment and don't add it to breadcrumbs
    }

    // Change "news-articles" to "news"
    if (segment.toLowerCase() === "news-articles") {
      segment = "news"; // Replace segment with "news"
    }

    // Sanitize: Replace symbols and non-alphanumeric characters with spaces
    segment = segment.replace(/[^a-zA-Z0-9\s]/g, " ").trim();

    // Ensure multiple spaces are replaced with a single space
    segment = segment.replace(/\s+/g, " ");

    cumulativePath += `/${segment}`;

    // Separator
    const separator = document.createElement("span");
    separator.textContent = ">";
    breadcrumbsContainer.appendChild(separator);

    // Page Link or Current Page
    const crumb = document.createElement(
      index === path.length - 1 ? "span" : "a"
    );
    crumb.textContent = segment.charAt(0).toUpperCase() + segment.slice(1);
    if (index !== path.length - 1) crumb.href = cumulativePath;
    breadcrumbsContainer.appendChild(crumb);

    // Add breadcrumb data for JSON-LD structured data
    breadcrumbData.itemListElement.push({
      "@type": "ListItem",
      position: index + 1,
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      item: window.location.origin + cumulativePath,
    });
  });

  // Insert the JSON-LD structured data into the document
  const jsonLdScript = document.createElement("script");
  jsonLdScript.type = "application/ld+json";
  jsonLdScript.innerHTML = JSON.stringify(breadcrumbData);
  document.head.appendChild(jsonLdScript);
});
