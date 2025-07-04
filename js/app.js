const api_key = "c6f566b1e8d04391711053c7d4144be3"; // <-- Secure this in env for real apps
const BASE = "https://api.openweathermap.org/data/2.5/weather";

const $ = (sel) => document.querySelector(sel); // short selector

const ui = {
  card: $(".weather-card"),
  notFound: $(".not-found"),
  img: $("#weatherImg"),

  temp: $("#tempValue"),
  feels: $("#feels"),
  desc: $("#desc"),
  humidity: $("#humidity"),
  wind: $("#wind"),
  sunrise: $("#sunrise"),
  sunset: $("#sunset"),

  minTemp: $("#min-temp"),
  maxTemp: $("#max-temp"),
  clouds: $("#clouds"),
  visibility: $("#visibility"),

  showError(msg = "City not found") {
    this.card.hidden = true;
    this.notFound.hidden = false;
    this.notFound.querySelector("p").textContent = msg;
  },

  showWeather(data) {
    const { main, weather, wind, sys, clouds, visibility } = data;

    this.notFound.hidden = true;
    this.card.hidden = false;

    // Re-trigger animation
    this.card.classList.remove("fade");
    void this.card.offsetWidth;
    this.card.classList.add("fade");

    // Fill values
    this.temp.textContent = `${Math.round(main.temp)}°C`;
    this.feels.textContent = `Feels like ${Math.round(main.feels_like)}°C`;
    this.desc.textContent = weather[0].description;

    this.minTemp.textContent = `${Math.round(main.temp_min)}°C`;
    this.maxTemp.textContent = `${Math.round(main.temp_max)}°C`;

    this.humidity.textContent = `${main.humidity}%`;
    this.wind.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;

    this.clouds.textContent = `${clouds?.all ?? 0}%`;
    this.visibility.textContent = `${(visibility / 1000).toFixed(1)} km`;

    const convertTime = (ts) =>
      new Date(ts * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    this.sunrise.textContent = convertTime(sys.sunrise);
    this.sunset.textContent = convertTime(sys.sunset);

    // Icon
    const iconKey = weather[0].main;
    const iconFile = `assets/${iconMap[iconKey] || "cloud"}.png`;
    $(
      "#weatherIcon"
    ).innerHTML = `<img src="${iconFile}" alt="${iconKey} icon" width="100" height="100">`;
  },

  showAQI(aqi) {
    const levels = {
      1: { label: "Good", class: "aqi-good" },
      2: { label: "Satisfactory", class: "aqi-satisfactory" },
      3: { label: "Moderate", class: "aqi-moderate" },
      4: { label: "Poor", class: "aqi-poor" },
      5: { label: "Very Poor", class: "aqi-very-poor" },
      6: { label: "Severe", class: "aqi-severe" },
    };

    const labelSpan = $("#aqiLabel");
    if (!aqi || !levels[aqi]) {
      labelSpan.innerHTML = "--";
      return;
    }

    const { label, class: className } = levels[aqi];

    labelSpan.innerHTML = `
    <span>${label}</span>
    <span class="aqi-badge ${className}" title="${label}"></span>
    <span class="aqi-level">(${aqi})</span>
  `;
  },
};

// Weather-to-icon mapping
const iconMap = {
  Clear: "clear",
  Rain: "rain",
  Drizzle: "rain",
  Thunderstorm: "storm",
  Snow: "snow",
  Mist: "mist",
  Smoke: "mist",
  Haze: "mist",
  Fog: "mist",
  Clouds: "cloud",
};

async function fetchWeather(city) {
  const url = `${BASE}?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${api_key}`;
  console.log("Fetching:", url);

  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}

async function fetchAQI(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch AQI");
  const data = await res.json();
  return data.list[0].main.aqi;
}

$("#searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = $("#searchInput").value.trim();
  if (!city) return ui.showError("Please enter a city");

  try {
    const data = await fetchWeather(city);
    console.log("Weather data:", data);

    ui.showWeather(data);

    // ✅ Store in localStorage
    localStorage.setItem("lastCity", city);
    localStorage.setItem("lastWeatherData", JSON.stringify(data));

    // ✅ AQI
    const { lat, lon } = data.coord;
    const aqi = await fetchAQI(lat, lon);
    ui.showAQI(aqi);
  } catch (err) {
    console.error("Fetch error:", err);

    if (!navigator.onLine) {
      ui.showError("You're offline. Please check your internet connection.");
    } else if (err.message.toLowerCase().includes("city")) {
      ui.showError("City not found");
    } else {
      ui.showError("Something went wrong. Please try again.");
      $("#aqiLabel").innerHTML = "--";
    }

    // Clear AQI on failure
    ui.aqiValue.textContent = "--";
    ui.aqiValue.className = "";
  }
});

// 🔁 On page load: Check if saved data exists
window.addEventListener("DOMContentLoaded", async () => {
  const savedData = localStorage.getItem("lastWeatherData");
  const lastCity = localStorage.getItem("lastCity");

  // ✅ Refill the input box with the last searched city
  if (lastCity) {
    $("#searchInput").value = lastCity;
  }

  // ✅ Show weather from saved data
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      ui.showWeather(parsedData);

      const { lat, lon } = parsedData.coord;
      const aqi = await fetchAQI(lat, lon);
      ui.showAQI(aqi);
    } catch (err) {
      console.error("Invalid saved weather data or AQI:", err);
      localStorage.removeItem("lastWeatherData");
      $("#aqiLabel").innerHTML = "--";
    }
  }
});

// Rotating placeholder animation
const staticTextStart = "Search city (e.g. ";
const staticTextEnd = ")";
const placeholders = ["Mumbai", "Pune", "Bengaluru", "Delhi", "Hyderabad"];
let i = 0;

setInterval(() => {
  $(
    "#searchInput"
  ).placeholder = `${staticTextStart}${placeholders[i]}${staticTextEnd}`;
  i = (i + 1) % placeholders.length;
}, 2500);

// ✅ Soft Reset on App Title Click
$(".app-title").addEventListener("click", () => {
  ui.card.hidden = true;
  ui.notFound.hidden = true;
  $("#searchInput").value = "";
  // Optionally focus input for faster typing
  $("#searchInput").focus();
});

// ✅ Offline Banner
function updateNetworkBanner() {
  const banner = $("#offlineBanner");
  if (!navigator.onLine) {
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
}

// Initial check on page load
updateNetworkBanner();

// Live listen for connectivity changes
window.addEventListener("online", updateNetworkBanner);
window.addEventListener("offline", updateNetworkBanner);

// ✅ Dismiss banner on close (×) click
$(".close-banner")?.addEventListener("click", () => {
  $("#offlineBanner").classList.add("hidden");
});
