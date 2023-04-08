let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let mins = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let today = document.querySelector(`#today`);
today.innerHTML = `${day}, ${month} ${date}, ${hour}:${mins}`;

//
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}
let form = document.querySelector("#searchBar");
form.addEventListener("submit", search);
//

let searchButton = document.querySelector("#searchButton");

function updateData(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  let realTemp = document.querySelector("#feelslike");
  realTemp.innerHTML = `feels like ${Math.round(
    response.data.main.feels_like
  )} °C`;
  let humidityLevel = document.querySelector("#humidity");
  humidityLevel.innerHTML = `humidity: ${response.data.main.humidity} %`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function updateCity(response) {
  let userCity = document.querySelector("#search-text-input").value;
  let apiKey = config.api_key;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateData);
  console.log(apiUrl);
}

searchButton.addEventListener("click", updateCity);
//

function retrievePosition(position) {
  let apiKey = config.api_key;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(updateData);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#locateButton");
locationButton.addEventListener("click", getLocation);
