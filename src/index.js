//API Key for Weather
let apiKey = "14086888615f30c32796187ed31db831";
let celciusTemp = null;

//Function for updating Day and Time
function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  //temp is returned in degrees C
  let temperature = document.querySelector("#temp-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeStampElement = document.querySelector("#timestamp");
  let percipitationElement = document.querySelector("#rain");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.list[0].main.temp;

  temperature.innerHTML = Math.round(response.data.list[0].main.temp);
  descriptionElement.innerHTML = response.data.list[0].weather[0].description;
  humidityElement.innerHTML = response.data.list[0].main.humidity;
  windSpeedElement.innerHTML = response.data.list[0].wind.speed;
  timeStampElement.innerHTML = formatDate(response.data.list[0].dt * 1000);
  percipitationElement.innerHTML = response.data.list[0].rain;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  //console.log(response);
}

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityupdate = document.querySelector("#user-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
  // Update City Name
  cityupdate.innerHTML = cityInput.value;
}

let city = document.querySelector("#city-search");
city.addEventListener("submit", updateCity);

function unitConvCToF(event) {
  event.preventDefault;
  let unitFTemperatureElement = document.querySelector("#temp-city");
  let unitFTemperature = (celciusTemp * 9) / 5 + 32;
  unitFTemperatureElement.innerHTML = Math.round(unitFTemperature);
}
function unitConvFToC(event) {
  event.preventDefault;
  let unitCTemperatureElement = document.querySelector("#temp-city");
  unitCTemperatureElement.innerHTML = Math.round(celciusTemp);
}

let fahrenheit = document.querySelector("#units-F");
fahrenheit.addEventListener("click", unitConvCToF);

let celcius = document.querySelector("#units-C");
celcius.addEventListener("click", unitConvFToC);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Weather Information will automatically load with current location.*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateCurrentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCoordTemp);
}

function displayCoordTemp(response) {
  console.log(response);

  let temperature = document.querySelector("#temp-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeStampElement = document.querySelector("#timestamp");
  let percipitationElement = document.querySelector("#rain");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#user-city");

  celciusTemp = response.data.main.temp;

  temperature.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  timeStampElement.innerHTML = formatDate(response.data.dt * 1000);
  percipitationElement.innerHTML = response.data.rain;
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

navigator.geolocation.getCurrentPosition(updateCurrentLocationTemp);
//////////////////////////////////
