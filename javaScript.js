"use strict";

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
