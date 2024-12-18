"use strict";

// more info popUp
// const elsModals = document.querySelectorAll(".modal");

// const toggleModal = (ev) => {
//   const elBtn = ev.currentTarget;
//   const elModal = document.querySelector(elBtn.dataset.modal);
//   if (elModal) {
//     // Close all currently open modals:
//     elsModals.forEach((el) => {
//       if (el !== elModal) el.classList.remove("is-active");
//     });
//     // Toggle open/close targeted one:
//     elModal.classList.toggle("is-active");
//   }
// };

// const elsBtns = document.querySelectorAll("[data-modal]");
// elsBtns.forEach((el) => el.addEventListener("click", toggleModal));

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

// tabs review papge

// back to previous tab
// Function to open a specific tab
let tabHistory = []; // Array to keep track of tab navigation
let currentTabIndex = -1; // Index to track the current visible tab

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent-info" and hide them
  tabcontent = document.getElementsByClassName("tabcontent-info");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Check if the tab is already in history
  let index = tabHistory.indexOf(tabName);
  if (index === -1) {
    // New tab opened, push to history
    tabHistory.push(tabName);
    currentTabIndex = tabHistory.length - 1; // Update index to the latest tab
  } else {
    currentTabIndex = index; // Update index to the existing tab
  }

  // Update the URL with the current tab name
  history.pushState({ tab: tabName }, null, "#" + tabName);
}

// Set the default tab to 'Overview' on page load
window.onload = function () {
  // Get the hash portion of the URL
  let hash = window.location.hash.substr(1); // Get hash without #
  if (hash) {
    openTab(event, hash); // Open the tab corresponding to the hash
  } else {
    openTab(event, "Overview"); // Open Overview by default
  }
};

// Handle back/forward navigation
window.onpopstate = function (event) {
  // Move back in tab history
  if (currentTabIndex > 0) {
    currentTabIndex--; // Move back in history
    const previousTab = tabHistory[currentTabIndex]; // Get previous tab
    openTab(event, previousTab); // Open the previous tab
  } else {
    // If at the beginning of history, stay on Overview
    openTab(event, "Overview");
  }
};
//
//
// tab in bonus section of the review page
function showTab(tabName) {
  // Remove active class from all buttons and contents
  var buttons = document.querySelectorAll(".tab-button-bonus");
  var contents = document.querySelectorAll(".tab-content-bonus");

  buttons.forEach(function (button) {
    button.classList.remove("active");
  });

  contents.forEach(function (content) {
    content.classList.remove("active");
  });

  // Add active class to the clicked button and corresponding content
  document
    .querySelector("button[onclick=\"showTab('" + tabName + "')\"]")
    .classList.add("active");
  document.getElementById(tabName).classList.add("active");
}

// smartphone menu
// Get the toggle button, side navigation, and overlay
const toggleButton = document.querySelector(".toggle-button");
const sideNavigation = document.querySelector(".side-navigation");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");

// Variables to track swipe gestures
let touchStartX = 0;
let touchEndX = 0;

// Function to open the side navigation
function openSideNavigation() {
  sideNavigation.classList.add("open"); // Open the side navigation
  overlay.classList.add("show"); // Show the overlay
  toggleButton.style.display = "none"; // Hide the toggle button
}

// Function to close the side navigation
function closeSideNavigation() {
  sideNavigation.classList.remove("open"); // Close the side navigation
  overlay.classList.remove("show"); // Hide the overlay
  toggleButton.style.display = "block"; // Show the toggle button
}

// Function to toggle dropdown menus
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  // Toggle the display of the dropdown
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Event listener for the toggle button to open the side navigation
toggleButton.addEventListener("click", openSideNavigation);

// Event listener for the overlay to close the side navigation
overlay.addEventListener("click", closeSideNavigation);

// Event listener for the close button to close the side navigation
closeButton.addEventListener("click", closeSideNavigation);

// Handle swipe gestures for opening the side navigation
document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  // Check for a right swipe to open the side navigation
  if (touchEndX > touchStartX && touchEndX - touchStartX > 50) {
    openSideNavigation();
  }
}

// Close dropdowns if clicked outside the navigation
document.addEventListener("click", function (event) {
  const isClickInsideNavigation = sideNavigation.contains(event.target);

  if (!isClickInsideNavigation) {
    // Close all dropdowns if clicked outside the navigation
    document.querySelectorAll(".dropdown-menu").forEach(function (dropdown) {
      dropdown.style.display = "none";
    });
  }
});
