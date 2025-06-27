const api_key = "c6f566b1e8d04391711053c7d4144be3"; // <-- secure in env in real apps
const BASE = "https://api.openweathermap.org/data/2.5/weather";

const $ = (sel) => document.querySelector(sel); // short selector helper

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

  showError(msg = "City not found") {
    this.card.hidden = true;
    this.notFound.hidden = false;
    this.notFound.querySelector("p").textContent = msg;
  },

  showWeather({ main, weather, wind, sys }) {
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
    this.humidity.textContent = `${main.humidity}%`;
    this.wind.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;

    const convertTime = (ts) =>
      new Date(ts * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

    this.sunrise.textContent = ` ${convertTime(sys.sunrise)}`;
    this.sunset.textContent = ` ${convertTime(sys.sunset)}`;

    const iconKey = weather[0].main;
    const iconFile = `/assets/${iconMap[iconKey] || "cloud"}.png`;
    ui.weatherIcon = $("#weatherIcon");
    ui.weatherIcon.innerHTML = `<img src="${iconFile}" alt="${iconKey} icon" width="100" height="100">`;
  },
};

// Basic weather-to-icon mapping
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
  console.log("Status Code:", res.status);
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

$("#searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = $("#searchInput").value.trim();
  if (!city) return ui.showError("Please enter a city");

  try {
    const data = await fetchWeather(city);
    ui.showWeather(data);
  } catch (err) {
    ui.showError(
      err.message.includes("city") ? "City not found" : "Network error"
    );
  }
});

// animated placeholder cycling
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
