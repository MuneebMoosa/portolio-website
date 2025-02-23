// dark mode start
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

function enableDarkmode(){
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode' , 'active')
}
function disableDarkmode(){
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode' , 'null')
}
if(darkmode === 'active'){
  enableDarkmode();
}
themeSwitch.addEventListener("click" , () => {
  darkmode = localStorage.getItem('darkmode');
  if(darkmode !== "active"){
    enableDarkmode();
  }else{
    disableDarkmode();
  }
});
// dark mode ends

// animation start
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

// footer
document.getElementById("year").textContent = new Date().getFullYear();

