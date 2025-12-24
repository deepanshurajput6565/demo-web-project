// Get references to DOM elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("error");

// search btn
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    showError("Please enter a city name!");
  }
});

// aPI CALLING
async function getCoordinates(city) {
  const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
    city
  )}&country=India&format=json&limit=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.length === 0) throw new Error("City not found");
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].display_name };
}

// without api
async function getWeather(city) {
  try {
    showError("");
    weatherResult.classList.add("hidden");

    const location = await getCoordinates(city);
    const { lat, lon, name } = location;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    const weatherCode = data.current.weather_code;
    const descriptionText = getWeatherDescription(weatherCode);

    
    cityName.textContent = name;
    temperature.textContent = `🌡️ Temperature: ${data.current.temperature_2m}°C`;
    description.textContent = `🌥️ Condition: ${descriptionText}`;
    humidity.textContent = `💧 Humidity: ${data.current.relative_humidity_2m}%`;
    wind.textContent = `💨 Wind Speed: ${data.current.wind_speed_10m} km/h`;

    weatherResult.classList.remove("hidden");
  } catch (error) {
    showError(error.message);
  }
}


function getWeatherDescription(code) {
  const map = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Depositing rime fog ❄️",
    51: "Light drizzle 🌦️",
    61: "Slight rain 🌧️",
    63: "Moderate rain 🌧️",
    65: "Heavy rain 🌧️",
    71: "Slight snow ❄️",
    80: "Rain showers 🌦️",
    95: "Thunderstorm ⛈️",
  };
  return map[code] || "Unknown";
}


function showError(msg) {
  errorMsg.textContent = msg;
}
