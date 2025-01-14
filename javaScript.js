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

// news slider
let currentSlide = 0,
  isDragging = false,
  isTransitioning = false,
  startX = 0,
  currentTranslate = 0,
  previousTranslate = 0,
  autoSlideTimer = null,
  autoSlideDelay = 7000;
const slides = document.querySelectorAll(".news-item"),
  newsWrapper = document.querySelector(".news-wrapper"),
  firstClone = slides[0].cloneNode(true),
  lastClone = slides[slides.length - 1].cloneNode(true);

newsWrapper.append(firstClone);
newsWrapper.prepend(lastClone);
const allSlides = document.querySelectorAll(".news-item"),
  totalSlides = allSlides.length;

function setSlideWidth() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  allSlides.forEach((slide) => (slide.style.width = `${sliderWidth}px`));
  newsWrapper.style.width = `${totalSlides * sliderWidth}px`;
  newsWrapper.style.transform = `translateX(-${
    (currentSlide + 1) * document.querySelector(".news-slider").offsetWidth
  }px)`;
}

setSlideWidth();
window.addEventListener("resize", setSlideWidth);

function updateSlidePosition() {
  newsWrapper.style.transition = "transform 0.5s ease";
  newsWrapper.style.transform = `translateX(-${
    (currentSlide + 1) * document.querySelector(".news-slider").offsetWidth
  }px)`;
}

function moveToNextSlide() {
  if (isTransitioning) return;
  (isTransitioning = true),
    currentSlide++,
    updateSlidePosition(),
    newsWrapper.addEventListener("transitionend", handleTransitionEnd);
}

function moveToPreviousSlide() {
  if (isTransitioning) return;
  (isTransitioning = true),
    currentSlide--,
    updateSlidePosition(),
    newsWrapper.addEventListener("transitionend", handleTransitionEnd);
}

function handleTransitionEnd() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  (isTransitioning = false), (newsWrapper.style.transition = "none");
  if (currentSlide === totalSlides - 2) currentSlide = 0;
  else if (currentSlide === -1) currentSlide = totalSlides - 3;
  newsWrapper.style.transform = `translateX(-${
    (currentSlide + 1) * sliderWidth
  }px)`;
  newsWrapper.removeEventListener("transitionend", handleTransitionEnd);
}

function startAutoSlide() {
  stopAutoSlide(); // Clear any previous timers to avoid multiple intervals
  autoSlideTimer = setInterval(() => {
    if (!isDragging && !isTransitioning) moveToNextSlide();
  }, autoSlideDelay);
}

function stopAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = null;
}

function pauseAutoSlideDuringInteraction() {
  stopAutoSlide();
  setTimeout(startAutoSlide, autoSlideDelay); // Restart auto-slide after interaction
}

document.querySelector(".forth-btn").addEventListener("click", () => {
  pauseAutoSlideDuringInteraction();
  moveToNextSlide();
});

document.querySelector(".back-btn").addEventListener("click", () => {
  pauseAutoSlideDuringInteraction();
  moveToPreviousSlide();
});

