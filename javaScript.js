"use strict";

// More info pop-up
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

// News slider
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
  isTransitioning = true;
  currentSlide++;
  updateSlidePosition();
  newsWrapper.addEventListener("transitionend", handleTransitionEnd);
}

function moveToPreviousSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide--;
  updateSlidePosition();
  newsWrapper.addEventListener("transitionend", handleTransitionEnd);
}

function handleTransitionEnd() {
  const sliderWidth = document.querySelector(".news-slider").offsetWidth;
  isTransitioning = false;
  newsWrapper.style.transition = "none";
  if (currentSlide === totalSlides - 2) currentSlide = 0;
  else if (currentSlide === -1) currentSlide = totalSlides - 3;
  newsWrapper.style.transform = `translateX(-${
    (currentSlide + 1) * sliderWidth
  }px)`;
  newsWrapper.removeEventListener("transitionend", handleTransitionEnd);
}

function startAutoSlide() {
  stopAutoSlide();
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
  setTimeout(startAutoSlide, autoSlideDelay);
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
  stopAutoSlide();
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
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

// Smartphone menu
const toggleButton = document.querySelector(".toggle-button");
const sideNavigation = document.querySelector(".side-navigation");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");

let isSideMenuOpen = false;

let touchStartX = 0;
let touchEndX = 0;

function openSideNavigation() {
  sideNavigation.classList.add("open");
  overlay.classList.add("show");
  toggleButton.style.display = "none";
  isSideMenuOpen = true;
}

function closeSideNavigation() {
  sideNavigation.classList.remove("open");
  overlay.classList.remove("show");
  toggleButton.style.display = "block";
  isSideMenuOpen = false;
}

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

toggleButton.addEventListener("click", openSideNavigation);
overlay.addEventListener("click", closeSideNavigation);
closeButton.addEventListener("click", closeSideNavigation);

toggleButton.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

toggleButton.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

sideNavigation.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

sideNavigation.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

overlay.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

overlay.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold && !isSideMenuOpen) {
    openSideNavigation();
  } else if (swipeDistance < -swipeThreshold && isSideMenuOpen) {
    closeSideNavigation();
  }
}

window.addEventListener("popstate", function () {
  history.pushState(null, null, location.href);
});

// Fix to prevent unwanted swipe blocking (back and forward gestures)
document.body.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
  }
});

// Prevent swipe only inside specific areas (modal, side-navigation)
document.body.addEventListener(
  "touchmove",
  function (e) {
    const swipeDistance = e.touches[0].clientX - touchStartX;
    const swipeThreshold = 30;

    // Prevent swipe gestures inside modal or side navigation, not at the edges
    if (swipeDistance > swipeThreshold) {
      if (e.target.closest(".modal, .side-navigation")) {
        e.preventDefault();
      }
    }
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  function (e) {
    if (e.touches.length === 1) {
      const touchMoveX = e.touches[0].pageX;
      const touchMoveY = e.touches[0].pageY;
      const deltaX = touchMoveX - this.touchStartX;
      const deltaY = touchMoveY - this.touchStartY;

      // Prevent swipe behavior only in designated areas (modal, side navigation)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (e.target.closest(".modal, .side-navigation")) {
          e.preventDefault();
        }
      }
    }
  },
  { passive: false }
);

// Back to the top arrow
window.addEventListener(
  "scroll",
  function () {
    const scrollButton = document.querySelector(".scroll-to-top");
    if (window.scrollY > 500) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  },
  false
);

document.querySelector(".scroll-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
