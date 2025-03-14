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
    // console.log(value);
    // láy value từ API
    const nameCity = value.name;
    const tempValue = Math.round(value.main.temp);
    const feelsLikeValue = Math.round(value.main.feels_like);
    const descriptionValue = value.weather[0].description;
    const weather = value.weather[0].main;
    const backgroundValue = getBackground(weather);
    const getIcon = value.weather[0].icon;
    const iconValue = `https://openweathermap.org/img/wn/${getIcon}@4x.png`
    

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


    // gán giá trị vào DOM
    location.innerHTML = nameCity;
    temp.innerHTML = tempValue + "&deg;";
    description.innerHTML = descriptionValue;
    feelsLike.innerHTML = feelsLikeValue + "&deg;";
    background.style.backgroundImage = `url(${backgroundValue})`;
    icon.style.backgroundImage = `url(${iconValue})`
  } catch (error) {
    window.alert(error);
  }
}