function handleTouchStart(e) {
  if (isTransitioning) return;
  stopAutoSlide(),
    (isDragging = true),
    (startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX);
  previousTranslate =
    -(currentSlide + 1) * document.querySelector(".news-slider").offsetWidth;
  newsWrapper.style.transition = "none";
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  currentTranslate = previousTranslate + (currentX - startX);
  newsWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function handleTouchEnd() {
  if (!isDragging) return;
  isDragging = false;
  const sliderWidth = document.querySelector(".news-slider").offsetWidth,
    movedBy = currentTranslate - previousTranslate;
  if (movedBy < -sliderWidth / 4) moveToNextSlide();
  else if (movedBy > sliderWidth / 4) moveToPreviousSlide();
  else updateSlidePosition();
  pauseAutoSlideDuringInteraction();
}

["touchstart", "mousedown"].forEach((evt) =>
  newsWrapper.addEventListener(evt, handleTouchStart)
);
["touchmove", "mousemove"].forEach((evt) =>
  newsWrapper.addEventListener(evt, handleTouchMove)
);
["touchend", "mouseup", "mouseleave"].forEach((evt) =>
  newsWrapper.addEventListener(evt, handleTouchEnd)
);

startAutoSlide();

// smartphone menu
// Select necessary elements
const toggleButton = document.querySelector(".toggle-button");
const sideNavigation = document.querySelector(".side-navigation");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");

// Track if the side menu is open
let isSideMenuOpen = false;

// Variables to track swipe gestures
let touchStartX = 0;
let touchEndX = 0;

// Function to open the side navigation
function openSideNavigation() {
  sideNavigation.classList.add("open"); // Open the side navigation
  overlay.classList.add("show"); // Show the overlay
  toggleButton.style.display = "none"; // Hide the toggle button
  isSideMenuOpen = true; // Set the flag to true when side menu is open
}

// Function to close the side navigation
function closeSideNavigation() {
  sideNavigation.classList.remove("open"); // Close the side navigation
  overlay.classList.remove("show"); // Hide the overlay
  toggleButton.style.display = "block"; // Show the toggle button
  isSideMenuOpen = false; // Set the flag to false when side menu is closed
}

// Function to toggle dropdown menus (Review and Bonus)
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  // Toggle the display of the dropdown
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

// Event listener for the toggle button to open the side navigation
toggleButton.addEventListener("click", openSideNavigation);

// Event listener for the overlay to close the side navigation
overlay.addEventListener("click", closeSideNavigation);

// Event listener for the close button to close the side navigation
closeButton.addEventListener("click", closeSideNavigation);

// Handle swipe gestures for opening
toggleButton.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

toggleButton.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

// Handle swipe gestures for closing
sideNavigation.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

sideNavigation.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

overlay.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX; // Record the starting point of the swipe
});

overlay.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX; // Record the ending point of the swipe
  handleSwipeGesture(); // Handle the swipe gesture
});

// Function to detect swipe gestures
function handleSwipeGesture() {
  const swipeThreshold = 50; // Minimum distance to recognize as a swipe
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold && !isSideMenuOpen) {
    openSideNavigation(); // Open side menu on swipe right
  } else if (swipeDistance < -swipeThreshold && isSideMenuOpen) {
    closeSideNavigation(); // Close side menu on swipe left
  }
}

// Prevent back and forward navigation from the browser
window.addEventListener("popstate", function (e) {
  // Prevent the browser from navigating back or forward
  history.pushState(null, null, location.href);
});

// Disable browser swipe back navigation (specifically for iOS)
document.body.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
  }
});

document.body.addEventListener("touchmove", function (e) {
  const swipeDistance = e.touches[0].clientX - touchStartX;
  // If swiping right, prevent default browser navigation
  if (swipeDistance > 0) {
    e.preventDefault(); // Prevent the browser's back action if swiping right
  }
});

// prevent back forward in browser

// Disable browser back and forward actions by preventing default on touchmove
window.addEventListener(
  "touchmove",
  function (e) {
    // Only prevent horizontal swipe if the movement is primarily horizontal
    if (e.touches.length === 1) {
      const touchMoveX = e.touches[0].pageX;
      const touchMoveY = e.touches[0].pageY;
      const deltaX = touchMoveX - this.touchStartX;
      const deltaY = touchMoveY - this.touchStartY;

      // Allow vertical scrolling (deltaY) but prevent horizontal swipe (deltaX)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault(); // Prevent horizontal swipe navigation
      }
    }
  },
  { passive: false }
);

// Disable popstate event to prevent browser's back navigation
window.addEventListener("popstate", function (e) {
  history.pushState(null, null, location.href); // Keep the current state, prevent back navigation
});

// Track touch start position for swipe detection
window.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    this.touchStartX = e.touches[0].pageX;
    this.touchStartY = e.touches[0].pageY;
  }
});

// back to the top arrow
// Event listener to show the scroll-to-top button when scrolling
window.addEventListener("scroll", function () {
  const scrollButton = document.querySelector(".scroll-to-top");

  // Show the button when the page is scrolled down 100px or more
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
});
