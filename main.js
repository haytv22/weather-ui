const input = document.querySelector(".searhi-input");
const searchBtn = document.querySelector(".search-icon");

//  sự kiên enter và click trong input
searchBtn.addEventListener("click", getAddNameTeamp);
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    getAddNameTeamp();
  }
});

async function getAddNameTeamp() {
  const nameCty = input.value;
  const apiKey = "5b6bbe5f514928962b3726c6b6955d9d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCty}&appid=${apiKey}&units=metric&lang=vi`;
  try {
    const Response = await fetch(url);

    if (!Response.ok) {
      throw new Error(Response.statusText);
    }

    const value = await Response.json();
    console.log(value);
    // láy value từ API
    const nameCity = value.name;
    const tempValue = Math.round(value.main.temp);
    const feelsLikeValue = Math.round(value.main.feels_like);
    const descriptionValue = value.weather[0].description;
    const weather = value.weather[0].main;
    const backgroundValue = getBackground(weather);
    const iconAIP = value.weather[0].icon;
    const iconValue = getIcon(iconAIP)
    

    const location = document.querySelector(".left-location p");
    const temp = document.querySelector(".left-temperature-value");
    const description = document.querySelector(".left-temperature-description");
    const feelsLike = document.querySelector(".fill-value");
    const background = document.querySelector(".background");
    const icon = document.querySelector(".temperature-icon")

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
          return "acssec/mua.jpg";
        case "Fog":
          return "acssec/mua.jpg";
        default:
          return "acssec/nang.jpg";
      }
    }
    function getIcon(icon) {
        switch (icon) {
            // trời tối
            case "01n":
                return `<i class="fa-solid fa-moon"></i>`
            case "02n" || "03n":
                return `<i class="fa-solid fa-cloud-moon"></i>`
            case "09n" || "10n":
                return `<i class="fa-solid fa-cloud-moon-rain"></i>`
            // trời sáng
            case "01d":
                return `<i class="fa-solid fa-sun"></i>`
            case "02d" || "03d":
                return `<i class="fa-solid fa-cloud-sun"></i>`
            case "04d "||"04n":
                return `<i class="fa-solid fa-cloud"></i>`
            case "09d":
                return `<i class="fa-solid fa-cloud-sun-rain"></i>`
            case "10d"||"10n":
                return `<i class="fa-solid fa-cloud-showers-heavy"></i>`
            case "11d"||"11n":
                return `<i class="fa-solid fa-tornado"></i>`
            case "13d"||"13n":
                return `<i class="fa-solid fa-snowflake"></i>`
            default:
                return `<i class="fa-solid fa-cloud"></i>`
        }
    }


    // gán giá trị vào DOM
    location.innerHTML = nameCity;
    temp.innerHTML = tempValue + "&deg;";
    description.innerHTML = descriptionValue;
    feelsLike.innerHTML = feelsLikeValue + "&deg;";
    background.style.backgroundImage = `url(${backgroundValue})`;
    icon.innerHTML = iconValue
  } catch (error) {
    window.alert(error);
  }
}
