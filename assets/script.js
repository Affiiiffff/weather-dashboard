const API_KEY = "9a0eca744af4e8af73f0c7e3a0c24420";

var searchButton = document.querySelector("#btn btn-outline-secondary");
searchButton.addEventListener("click", getCityName);
var searchInput = document.querySelector("#form-control");

//Get City Name
function getCityName() {
  cityName = searchInput.value;

  console.log(cityName);
}

//get weather data using city name
function getWeatherDate(cityName) {}
const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=(birmingham)&appid=(API_KEY)";
