const unitMenu = document.querySelector(".unit-menu");
const triggerbtn = document.querySelector(".unit-menu__trigger");
const dropdown = document.querySelector(".unit-dropdown");
const systemToggleBtn = document.querySelector(".unit-dropdown__system-btn");
const unitgroups = document.querySelectorAll(".unit-group");
const cityInput = document.getElementById("search-bar");
const searchBtn = document.querySelector(".search-btn");
const countryName = document.querySelector(".country_name");
const countryState = document.querySelector(".country_state");

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

// Convert search text to geo location

async function geoEncoding(cityname) {
  const GeoAPI = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityname)}&count=1&language=en&format=json`;
  try {
    const response = await fetch(GeoAPI);

    if (!response.ok) {
      throw new Error("Server not resonding");
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      console.log("Location not found");
    }
    countryName.textContent = data.results[0].country;
    countryState.textContent = data.results[0].name;
    return {
      countryName: data.results[0].country,
      cityName: data.results[0].name,
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  } catch (error) {
    71.92421;
    console.log(error, "Error");
  }
}

// Handel Search
async function handleSearch() {
  const cityName = cityInput.value.trim();

  try {
    const { latitude, longitude } = await geoEncoding(cityName);
    geoweatherdata(latitude, longitude);
  } catch (error) {
    console.log(error, "Error while fething geoencoding");
  }
}

searchBtn.addEventListener("click", handleSearch);

// Fetch geoweatherdata
async function geoweatherdata(latitude, longitude) {
  const weatherdata = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code`,
  );
  const data = weatherdata.json();
  data.then((res) => {
    console.log(res);
  });
}

let obj1 = {
  name: "Atul",
  last: "Kumar",
};

let ob2 = {
  job: "Software enginner",
  experience: "1 year",
};

console.log(obj1);
