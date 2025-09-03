const API_KEY = 6a0edd89ac8451cfc987fbba3d0feb85; 

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeather");
const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");

getWeatherBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=bg`
    );
    if (!res.ok) throw new Error("Грешен град");
    const data = await res.json();

    cityName.textContent = `🌍 ${data.name}, ${data.sys.country}`;
    temp.textContent = `🌡️ Температура: ${data.main.temp}°C`;
    desc.textContent = `☁️ ${data.weather[0].description}`;

    result.classList.remove("hidden");
  } catch (err) {
    cityName.textContent = "❌ Няма такъв град";
    temp.textContent = "";
    desc.textContent = "";
    result.classList.remove("hidden");
  }
});
