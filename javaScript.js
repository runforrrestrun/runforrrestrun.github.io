"use strict";

// more info popUp
const elsModals = document.querySelectorAll(".modal");

const toggleModal = (ev) => {
  const elBtn = ev.currentTarget;
  const elModal = document.querySelector(elBtn.dataset.modal);
  // Close all currently open modals:
  elsModals.forEach((el) => {
    if (el !== elModal) el.classList.remove("is-active");
  });
  // Toggle open/close targeted one:
  elModal.classList.toggle("is-active");
};

const elsBtns = document.querySelectorAll("[data-modal]");
elsBtns.forEach((el) => el.addEventListener("click", toggleModal));

// hamburger menu x animation
let navToggle = document.querySelector(".nav-toggle");
let bars = document.querySelectorAll(".bar");

function toggleHamburger(e) {
  bars.forEach((bar) => bar.classList.toggle("x"));
}

navToggle.addEventListener("click", toggleHamburger);

// Hamburger menu

function myFunction() {
  const x = document.getElementById("myLinks");
  if (x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "";
  }
}
//close menu click
const y = document.getElementById("myLinks");
function myFunction2() {
  if (y.style.display === "block") {
    y.style.display = "";
  }
}

// CASIOS INFO TAB
function Buttons(evt, tabId) {
  // Hide all tab content
  var tabcontent = document.getElementsByClassName("tabcontent-info");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  var tablinks = document.getElementsByClassName("tablinks-info");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab and add an "active" class to the clicked button
  document.getElementById(tabId).style.display = "block";
  evt.currentTarget.className += " active";

  // Update the URL hash and add a new history entry
  history.pushState({ tab: tabId }, null, "#" + tabId);
}

function loadTabFromHash() {
  var hash = window.location.hash.substring(1); // Remove the #
  var tabIds = ["Overview", "Bonuses", "Games", "Payments"];

  if (hash && tabIds.includes(hash)) {
    // If the hash is valid, display the corresponding tab
    Buttons(
      {
        currentTarget: document.querySelector(
          '.tablinks-info[onclick*="' + hash + '"]'
        ),
      },
      hash
    );
  } else {
    // Default to "Overview" if no hash or invalid hash
    Buttons(
      {
        currentTarget: document.querySelector(
          '.tablinks-info[onclick*="Overview"]'
        ),
      },
      "Overview"
    );
  }
}

function getCircularTabId(currentTabId, direction) {
  var tabIds = ["Overview", "Bonuses", "Games", "Payments"];
  var currentIndex = tabIds.indexOf(currentTabId);

  if (direction === "backward") {
    currentIndex = currentIndex === 0 ? tabIds.length - 1 : currentIndex - 1;
  } else if (direction === "forward") {
    currentIndex = currentIndex === tabIds.length - 1 ? 0 : currentIndex + 1;
  }

  return tabIds[currentIndex];
}

// Handle the popstate event to go back to the previous tab
window.addEventListener("popstate", function (event) {
  var tabId = event.state ? event.state.tab : "Overview";
  var tabButton = document.querySelector(
    '.tablinks-info[onclick*="' + tabId + '"]'
  );
  if (tabButton) {
    Buttons({ currentTarget: tabButton }, tabId); // Display the tab based on state
  }
});

// Handle circular navigation with the keyboard's back/forward buttons
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    var currentHash = window.location.hash.substring(1) || "Overview";
    var newTabId = getCircularTabId(
      currentHash,
      event.key === "ArrowLeft" ? "backward" : "forward"
    );
    var tabButton = document.querySelector(
      '.tablinks-info[onclick*="' + newTabId + '"]'
    );
    if (tabButton) {
      // Use history.replaceState to manage internal navigation
      history.replaceState({ tab: newTabId }, null, "#" + newTabId);
      Buttons({ currentTarget: tabButton }, newTabId); // Display the new tab
    }
  }
});

// Load the correct tab on page load based on the URL hash or default to "Overview"
document.addEventListener("DOMContentLoaded", loadTabFromHash);
