const BASE_PATH = "../assets/images"
export const WEATHER_INTERPRETATION = {
  // Clear
  0: { label: "Clear Sky", iconPath: `${BASE_PATH}/icon-sunny.webp` },
  1: { label: "Mainly Clear", iconPath: `${BASE_PATH}/icon-sunny.webp` },

  // Clouds
  2: { label: "Partly Cloudy", iconPath: `${BASE_PATH}/icon-partly-cloudy.webp` },
  3: { label: "Overcast", iconPath: `${BASE_PATH}/icon-overcast.webp` },

  // Fog
  45: { label: "Fog", iconPath: `${BASE_PATH}/icon-fog.webp` },
  48: { label: "Depositing Rime Fog", iconPath: `${BASE_PATH}/icon-fog.webp` },

  // Drizzle
  51: { label: "Light Drizzle", iconPath: `${BASE_PATH}/icon-drizzle.webp` },
  53: { label: "Moderate Drizzle", iconPath: `${BASE_PATH}/icon-drizzle.webp` },
  55: { label: "Dense Drizzle", iconPath: `${BASE_PATH}/icon-drizzle.webp` },
  56: { label: "Freezing Drizzle (Light)", iconPath: `${BASE_PATH}/icon-drizzle.webp` },
  57: { label: "Freezing Drizzle (Dense)", iconPath: `${BASE_PATH}/icon-drizzle.webp` },

  // Rain
  61: { label: "Slight Rain", iconPath: `${BASE_PATH}/icon-rain.webp` },
  63: { label: "Moderate Rain", iconPath: `${BASE_PATH}/icon-rain.webp` },
  65: { label: "Heavy Rain", iconPath: `${BASE_PATH}/icon-rain.webp` },
  66: { label: "Freezing Rain (Light)", iconPath: `${BASE_PATH}/icon-rain.webp` },
  67: { label: "Freezing Rain (Heavy)", iconPath: `${BASE_PATH}/icon-rain.webp` },

  // Snow
  71: { label: "Slight Snow Fall", iconPath: `${BASE_PATH}/icon-snow.webp` },
  73: { label: "Moderate Snow Fall", iconPath: `${BASE_PATH}/icon-snow.webp` },
  75: { label: "Heavy Snow Fall", iconPath: `${BASE_PATH}/icon-snow.webp` },
  77: { label: "Snow Grains", iconPath: `${BASE_PATH}/icon-snow.webp` },

  // Rain Showers
  80: { label: "Slight Rain Showers", iconPath: `${BASE_PATH}/icon-rain.webp` },
  81: { label: "Moderate Rain Showers", iconPath: `${BASE_PATH}/icon-rain.webp` },
  82: { label: "Violent Rain Showers", iconPath: `${BASE_PATH}/icon-rain.webp` },

  // Snow Showers
  85: { label: "Slight Snow Showers", iconPath: `${BASE_PATH}/icon-snow.webp` },
  86: { label: "Heavy Snow Showers", iconPath: `${BASE_PATH}/icon-snow.webp` },

  // Thunderstorm
  95: { label: "Thunderstorm", iconPath: `${BASE_PATH}/icon-storm.webp` },
  96: { label: "Thunderstorm with Hail", iconPath: `${BASE_PATH}/icon-storm.webp` },
  99: { label: "Thunderstorm with Heavy Hail", iconPath: `${BASE_PATH}/icon-storm.webp` }
};


export function getWeatherDetails(code) {
  return (
    WEATHER_INTERPRETATION[code] || {
      label: "Unknown",
      iconPath: `${BASE_PATH}/icon-overcast.webp`
    }
  );
}



