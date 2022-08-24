const apiKey = "9a0eca744af4e8af73f0c7e3a0c24420";

var searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", getCityName);
var searchInput = document.querySelector("#searchbox");

//Get City Name
function getCityName() {
  cityName = searchInput.value;

  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  fetch(requestUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // Do some stuff ...
      console.log(data);
    })
    .catch((err) => console.log(err));
}

// //get weather data using city name
// function getWeatherData() {
//   const currentWeatherUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=apiKey";
// }
