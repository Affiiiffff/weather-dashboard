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

// var now = moment();
// var currentDate =

function displayForecastData(lat, lon) {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;

  fetch(forecastUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
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
