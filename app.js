import { getWeatherDetails } from "./utils/weatherCode.js";

const unitMenu = document.querySelector(".unit-menu");
const triggerbtn = document.querySelector(".unit-menu__trigger");
const dropdown = document.querySelector(".unit-dropdown");
const systemToggleBtn = document.querySelector(".unit-dropdown__system-btn");
const unitgroups = document.querySelectorAll(".unit-group");
const cityInput = document.getElementById("search-bar");
const searchBtn = document.querySelector(".search-btn");
const countryName = document.querySelector(".country_name");
const countryState = document.querySelector(".country_state");
const mainDashboardTemp = document.querySelector(".temp");
const mainDashboardWeatherIcon = document.querySelector(".weather-icon");
const countryCurrentTime = document.querySelector(".country_current_time");
const FeelsLikeValue = document.querySelector(".Feels_like-value");
const humidityValue = document.querySelector(".humadity-value");
const windValue = document.querySelector(".wind-value");
const precipitationValue = document.querySelector(".precipitation-value");

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

// GeoEncoding feature

async function locationFetch() {
  try {
    //  const cityName = cityInput.value
    const cityName = "panipat";
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
    );

    const data = await res.json();
    const { country, name, latitude, longitude } = data.results[0];
    return { country, name, latitude, longitude };
  } catch (error) {
    return ("Geo location fetching error", error);
  }
}

async function locationWeatherFetch({ country, name, latitude, longitude }) {
  try {
    countryName.textContent = country;
    countryState.textContent = name;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=kmh&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    mainDashboardTemp.textContent = data.current.temperature_2m;
    let weather_code = getWeatherDetails(data.current.weather_code);
    mainDashboardWeatherIcon.src = weather_code.iconPath;

    const setdate = new Date(data.current.time);
    countryCurrentTime.innerText = setdate.toDateString();


    FeelsLikeValue.innerText = data.current.apparent_temperature;
    humidityValue.innerText = data.current.relative_humidity_2m;
    windValue.innerText = data.current.wind_speed_10m;
    precipitationValue.innerText = data.current.precipitation;



  // Assuming data comes from Open-Meteo: data.daily
const maxTemps = data.daily.temperature_2m_max;
const minTemps = data.daily.temperature_2m_min;

const card = document.querySelectorAll("#daily-container .day-card")

// day



card.forEach((card,index)=>{
  let maxValue = card.querySelector(".high");
  let lowValue = card.querySelector(".low");
  let dayName = card.querySelector(".day-name");
  

  if(maxValue && maxTemps !== undefined){
    maxValue.textContent = `${Math.round(maxTemps[index])}°`
  }
  if(lowValue && minTemps !== undefined){
    lowValue.textContent = `${Math.round(minTemps[index])}°`
  }
})


  } catch (error) {
    return ("Open meto API Error", error);
  }
}

// searchBtn.addEventListener("click",()=>{
//   locationFetch()
//   .then((res)=>{
//     locationWeatherFetch(res)
//   })
//   .catch((error)=>{console.log(error)})
// })

locationFetch()
  .then((res) => {
    locationWeatherFetch(res);
  })
  .catch((error) => {
    console.log(error);
  });
