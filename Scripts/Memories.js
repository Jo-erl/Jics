const MAX_COUNT = 550;
const ANIMATION_DURATION = 2500; 
const FRAME_INTERVAL = 16; 

function getStoredData() {
  const stored = localStorage.getItem("counterData");
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    lastUpdate: new Date().toDateString(),
    count: 0,
  };
}

function updateStoredData(count) {
  localStorage.setItem(
    "counterData",
    JSON.stringify({
      lastUpdate: new Date().toDateString(),
      count: count,
    })
  );
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function animateCount(target) {
  let counterData = getStoredData();
  let current = counterData.count;
  const counterElement = document.getElementById("counter");

  // Check if it's a new day
  const today = new Date().toDateString();
  if (today !== counterData.lastUpdate && current < MAX_COUNT) {
    current++;
    updateStoredData(current);
  }

  // Animation variables
  const startValue = current;
  const changeInValue = target - startValue;
  const startTime = performance.now();
  let previousTimestamp = startTime;

  function update(currentTime) {
    // Skip frame if too soon
    if (currentTime - previousTimestamp < FRAME_INTERVAL) {
      requestAnimationFrame(update);
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    const easedProgress = easeOutQuad(progress);

    current = Math.round(startValue + changeInValue * easedProgress);
    counterElement.textContent = current;

    previousTimestamp = currentTime;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function handleScroll() {
  const section = document.getElementById("counter-section");
  const rect = section.getBoundingClientRect();
  const buffer = window.innerHeight * 0.2; 

  if (rect.top <= window.innerHeight - buffer && rect.bottom >= buffer) {
    animateCount(MAX_COUNT);

    document.removeEventListener("scroll", throttledHandleScroll);
  }
}

const throttledHandleScroll = throttle(handleScroll, 100);

document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("counter");
  const counterData = getStoredData();
  counterElement.textContent = counterData.count;
  document.addEventListener("scroll", throttledHandleScroll);
});
