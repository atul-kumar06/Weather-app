// Ensure code runs after HTML is fully loaded
// window.addEventListener("DOMContentLoaded", () => {
//   const customSelect = document.getElementById("daySelect");

//   if (!customSelect) return;

//   const trigger = customSelect.querySelector(".select-trigger");
//   const options = customSelect.querySelectorAll(".option");
//   const selectedValue = customSelect.querySelector(".selected-value");

//   // Toggle dropdown open/close state
//   trigger.addEventListener("click", (e) => {
//     e.stopPropagation();
//     const isOpen = customSelect.classList.contains("open");
//     customSelect.classList.toggle("open");
//     trigger.setAttribute("aria-expanded", !isOpen);
//   });

//   // Handle selecting an option
//   options.forEach((option) => {
//     option.addEventListener("click", (e) => {
//       e.stopPropagation();

//       options.forEach((opt) => {
//         opt.classList.remove("selected");
//         opt.setAttribute("aria-selected", "false");
//       });

//       option.classList.add("selected");
//       option.setAttribute("aria-selected", "true");
//       selectedValue.textContent = option.textContent;

//       customSelect.classList.remove("open");
//       trigger.setAttribute("aria-expanded", "false");
//     });
//   });

//   // Close dropdown when clicking anywhere outside
//   document.addEventListener("click", () => {
//     customSelect.classList.remove("open");
//     trigger.setAttribute("aria-expanded", "false");
//   });
// });

const unitMenu = document.querySelector(".unit-menu");
const triggerbtn = document.querySelector(".unit-menu__trigger");
const dropdown = document.querySelector(".unit-dropdown");
const systemToggleBtn = document.querySelector(".unit-dropdown__system-btn");
const unitgroups = document.querySelectorAll(".unit-group");

const currentUnits = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};

// dropdown toggle functionality
function openDropDown() {
  unitMenu.classList.add("is-open");
  dropdown.classList.add("is-open");
  triggerbtn.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  dropdown.classList.remove("is-open");
  unitMenu.classList.remove("is-open");
  triggerbtn.setAttribute("aria-expanded", "false");
}

triggerbtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = dropdown.classList.contains("is-open");
  isOpen ? closeDropdown() : openDropDown();
});
// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!unitMenu.contains(e.target)) {
    closeDropdown();
  }
});
// Close on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && dropdown.classList.contains("is-open")) {
    closeDropdown();
    triggerbtn.focus();
  }
});

// // 2. Individual Unit Option Selection
// unitgroups.forEach((group) => {
//   const category = group.dataset.unitCategory;
//   const options = group.querySelectorAll(".unit-option");
//   console.log(options);

//   options.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       // Clear active state in group and set on clicked button
//       options.forEach((opt) => {
//         opt.classList.remove("unit-option--selected");
//         btn.classList.add("unit-option--selected");

//         currentUnits[category] = btn.dataset.unitValue;
//         checkSystemPresetMatch();
//       });
//     });
//   });
// });

// function checkSystemPresetMatch() {
//   const isAllImperial =
//     currentUnits.temperature === "fahrenheit" &&
//     currentUnits.windSpeed === "mph" &&
//     currentUnits.precipitation === "in";
//   systemToggleBtn.textContent = isAllImperial
//     ? "Switch to Metric"
//     : "Switch to Imperial";
// }

systemToggleBtn.addEventListener("click", () => {
  const isImperialTarget =
    systemToggleBtn.textContent.trim() === "Switch to Imperial";
  const targetSystem = isImperialTarget ? "imperial" : "metric";

  unitgroups.forEach((group) => {
    const category = group.dataset.unitCategory;
    const options = group.querySelectorAll(".unit-option");

    options.forEach((btn) => {
      const isMatch = btn.dataset.unit === targetSystem;
      btn.classList.toggle("unit-option--selected", isMatch);

      if (isMatch) {
        currentUnits[category] = btn.dataset.unitValue;
      }
    });
  });

  systemToggleBtn.textContent = isImperialTarget
    ? "Switch to Metric"
    : "Switch to Imperial";
});
