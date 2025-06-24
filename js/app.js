// js/app.js
const api_key = "c6f566b1e8d04391711053c7d4144be3";  // <-- secure in env in real apps
const BASE = 'https://api.openweathermap.org/data/2.5/weather';

const $ = sel => document.querySelector(sel);  // selector helper

const ui = {
  card: $('.weather-card'),
  notFound: $('.not-found'),
  temp: $('#temp'),
  desc: $('#desc'),
  humidity: $('#humidity'),
  wind: $('#wind'),
  img: $('#weatherImg'),

  showError(msg = 'City not found') {
    this.card.hidden = true;
    this.notFound.hidden = false;
    this.notFound.querySelector('p').textContent = msg;
  },

  showWeather({ main, weather, wind }) {
    this.notFound.hidden = true;
    this.card.hidden = false;

    // Re-trigger fade-in animation
    this.card.classList.remove('fade');
    void this.card.offsetWidth;  // force reflow
    this.card.classList.add('fade');

    // Fill UI
    this.temp.textContent = `${Math.round(main.temp)}°C`;
    this.desc.textContent = weather[0].description;
    this.humidity.textContent = `${main.humidity}%`;
    this.wind.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    this.img.src = `/assets/${iconMap[weather[0].main] || 'cloud'}.png`;
  },
};

const iconMap = {
  Clear: 'clear',
  Rain: 'rain',
  Snow: 'snow',
  Mist: 'mist',
  Clouds: 'cloud'
};

async function fetchWeather(city) {
  const url = `${BASE}?q=${encodeURIComponent(city)}&units=metric&appid=${api_key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

$('#searchForm').addEventListener('submit', async e => {
  e.preventDefault();
  const city = $('#searchInput').value.trim();
  if (!city) return ui.showError('Please enter a city');

  try {
    const data = await fetchWeather(city);
    ui.showWeather(data);
  } catch (err) {
    ui.showError(err.message.includes('city') ? 'City not found' : 'Network error');
  }
});
// animated placeholder cycling
const staticTextStart = "Search city (e.g. ";
const staticTextEnd = ")";
const placeholders = ["Mumbai", "Pune", "Bengaluru", "Delhi", "Hyderabad"];
let i = 0;

setInterval(() => {
  $('#searchInput').placeholder = `${staticTextStart}${placeholders[i]}${staticTextEnd}`;
  i = (i + 1) % placeholders.length;
}, 2500);




