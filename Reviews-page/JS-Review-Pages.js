"use strict";

// Track tab history for navigation
let tabHistory = [],
  currentTabIndex = -1,
  tabs = [];

// Open tab function with improved accessibility
function openTab(evt, tabName) {
  // Remove hidden class from all tabs and set them as hidden except the active one
  document.querySelectorAll(".tabcontent-info").forEach((el) => {
    el.classList.add("hidden");
    el.setAttribute("aria-hidden", "true"); // Mark as hidden for screen readers
  });

  // Remove active class from all tab links
  document
    .querySelectorAll(".tablinks")
    .forEach((el) => el.classList.remove("active"));

  // Display the selected tab
  const activeTab = document.getElementById(tabName);
  if (activeTab) {
    activeTab.classList.remove("hidden");
    activeTab.setAttribute("aria-hidden", "false"); // Mark as visible for screen readers
    const activeButton = document.querySelector(
      `.tablinks[data-tab="${tabName}"]`
    );
    if (activeButton) activeButton.classList.add("active");
  }

  // Update tab history for navigation
  currentTabIndex = tabHistory.includes(tabName)
    ? tabHistory.indexOf(tabName)
    : (tabHistory.push(tabName), tabHistory.length - 1);
  history.pushState({ tab: tabName }, null, "#" + tabName);
}

// Initialize tabs on page load
window.onload = function () {
  tabs = Array.from(
    document.querySelectorAll(".tabcontent-info"),
    (tab) => tab.id
  );

  const initialTab = window.location.hash.substring(1) || "Overview";
  openTab(null, initialTab); // Open the default or specified tab
  document
    .querySelector(`.tablinks[data-tab="${initialTab}"]`)
    ?.classList.add("active");
};

// Handle browser back and forward button navigation
window.onpopstate = function () {
  if (currentTabIndex > 0) openTab(null, tabHistory[--currentTabIndex]);
  else window.history.back();
};

// Keyboard navigation for tabs
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown")
    openTab(
      null,
      tabs[(currentTabIndex = (currentTabIndex + 1) % tabs.length)]
    );
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
    openTab(
      null,
      tabs[
        (currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length)
      ]
    );
});

// Function for secondary tab groups (e.g., bonus tabs)
function showTab(tabName) {
  document
    .querySelectorAll(".tab-button-bonus")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".tab-content-bonus")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelector(`button[onclick="showTab('${tabName}')"]`)
    ?.classList.add("active");
  document.getElementById(tabName)?.classList.add("active");
}

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

// Back to Top Button
("use strict");

// Flag to track if scrolling is programmatic
let isScrolling = false;

// Add a scroll event listener to show or hide the "Back to Top" button
window.addEventListener("scroll", () => {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (scrollButton) {
    if (window.scrollY > 100) {
      scrollButton.classList.add("show"); // Show the button
    } else {
      scrollButton.classList.remove("show"); // Hide the button
    }
  }
});

// Add a click event listener to the "Back to Top" button
document.querySelector(".scroll-to-top")?.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  isScrolling = true; // Set the scrolling flag
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll to the top
  });
  // Reset the scrolling flag after a delay matching the scroll animation
  setTimeout(() => {
    isScrolling = false;
  }, 300); // Adjust delay if needed
});

console.log("JavaScript is loaded!");
