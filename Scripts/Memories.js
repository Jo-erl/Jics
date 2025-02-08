const MAX_COUNT = 550;

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

// Update the stored data
function updateStoredData(count) {
  localStorage.setItem(
    "counterData",
    JSON.stringify({
      lastUpdate: new Date().toDateString(),
      count: count,
    })
  );
}

function animateCount(target) {
  let counterData = getStoredData();
  let current = counterData.count;
  const counterElement = document.getElementById("counter");

  // Check if it's a new day
  const today = new Date().toDateString();
  if (today !== counterData.lastUpdate && current < MAX_COUNT) {
    current++; // Increment count for the new day
    updateStoredData(current);
  }

  function update() {
    counterElement.textContent = current;
    if (current < target) {
      current++;
      requestAnimationFrame(update);
    }
  }
  update();
}

function handleScroll() {
  const section = document.getElementById("counter-section");
  const rect = section.getBoundingClientRect();
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    animateCount(MAX_COUNT);
  }
}

// Initialize counter on page load
document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("counter");
  const counterData = getStoredData();
  counterElement.textContent = counterData.count;
});

document.addEventListener("scroll", handleScroll);
