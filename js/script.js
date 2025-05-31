const menuToggle = document.getElementById("menuToggle");
const slideMenu = document.getElementById("slideMenu");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  slideMenu.classList.add("open");
});

closeMenu.addEventListener("click", () => {
  slideMenu.classList.remove("open");
});
