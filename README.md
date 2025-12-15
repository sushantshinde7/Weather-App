🌤️ WeatherNow

WeatherNow is a sleek, responsive web app that provides real-time weather updates for any city.
Built using HTML, CSS, and JavaScript, it fetches live data from the OpenWeather API — displaying temperature, humidity, wind speed, AQI, sunrise/sunset, and more with an elegant glassmorphism UI.


> 🔗 Live Demo: [Weather App Live](https://sushantshinde7.github.io/Weather-App/)

> 📦 Repository: [weather-app](https://github.com/sushantshinde7/Weather-App)



## ✨ Features

### 🌤️ Core Features

- Search weather by city name  
- View temperature, humidity, wind speed, cloud cover, and visibility  
- Shows sunrise and sunset times  
- Displays AQI with color-coded level badge  
- Handles invalid or unknown city searches gracefully  

### 💎 Enhanced UX

- Glassy UI with icon feedback  
- Dynamic weather icons and popups  
- “Last updated” timestamp below stats  
- Offline support with a dismissible banner  
- Retains last searched city via `localStorage`  
- Accessible markup with ARIA labels  
- Click title to soft refresh


## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript  
- **API**: OpenWeather API  
- **Other Tools**:Fetch API, LocalStorage, Font Awesome Icons  

## 🔧 Installation
Follow these steps to set up the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/sushantshinde7.github.io/weather-app.git
Navigate to the project directory:
sh
Copy
Edit
cd weather-app
Open index.html in your browser.

🌍 API Usage
This app uses the OpenWeather API.
To use your own API key:
1. 🔑 Sign up at [openweathermap.org](https://openweathermap.org)
2. 🧾 Get your **API key**
3. 🛠️ In the `app.js` file, replace the value of  
   ```js
   const api_key = "YOUR_API_KEY";

🖼️ Screenshots
### Home Page  
![Home Page](screenshots/weather-homepage.png)

### Weather Search Example  
![Weather Search](screenshots/weather-app-search.png)


🤝 Contributing
If you’d like to contribute:

Fork this repository.
Create a feature branch (git checkout -b feature-name).
Commit your changes (git commit -m "Add new feature").
Push to your branch (git push origin feature-name).
Open a Pull Request.

⭐ If you like this project, consider giving it a star on GitHub! ⭐


🙏 Thank You
Made with ❤️ by Sushant Shinde
