const API_KEY = "6a0edd89ac8451cfc987fbba3d0feb85"; 

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeather");
const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");

// помощен елемент за съобщения
let msg = document.getElementById("msg");
if (!msg) {
  msg = document.createElement("p");
  msg.id = "msg";
  msg.style.marginTop = "10px";
  result?.parentElement?.appendChild(msg);
}

function showMessage(text) {
  msg.textContent = text;
}

getWeatherBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) { showMessage("📝 Въведи име на град."); return; }

  showMessage("⏳ Зареждам...");
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=bg`;
    console.log("Fetching:", url);
    const res = await fetch(url);

    if (!res.ok) {
      // по-ясни съобщения
      if (res.status === 401) throw new Error("❌ Невалиден или липсващ API ключ (401).");
      if (res.status === 404) throw new Error("❌ Няма такъв град (404).");
      if (res.status === 429) throw new Error("⏳ Прекалено много заявки (429). Опитай пак след малко.");
      throw new Error(`❌ Грешка от сървъра (${res.status}).`);
    }

    const data = await res.json();
    cityName.textContent = `🌍 ${data.name}, ${data.sys?.country || ""}`;
    temp.textContent = `🌡️ Температура: ${data.main?.temp}°C`;
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
