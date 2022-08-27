const apiKey = "6881a6f716060a103505d474f7d24bea";

var searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", getCityName);
var searchInput = document.querySelector("#searchbox");
var cityNameEl = document.querySelector(".city-name");
var currentTempEL = document.querySelector(".current-temp");
var currentWindEl = document.querySelector(".current-wind");
var currentHumidityEl = document.querySelector(".current-humidity");
var apiSection = document.querySelector("#apisection");
var currentUvEl = document.querySelector(".current-UV");
var todayTempEl = document.querySelector(".today-temp");
var todayWindEl = document.querySelector(".today-wind");
var todayHumidityEl = document.querySelector(".today-humidity");
var todayDateEl = document.querySelector(".today-date");
var tomorrowDateEl = document.querySelector(".tomorrow-date");
var tomorrowTempEl = document.querySelector(".tomorrow-temp");
var tomorrowWindEL = document.querySelector(".tomorrow-wind");
var tomorrowHumidityEL = document.querySelector(".tomorrow-humidity");

function displayForecastData(lat, lon) {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;

  fetch(forecastUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      todayTempEl.textContent = data.list[0].main.temp;
      todayWindEl.textContent = data.list[0].wind.speed;
      todayHumidityEl.textContent = data.list[0].main.humidity;
      todayDateEl.textContent = data.list[0].dt;

      tomorrowDateEl.textContent = data.list[1].dt;
      tomorrowTempEl.textContent = data.list[1].main.temp;
      tomorrowWindEL.textContent = data.list[1].wind.speed;
      tomorrowHumidityEL.textContent = data.list[1].main.humidity;
      console.log(data);
    });
}
//data.list[0].sdasd;https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid={apiKey}&exclude=current,minutely,hourly
//data :['london', 'adeladie', 'melbourne']

//Get City Name
function getCityName() {
  apiSection.style.display = "block";
  cityName = searchInput.value;

  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric" +
    "&appid=" +
    apiKey;

  fetch(requestUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      var fetchedData = data;

      displayForecastData(fetchedData?.coord?.lat, fetchedData?.coord?.lon);
      // append city name to cityname
      //temp to temp
      //humidity to humidity
      // console.log(data);
      cityNameEl.textContent = cityName;
      currentTempEL.textContent = fetchedData.main.temp;
      currentWindEl.textContent = fetchedData.wind.speed;
      currentHumidityEl.textContent = fetchedData.main.humidity;
      // currentUvEl.textContent = fetchedData.
      console.log(fetchedData);
    })
    .catch((err) => console.log(err));
}
