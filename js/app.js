// js/app.js
const API_KEY = 'YOUR_API_KEY';          //  <-- pull from env in real life
const BASE = 'https://api.openweathermap.org/data/2.5/weather';

const $ = sel => document.querySelector(sel);          // 1. tiny helper
const ui = {                                           // 2. ui-only funcs
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
    this.temp.textContent = `${Math.round(main.temp)}°C`;
    this.desc.textContent = weather[0].description;
    this.humidity.textContent = `${main.humidity}%`;
    this.wind.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    this.img.src = `/assets/${iconMap[weather[0].main] || 'cloud'}.png`;
  },
};

const iconMap = { Clear: 'clear', Rain: 'rain', Snow: 'snow', Mist: 'mist', Clouds: 'cloud' };

async function fetchWeather(city) {                    // 3. data-only func
  const url = `${BASE}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
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
