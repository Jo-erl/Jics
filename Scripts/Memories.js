const MAX_COUNT = 550;

function animateCount(target) {
  let current = 0;
  const counterElement = document.getElementById("counter");

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

document.addEventListener("scroll", handleScroll);
