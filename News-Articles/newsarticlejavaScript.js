"use strict";

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

console.log("JavaScript is loaded!");

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

// sliders apear dinamicaly

// Slider functionality (works for static or dynamically added sliders)
function initSliders(root = document) {
  // Wrap root if it's a single slider
  const sliders =
    root.classList && root.classList.contains("slider")
      ? [root]
      : root.querySelectorAll(".slider");

  sliders.forEach((sliderContainer) => {
    const slider = sliderContainer.querySelector(".slider-wrapper");
    const backBtn = sliderContainer.querySelector(".back-btn");
    const forthBtn = sliderContainer.querySelector(".forth-btn");
    const rangeInput = sliderContainer.querySelector(".slider-range");

    if (!slider || !backBtn || !forthBtn) return;

    const updateBoxWidth = () => {
      const newsBox = slider.querySelector(".news-box");
      return newsBox
        ? newsBox.offsetWidth + parseInt(getComputedStyle(newsBox).marginRight)
        : 515; // default width + margin
    };

    let boxWidth = updateBoxWidth();
    let totalWidth = slider.scrollWidth;

    // Recalculate on resize
    const resizeHandler = () => {
      boxWidth = updateBoxWidth();
      totalWidth = slider.scrollWidth;
    };
    window.addEventListener("resize", resizeHandler);

    // Back button
    backBtn.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        slider.scrollLeft <= 0
          ? slider.scrollTo({
              left: totalWidth - slider.offsetWidth,
              behavior: "smooth",
            })
          : slider.scrollBy({ left: -boxWidth, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -boxWidth, behavior: "smooth" });
      }
    });

    // Forth button
    forthBtn.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        slider.scrollLeft + slider.offsetWidth >= totalWidth
          ? slider.scrollTo({ left: 0, behavior: "smooth" })
          : slider.scrollBy({ left: boxWidth, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: boxWidth, behavior: "smooth" });
      }
    });

    // Swipe support
    let startX;
    slider.addEventListener(
      "touchstart",
      (e) => (startX = e.touches[0].clientX)
    );
    slider.addEventListener("touchmove", (e) => {
      const diff = startX - e.touches[0].clientX;
      if (Math.abs(diff) > 30) {
        e.preventDefault();
        if (window.innerWidth < 768) {
          if (diff > 50) {
            slider.scrollLeft + slider.offsetWidth >= totalWidth
              ? slider.scrollTo({ left: 0, behavior: "smooth" })
              : slider.scrollBy({ left: boxWidth, behavior: "smooth" });
          } else if (diff < -50) {
            slider.scrollLeft <= 0
              ? slider.scrollTo({
                  left: totalWidth - slider.offsetWidth,
                  behavior: "smooth",
                })
              : slider.scrollBy({ left: -boxWidth, behavior: "smooth" });
          }
        } else {
          if (diff > 50)
            slider.scrollBy({ left: boxWidth, behavior: "smooth" });
          if (diff < -50)
            slider.scrollBy({ left: -boxWidth, behavior: "smooth" });
        }
        startX = e.touches[0].clientX;
      }
    });
    slider.addEventListener("touchend", () => (startX = null));

    // Range input (desktop only)
    if (rangeInput && window.innerWidth >= 768) {
      let isDragging = false;
      const updateRange = () => {
        if (!isDragging)
          rangeInput.value =
            (slider.scrollLeft / (totalWidth - slider.offsetWidth)) * 100;
      };
      slider.addEventListener("scroll", updateRange);
      rangeInput.addEventListener("mousedown", () => (isDragging = true));
      rangeInput.addEventListener("touchstart", () => (isDragging = true));
      document.addEventListener("mouseup", () => (isDragging = false));
      document.addEventListener("touchend", () => (isDragging = false));
      rangeInput.addEventListener("input", () => {
        slider.scrollTo({
          left: (rangeInput.value / 100) * (totalWidth - slider.offsetWidth),
          behavior: "smooth",
        });
      });
    }
  });
}

// Normalize string helper (remove special characters and lowercase)
function normalize(str) {
  return str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
}

// Promo page logic
document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const promoMatch = path.match(/News-Articles\/([^/]+)/i);

  if (!promoMatch) {
    // Not a promo page, initialize all sliders normally
    initSliders();
    return;
  }

  const casinoRaw = promoMatch[1].split(/[-_]/)[0]; // first part of URL
  const normalizedCasinoUrl = normalize(casinoRaw);
  console.log(
    "Promo page detected. Casino name (normalized):",
    normalizedCasinoUrl
  );

  let targetContainer =
    document.querySelector("#promo-content") || document.querySelector("main");
  if (!targetContainer) return;

  try {
    const response = await fetch("/News/"); // all sliders page
    if (!response.ok) throw new Error("Failed to fetch news page");

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Find slider dynamically using normalized comparison
    const sliders = Array.from(doc.querySelectorAll(".slider"));
    const slider = sliders.find(
      (s) => normalize(s.dataset.casino) === normalizedCasinoUrl
    );

    if (!slider) {
      console.log(`No slider found for casino: ${normalizedCasinoUrl}`);
      return;
    }

    const clonedSlider = slider.cloneNode(true);
    targetContainer.appendChild(clonedSlider);

    // Initialize slider functionality for cloned slider
    initSliders(clonedSlider);
    console.log("Slider appended and initialized for", normalizedCasinoUrl);
  } catch (err) {
    console.error("Error loading casino slider:", err);
  }
});
