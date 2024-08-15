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

// // Bonus Tabs
// function openCity(evt, cityName) {
//   // Declare all variables
//   var i, tabcontent, tablinks;

//   // Get all elements with class="tabcontent" and hide them
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }

//   // Get all elements with class="tablinks" and remove the class "active"
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }

//   // Show the current tab, and add an "active" class to the button that opened the tab
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " active";
// }
// document.getElementById("defaultOpen").click();
//
//
//
// CASIOS INFO TAB
function Buttons(evt, button) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent-info");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks-info");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(button).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();
