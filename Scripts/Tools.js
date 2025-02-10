let animationTriggered = false;

function resetProgress(progressBar) {
  progressBar.style.width = "0%";
  const percentageEl = progressBar
    .closest(".progress-wrapper")
    .querySelector(".percentage");
  percentageEl.textContent = "0%";
}

function animateProgress(progressBar) {
  // Prevent re-triggering animation if already done
  if (progressBar.classList.contains("animated")) return;

  const target = progressBar.getAttribute("data-target");
  progressBar.style.width = target + "%";
  progressBar.classList.add("animated");

  const percentageEl = progressBar
    .closest(".progress-wrapper")
    .querySelector(".percentage");

  const duration = 10000; // 10 seconds
  const startTime = performance.now();
  const startValue = 0;
  const endValue = parseInt(target);

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Smoother easing function
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

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
    sectionRect.top < window.innerHeight * 0.75 && sectionRect.bottom >= 0;

  if (isVisible && !animationTriggered) {
    progressBars.forEach(animateProgress);
    animationTriggered = true;
  } else if (!isVisible) {
    progressBars.forEach(resetProgress);
    progressBars.forEach((bar) => bar.classList.remove("animated"));
    animationTriggered = false;
  }
}

// Initial check
handleScroll();

// Add scroll event listener
window.addEventListener("scroll", handleScroll);
