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

//
document.addEventListener("DOMContentLoaded", function () {
  var toggleDemoBtn = document.getElementById("toggle-demo-btn");
  var demoOverlay = document.getElementById("demo-overlay");
  var closeDemoBtn = document.getElementById("close-demo-btn");

  // Toggle the demo visibility
  toggleDemoBtn.addEventListener("click", function () {
    demoOverlay.style.display =
      demoOverlay.style.display === "none" || demoOverlay.style.display === ""
        ? "flex"
        : "none";
    toggleDemoBtn.textContent =
      demoOverlay.style.display === "flex" ? "Close Demo" : "Play Demo";
  });

  // Close demo on clicking the close button
  closeDemoBtn.addEventListener("click", function () {
    demoOverlay.style.display = "none";
    toggleDemoBtn.textContent = "Play Demo";
  });

  // Close demo when clicking outside the demo container
  demoOverlay.addEventListener("click", function (e) {
    if (e.target === demoOverlay) {
      demoOverlay.style.display = "none";
      toggleDemoBtn.textContent = "Play Demo";
    }
  });
});

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
document.addEventListener("click", function () {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
});
