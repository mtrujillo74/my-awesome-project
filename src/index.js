//API Key for Weather
let apiKey = "14086888615f30c32796187ed31db831";
//Output Day and Time
now = new Date();

function displayTemp(response) {
  //temp is returned in degrees C
  let temperature = document.querySelector("#temp-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  temperature.innerHTML = Math.round(response.data.list[0].main.temp);
  descriptionElement.innerHTML = response.data.list[0].weather[0].description;
  humidityElement.innerHTML = response.data.list[0].main.humidity;
  windSpeedElement.innerHTML = response.data.list[0].wind.speed;
  console.log(response);
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

function callNavGeo(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(updateCurrentLocationTemp);
}

function updateCurrentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCoordTemp);
}

function displayCoordTemp(response) {
  //console.log(response);
  let coordtemp = Math.round(response.data.main.temp);
  let tempUpdate = document.querySelector("#temp-city");
  tempUpdate.innerHTML = `${coordtemp}℃`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = now.getHours();
let minutes = now.getMinutes();
let timeMilitary = `${hours}:${minutes}`;

let day = document.querySelector("#current-day");
let time = document.querySelector("#current-time");
day.innerHTML = days[now.getDay()];
time.innerHTML = timeMilitary;

let city = document.querySelector("#city-search");
city.addEventListener("submit", updateCity);

let searchCurrentLocation = document.querySelector("#current-location-search");
//searchCurrentLocation.addEventListener("click", callNavGeo);
