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
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const sideNavigation = document.querySelector("#side-navigation");
  const overlay = document.querySelector("#navigation-overlay");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Variables for swipe detection
  let touchStartX = 0;
  let touchEndX = 0;

  // Function to open the side navigation
  function openSideNavigation() {
    sideNavigation.classList.add("open");
    overlay.classList.add("show");
  }

  // Function to close the side navigation
  function closeSideNavigation() {
    sideNavigation.classList.remove("open");
    overlay.classList.remove("show");
  }

  // Function to toggle dropdown visibility
  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    }
  }

  // Attach the toggleDropdown function to each dropdown toggle button
  dropdownToggles.forEach((button) => {
    button.addEventListener("click", (e) => {
      const dropdownId = e.target.getAttribute("onclick").match(/'([^']+)'/)[1];
      toggleDropdown(dropdownId);
    });
  });

  // Event listener for the toggle button
  toggleButton.addEventListener("click", () => {
    if (sideNavigation.classList.contains("open")) {
      closeSideNavigation();
    } else {
      openSideNavigation();
    }
  });

  // Event listener for the overlay to close the side navigation
  overlay.addEventListener("click", closeSideNavigation);

  // Close side navigation if clicked outside
  document.addEventListener("click", (event) => {
    if (
      !sideNavigation.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      closeSideNavigation();
    }
  });

  // Swipe detection for touch devices
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchMove(e) {
    touchEndX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd() {
    if (touchStartX - touchEndX > 50) {
      closeSideNavigation();
    } else if (touchEndX - touchStartX > 50) {
      openSideNavigation();
    }
  }

  // Attach swipe event listeners for opening/closing the menu
  sideNavigation.addEventListener("touchstart", handleTouchStart, false);
  sideNavigation.addEventListener("touchmove", handleTouchMove, false);
  sideNavigation.addEventListener("touchend", handleTouchEnd, false);
});
