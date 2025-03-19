const input = document.querySelector(".searhi-input");
const searchBtn = document.querySelector(".search-icon");

// Sự kiện enter và click trong input
searchBtn.addEventListener("click", fetchWeatherData);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeatherData();
  }
});

async function fetchWeatherData() {
  const cityName = input.value;
  const apiKey = "5b6bbe5f514928962b3726c6b6955d9d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=vi`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    // Lấy giá trị từ API
    const nameCity = data.name;
    const tempValue = Math.round(data.main.temp);
    const feelsLikeValue = Math.round(data.main.feels_like);
    const descriptionValue = data.weather[0].description;
    const weather = data.weather[0].main;
    const backgroundValue = getBackground(weather);
    const iconAPI = data.weather[0].icon;
    const weatherIconHTML = getIcon(iconAPI);

    const location = document.querySelector(".left-location p");
    const temp = document.querySelector(".left-temperature-value");
    const description = document.querySelector(".left-temperature-description");
    const feelsLike = document.querySelector(".fill-value");
    const background = document.querySelector(".background");
    const icon = document.querySelector(".temperature-icon");

    function getBackground(weather) {
      switch (weather) {
        case "Clear":
          return "acssec/nang.jpg";
        case "Clouds":
          return "acssec/may.jpg";
        case "Rain":
          return "acssec/mua.jpg";
        case "Snow":
          return "acssec/tuyet.jpg";
        case "Drizzle":
          return "acssec/mua.jpg";
        case "Thunderstorm":
          return "acssec/bao.jpg";
        case "Mist":
        case "Fog":
          return "acssec/mua.jpg";
        default:
          return "acssec/nang.jpg";
      }
    }

    function getIcon(icon) {
      switch (icon) {
        case "01n":
          return `<i class="fa-solid fa-moon"></i>`;
        case "02n":
        case "03n":
          return `<i class="fa-solid fa-cloud-moon"></i>`;
        case "09n":
        case "10n":
          return `<i class="fa-solid fa-cloud-moon-rain"></i>`;
        case "01d":
          return `<i class="fa-solid fa-sun"></i>`;
        case "02d":
        case "03d":
          return `<i class="fa-solid fa-cloud-sun"></i>`;
        case "04d":
        case "04n":
          return `<i class="fa-solid fa-cloud"></i>`;
        case "09d":
          return `<i class="fa-solid fa-cloud-sun-rain"></i>`;
        case "10d":
        case "10n":
          return `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
        case "11d":
        case "11n":
          return `<i class="fa-solid fa-tornado"></i>`;
        case "13d":
        case "13n":
          return `<i class="fa-solid fa-snowflake"></i>`;
        default:
          return `<i class="fa-solid fa-cloud"></i>`;
      }
    }

    // Gán giá trị vào DOM
    location.innerHTML = nameCity;
    temp.innerHTML = tempValue + "&deg;";
    description.innerHTML = descriptionValue;
    feelsLike.innerHTML = feelsLikeValue + "&deg;";
    background.style.backgroundImage = `url(${backgroundValue})`;
    icon.innerHTML = weatherIconHTML;
  } catch (error) {
    window.alert(error);
  }
}
set5Day();

function set5Day() {
  // Tạo đối tượng Date cho ngày hôm nay
  let today = new Date();

  // Mảng chứa tên các thứ trong tuần
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  // Lặp qua 5 ngày tiếp theo
  for (let i = 1; i <= 5; i++) {
    // Tạo một đối tượng Date mới cho ngày tiếp theo
    let nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    // Lấy thứ của ngày tiếp theo
    let dayOfWeek = daysOfWeek[nextDate.getDay()];
    const getDay = document.querySelector(
      `.day-container .container-item:nth-child(${i}) .container-item-day`
    );
    console.log(getDay);
    getDay.innerHTML = dayOfWeek;
  }
}
