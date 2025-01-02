"use strict";

// Tabs Review Page

// Track tab history for navigation
let tabHistory = [],
  currentTabIndex = -1,
  tabs = [];

function openTab(evt, tabName) {
  document
    .querySelectorAll(".tabcontent-info")
    .forEach((el) => (el.style.display = "none"));
  document
    .querySelectorAll(".tablinks")
    .forEach((el) => el.classList.remove("active"));
  const activeTab = document.getElementById(tabName);
  if (activeTab) {
    activeTab.style.display = "block";
    const activeButton = document.querySelector(
      `.tablinks[data-tab="${tabName}"]`
    );
    if (activeButton) activeButton.classList.add("active");
  }
  currentTabIndex = tabHistory.includes(tabName)
    ? tabHistory.indexOf(tabName)
    : (tabHistory.push(tabName), tabHistory.length - 1);
  history.pushState({ tab: tabName }, null, "#" + tabName);
}

window.onload = function () {
  tabs = Array.from(
    document.querySelectorAll(".tabcontent-info"),
    (tab) => tab.id
  );
  openTab(null, window.location.hash.substring(1) || "Overview");
  document
    .querySelector(`.tablinks[data-tab="Overview"]`)
    ?.classList.add("active");
};

window.onpopstate = function () {
  if (currentTabIndex > 0) openTab(null, tabHistory[--currentTabIndex]);
  else window.history.back();
};

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

    // Sanitize: Remove symbols and non-alphanumeric characters, keep spaces
    segment = segment.replace(/[^a-zA-Z0-9\s]/g, "").trim();

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
