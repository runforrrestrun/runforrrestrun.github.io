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
// news slidebar

let currentSlide = 0;
const slides = document.querySelectorAll(".news-item");
const totalSlides = slides.length;
let startX = 0;
let isDragging = false;

document.querySelector(".forth-btn").addEventListener("click", () => {
  moveToNextSlide();
});

document.querySelector(".back-btn").addEventListener("click", () => {
  moveToPreviousSlide();
});

document
  .querySelector(".news-wrapper")
  .addEventListener("touchstart", handleTouchStart);
document
  .querySelector(".news-wrapper")
  .addEventListener("touchmove", handleTouchMove);
document
  .querySelector(".news-wrapper")
  .addEventListener("touchend", handleTouchEnd);

function moveToNextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0; // Loop back to the first slide
  }
  updateSlidePosition();
}

function moveToPreviousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1; // Loop back to the last slide
  }
  updateSlidePosition();
}

function updateSlidePosition() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  document.querySelector(".news-wrapper").style.transform = `translateX(-${
    currentSlide * sliderWidth
  }px)`;
}

// Touch event handlers
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const touchX = e.touches[0].clientX;
  const deltaX = touchX - startX;

  // Optional: add some feedback for drag movement (e.g., move the slide slightly)
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  document.querySelector(".news-wrapper").style.transform = `translateX(-${
    currentSlide * sliderWidth - deltaX
  }px)`;
}

function handleTouchEnd(e) {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      moveToNextSlide();
    } else {
      moveToPreviousSlide();
    }
  } else {
    updateSlidePosition();
  }
}

// odds
document.addEventListener("DOMContentLoaded", () => {
  const API_URL =
    "https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=ced8da8a3162c029c0a6c5a2e2216192&regions=eu&markets=h2h,spreads&oddsFormat=decimal";

  fetchScoresData();

  async function fetchScoresData() {
    showLoadingIndicator(); // Show loading indicator
    try {
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const scoresData = await response.json();
      displayScores(scoresData);
    } catch (error) {
      console.error("Error fetching data:", error);
      displayError("Scores data is unavailable. Please try again later.");
    }
  }

  function showLoadingIndicator() {
    const tableBody = document
      .getElementById("oddsTable")
      .querySelector("tbody");
    tableBody.innerHTML = `<tr><td colspan="5">Loading...</td></tr>`;
  }

  function displayScores(data) {
    const tableBody = document
      .getElementById("oddsTable")
      .querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing content

    data.forEach((event) => {
      const row = document.createElement("tr");
      const formattedEventName = formatEventName(event.sport_key || "N/A");
      const formattedCommenceTime = formatCommenceTime(
        event.commence_time || "N/A"
      );
      const homeTeam = event.home_team || "N/A";
      const awayTeam = event.away_team || "N/A";
      const status = event.completed ? "Completed" : "Pending";

      let odds = "Pending"; // Default value
      if (event.bookmakers && event.bookmakers.length > 0) {
        const bookmaker = event.bookmakers[0];
        const market = bookmaker.markets.find((m) => m.key === "h2h");
        if (market && market.outcomes) {
          const homeOdds = market.outcomes.find(
            (outcome) => outcome.name === homeTeam
          )?.price;
          const awayOdds = market.outcomes.find(
            (outcome) => outcome.name === awayTeam
          )?.price;
          odds = homeOdds && awayOdds ? `${homeOdds} / ${awayOdds}` : "Pending";
        }
      }

      row.innerHTML = `
              <td>${formattedEventName}</td>
              <td>${formattedCommenceTime}</td>
              <td>${homeTeam}</td>
              <td>${awayTeam}</td>
              <td>${odds}</td>
          `;

      tableBody.appendChild(row);
    });
  }

  function formatEventName(eventName) {
    return eventName
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatCommenceTime(time) {
    const date = new Date(time);
    return (
      date.toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      }) + " UTC"
    );
  }

  function displayError(message) {
    const tableBody = document
      .getElementById("oddsTable")
      .querySelector("tbody");
    tableBody.innerHTML = `<tr><td colspan="5">${message}</td></tr>`;
  }
});
// esports odds
