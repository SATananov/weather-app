const API_KEY = "6a0edd89ac8451cfc987fbba3d0feb85"; // OpenWeather API key

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeather");
const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");

// етикет за съобщения
let msg = document.getElementById("msg");
if (!msg) {
  msg = document.createElement("p");
  msg.id = "msg";
  msg.style.marginTop = "10px";
  msg.style.color = "#fff";
  result?.parentElement?.appendChild(msg);
}

function showMessage(t) { msg.textContent = t; }

getWeatherBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) { showMessage("📝 Въведи име на град."); return; }

  showMessage("⏳ Зареждам...");
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=bg`;
    console.log("Fetching:", url);
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 401) throw new Error("❌ Невалиден или липсващ API ключ (401).");
      if (res.status === 404) throw new Error("❌ Няма такъв град (404).");
      if (res.status === 429) throw new Error("⏳ Прекалено много заявки (429). Опитай пак след малко.");
      throw new Error(`❌ Грешка от сървъра (${res.status}).`);
    }

    const data = await res.json();

    cityName.textContent = `🌍 ${data.name}, ${data.sys?.country || ""}`;
    temp.textContent = `🌡️ Температура: ${Math.round(data.main?.temp)}°C`;
    desc.textContent = `☁️ ${data.weather?.[0]?.description || "—"}`;

    result.classList.remove("hidden");
    showMessage("✅ Готово.");
  } catch (err) {
    console.error(err);
    result.classList.remove("hidden");
    cityName.textContent = "—";
    temp.textContent = "";
    desc.textContent = "";
    showMessage(err.message || "❌ Нещо се обърка.");
  }
});
