// Add smooth hover effects
document.querySelectorAll(".contact-button").forEach((button) => {
  button.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)";
  });

  button.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });
});
