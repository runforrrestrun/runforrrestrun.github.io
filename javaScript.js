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

// Hamburger menu

function myFunction() {
  const x = document.getElementById("myLinks");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//close menu click
const y = document.getElementById("myLinks");
function myFunction2() {
  if (y.style.display === "block") {
    y.style.display = "none";
  }
}
