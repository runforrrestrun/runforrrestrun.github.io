"use strict";

// Tabs Review Page

// Track tab history for navigation
let tabHistory = [];
let currentTabIndex = -1;

function openTab(evt, tabName) {
  // Hide all tab contents
  const tabcontent = document.querySelectorAll(".tabcontent-info");
  tabcontent.forEach((content) => (content.style.display = "none"));

  // Remove "active" class from all tab links
  const tablinks = document.querySelectorAll(".tablinks");
  tablinks.forEach((link) => link.classList.remove("active"));

  // Show the current tab and set the "active" class
  const activeTab = document.getElementById(tabName);
  if (activeTab) {
    activeTab.style.display = "block";
    evt?.currentTarget?.classList.add("active");
  }

  // Update tab history
  if (!tabHistory.includes(tabName)) {
    tabHistory.push(tabName);
    currentTabIndex = tabHistory.length - 1;
  } else {
    currentTabIndex = tabHistory.indexOf(tabName);
  }

  // Update the URL
  history.pushState({ tab: tabName }, null, "#" + tabName);
}

// Set default tab on page load
window.onload = function () {
  const hash = window.location.hash.substring(1);
  openTab(null, hash || "Overview");
};

// Handle browser navigation
window.onpopstate = function (event) {
  if (currentTabIndex > 0) {
    currentTabIndex--;
    const previousTab = tabHistory[currentTabIndex];
    openTab(null, previousTab);
  } else {
    openTab(null, "Overview");
  }
};

// Tabs in Bonus Section
function showTab(tabName) {
  document
    .querySelectorAll(".tab-button-bonus")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".tab-content-bonus")
    .forEach((content) => content.classList.remove("active"));

  const activeButton = document.querySelector(
    `button[onclick=\"showTab('${tabName}')\"]`
  );
  const activeContent = document.getElementById(tabName);

  if (activeButton) activeButton.classList.add("active");
  if (activeContent) activeContent.classList.add("active");
}

// Smartphone Menu
const toggleButton = document.querySelector(".toggle-button");
const sideNavigation = document.querySelector(".side-navigation");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");
let isSideMenuOpen = false;
let touchStartX = 0;
let touchEndX = 0;

function openSideNavigation() {
  sideNavigation?.classList.add("open");
  overlay?.classList.add("show");
  toggleButton.style.display = "none";
  isSideMenuOpen = true;
}

function closeSideNavigation() {
  sideNavigation?.classList.remove("open");
  overlay?.classList.remove("show");
  toggleButton.style.display = "block";
  isSideMenuOpen = false;
}

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown)
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
}

// Event Listeners for Side Menu
["click", "touchend"].forEach((event) => {
  toggleButton?.addEventListener(event, openSideNavigation);
  closeButton?.addEventListener(event, closeSideNavigation);
  overlay?.addEventListener(event, closeSideNavigation);
});

// Swipe Gesture Handling
function handleSwipeGesture() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > swipeThreshold && !isSideMenuOpen) openSideNavigation();
  if (swipeDistance < -swipeThreshold && isSideMenuOpen) closeSideNavigation();
}

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

// Back to Top Button
window.addEventListener("scroll", () => {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (scrollButton) {
    if (window.scrollY > 100) {
      scrollButton.classList.add("show");
    } else {
      scrollButton.classList.remove("show");
    }
  }
});

console.log("JavaScript is loaded!");
