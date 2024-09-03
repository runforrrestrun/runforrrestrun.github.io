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
