const btn = document.querySelector(".unit-btn");
const dropdown = document.querySelector(".unit-dropdown");

btn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});
