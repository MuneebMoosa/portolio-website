// loader start
let loader = document.getElementById('preloader');
if (!sessionStorage.getItem('pageLoaded')){
  document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.display='none';
      document.body.style.overflow = '';
      sessionStorage.setItem('pageLoaded', 'true');
    }, 7000);
  });
}else {
  loader.style.display='none';
}
// loader ends
// dark mode start
let darkmode = localStorage.getItem('darkmode');
const themeSwitches = document.querySelectorAll('.theme-switch'); // Use querySelectorAll for multiple elements

function enableDarkmode() {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
}

function disableDarkmode() {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', 'inactive');
}

// Apply dark mode if it's active on page load
if (darkmode === 'active') {
  enableDarkmode();
}

// Add event listeners to all theme switches
themeSwitches.forEach((themeSwitch) => {
  themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'active') {
      enableDarkmode();
    } else {
      disableDarkmode();
    }
  });
});
// dark mode ends

// sidebar start
function showSlidebar(event) {
  event.preventDefault();
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';

  // Add event listener to close sidebar when clicking outside
  document.addEventListener('click', closeOnClickOutside);
}

function closeSlidebar(event) {
  event.preventDefault();
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';

  // Remove the event listener when the sidebar is closed
  document.removeEventListener('click', closeOnClickOutside);
}

function closeOnClickOutside(event) {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.menu-btn'); // Reference the toggle button

  // Check if the click is outside the sidebar and not on the toggle button
  if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
    closeSlidebar(event);
  }
}

// sidebar ends
// animation start
// Function to animate elements when they come into view
function animateOnScroll() {
  const mainContainers = document.querySelectorAll("#sec2 .main-con");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate"); // Add animation class
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  // Observe each main container
  mainContainers.forEach((container) => {
    observer.observe(container);
  });
}

// Call the function to start observing
animateOnScroll();

// Re-check on scroll to handle dynamic positioning
window.addEventListener("scroll", animateOnScroll);

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".main-section");

  function handleScroll() {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      section.classList.add("show");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); 
});

// progress bar
// Function to check if an element is near the center of the viewport
function isElementCentered(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Check if the element is vertically and horizontally centered
  const isVerticalCenter = rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2;
  const isHorizontalCenter = rect.left <= viewportWidth / 2 && rect.right >= viewportWidth / 2;

  return isVerticalCenter && isHorizontalCenter;
}

function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar-circle");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = parseInt(entry.target.getAttribute("data-progress"), 10);
          let counter = 0;
          const percentElement = entry.target.querySelector(".progress-percent");

          const interval = setInterval(() => {
            counter++;
            entry.target.style.setProperty("--progress", `${counter}%`);
            percentElement.innerText = `${counter}%`;

            if (counter >= progress) {
              clearInterval(interval);
            }
          }, 20); // Adjust speed for smooth animation

          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

// Run animation when elements enter the viewport
document.addEventListener("DOMContentLoaded", animateProgressBars);
// forms
document.querySelector(".contacts").onsubmit = function() {
  setTimeout(() => this.reset(), 100);
};
// animation ends

// footer
document.getElementById("year").textContent = new Date().getFullYear();

