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
