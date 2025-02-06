function resetProgress(progressBar) {
  progressBar.style.width = "0%";
  const percentageEl = progressBar
    .closest(".progress-wrapper")
    .querySelector(".percentage");
  percentageEl.textContent = "0%";
}

function animateProgress(progressBar) {
  const target = progressBar.getAttribute("data-target");
  progressBar.style.width = target + "%";

  // Animate percentage number
  const percentageEl = progressBar
    .closest(".progress-wrapper")
    .querySelector(".percentage");
  const duration = 1500; // 1.5 seconds to match CSS transition
  const startTime = performance.now();
  const startValue = 0;
  const endValue = parseInt(target);

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (endValue - startValue) * eased);

    percentageEl.textContent = `${current}%`;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

function handleScroll() {
  const section = document.querySelector(".tools-section");
  const progressBars = document.querySelectorAll(".progress-bar");

  const sectionRect = section.getBoundingClientRect();
  const isVisible =
    sectionRect.top < window.innerHeight && sectionRect.bottom >= 0;

  if (isVisible) {
    progressBars.forEach(animateProgress);
  } else {
    progressBars.forEach(resetProgress);
  }
}

// Initial check
handleScroll();

// Add scroll event listener
window.addEventListener("scroll", handleScroll);
