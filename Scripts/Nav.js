const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");

  // Animate hamburger to X
  const lines = document.querySelectorAll(".hamburger-line");
  hamburger.classList.toggle("active");

  if (hamburger.classList.contains("active")) {
    lines[0].style.transform = "rotate(45deg) translate(5px, 6px)";
    lines[1].style.opacity = "0";
    lines[2].style.transform = "rotate(-45deg) translate(7px, -8px)";
  } else {
    lines[0].style.transform = "none";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "none";
  }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove("active");
    hamburger.classList.remove("active");
    const lines = document.querySelectorAll(".hamburger-line");
    lines[0].style.transform = "none";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "none";
  }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    hamburger.classList.remove("active");
    const lines = document.querySelectorAll(".hamburger-line");
    lines[0].style.transform = "none";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "none";
  });
});
