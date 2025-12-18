# 🌤️ WeatherNow — Real-Time Weather App

> 🔗 Live Demo: [WeatherNow Live](https://sushantshinde7.github.io/Weather-App/)  
> 📦 Repository: [weather-app](https://github.com/sushantshinde7/Weather-App)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![API](https://img.shields.io/badge/API-OpenWeather-blue&style=flat)
![Status](https://img.shields.io/badge/Status-Active-brightgreen&style=flat)

A modern, responsive weather dashboard delivering accurate real-time data with a clean glassmorphism UI.

WeatherNow is a lightweight weather web app that provides real-time weather insights for any city using the OpenWeather API, with a focus on clarity, usability, and fast access to essential metrics.

---

## 🎥 Preview

![Weather App Preview](./screenshots/weather-app-search.png)

---

## 📌 Features & UX

| Category | Feature |
|--------|---------|
| Search | Search weather by city name with instant results |
| Data | Displays real-time temperature, humidity, wind speed, visibility, and cloud cover |
| Data | Displays sunrise and sunset times clearly |
| Data | Separate Air Quality Index (AQI) fetch using geographic coordinates |
| Data | Color-coded AQI levels with clear, human-readable status labels |
| Feedback | Shows last updated timestamp for data freshness |
| UX | Context-aware weather explanations with expandable info tooltip |
| Interaction | Clickable app title for soft weather refresh (no full reload) |
| UI | Dynamic weather icons based on live conditions |
| UI | Glassmorphism-inspired layout with clean visual hierarchy |
| UI | Smooth transitions and subtle micro-animations |
| State | Automatically restores last viewed weather state on page reload |
| Persistence | Retains last searched city using LocalStorage |
| Performance | Prevents duplicate API requests during active fetches (request locking) |
| Error Handling | Gracefully handles invalid or unknown city searches |
| Reliability | Intelligent fallbacks for partial or failed API responses |
| Network | Network-aware UI using browser online/offline events |
| Network | Dismissible offline status banner without blocking usage |
| Accessibility | Accessible interactions using ARIA labels and live regions |
| Responsive | Mobile-first, fully responsive design |
  

---

## 🛠️ Tech Stack

- HTML5 for semantic structure  
- CSS3 for layout, responsiveness, and UI styling  
- JavaScript (ES6+) for logic and API handling  
- OpenWeather API for live weather data  
- Fetch API for network requests  
- LocalStorage for persistence  

---

## 🚀 Getting Started

1. Clone the repository  
   ```sh
   git clone https://github.com/sushantshinde7/Weather-App.git
   ```

2. Navigate to the project directory  
   ```sh
   cd Weather-App
   ```

3. Open the app  
   - Open `index.html` directly in your browser  
   - OR use the **Live Server** extension in VS Code  

---

## 🌍 API Configuration

This project uses the **OpenWeather API**.

To use your own API key:

1. Sign up at https://openweathermap.org  
2. Generate an API key  
3. Replace the key in `app.js`:

   ```js
   const api_key = "YOUR_API_KEY";
   ```

---

## 📈 Future Improvements

- Hourly and 7-day weather forecast  
- Location-based weather detection  
- Celsius / Fahrenheit toggle  
- Progressive Web App (PWA) support  

---

## 👤 Author

**Sushant Shinde**  
GitHub: https://github.com/sushantshinde7  
LinkedIn: https://www.linkedin.com/in/sushantshinde7/

---

## 📄 License

This project is licensed under the **MIT License**.
