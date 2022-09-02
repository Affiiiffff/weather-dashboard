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
var dayThreeDateEl = document.querySelector(".day3");
var dayThreeTempEl = document.querySelector(".day3-temp");
var dayThreeWindEl = document.querySelector(".day3-wind");
var dayThreeHumidityEl = document.querySelector(".day3-humidity");
var dayFourDateEl = document.querySelector(".day4");
var dayFourTempEl = document.querySelector(".day4-temp");
var dayFourWindEl = document.querySelector(".day4-wind");
var dayFourHumidityEl = document.querySelector(".day4-humidity");
var day5DateEl = document.querySelector(".day5-date");
var day5TempEl = document.querySelector(".day5-temp");
var day5WindEl = document.querySelector(".day5-wind");
var day5HumidityEl = document.querySelector(".day5-humidity");

function displayForecastData(lat, lon) {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;

  fetch(forecastUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      var todayDateEl = moment.unix(data.list[0].dt).format("MM/DD/YYYY");
      var dateString = moment.unix(data.list[5].dt).format("MM/DD/YYYY");
      var day2Date = moment.unix(data.list[12].dt).format("MM/DD/YYYY");
      var day3Date = moment.unix(data.list[22].dt).format("MM/DD/YYYY");
      var day4Date = moment.unix(data.list[28].dt).format("MM/DD/YYYY");

      todayDateEl.textContent = todayDateEl;
      todayTempEl.textContent = data.list[0].main.temp;
      todayWindEl.textContent = data.list[0].wind.speed;
      todayHumidityEl.textContent = data.list[0].main.humidity;

      tomorrowDateEl.textContent = dateString;
      tomorrowTempEl.textContent = data.list[5].main.temp;
      tomorrowWindEL.textContent = data.list[5].wind.speed;
      tomorrowHumidityEL.textContent = data.list[5].main.humidity;

      dayThreeDateEl.textContent = day2Date;
      dayThreeTempEl.textContent = data.list[12].main.temp;
      dayThreeWindEl.textContent = data.list[12].wind.speed;
      dayThreeHumidityEl.textContent = data.list[12].main.humidity;

      dayFourDateEl.textContent = day3Date;
      dayFourTempEl.textContent = data.list[22].main.temp;
      dayFourWindEl.textContent = data.list[22].wind.speed;
      dayFourHumidityEl.textContent = data.list[22].main.humidity;

      day5DateEl.textContent = day4Date;
      day5TempEl.textContent = data.list[28].main.temp;
      day5WindEl.textContent = data.list[28].wind.speed;
      day5HumidityEl.textContent = data.list[28].main.humidity;
      console.log(data);
    });
}
//data.list[0].sdasd;https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid={apiKey}&exclude=current,minutely,hourly
//data :['london', 'adeladie', 'melbourne']
function recentCity(cityName) {
  //save to local storage
  var storedCities = localStorage.getItem("cities");
  if (storedCities) {
    var citiesNew = JSON.parse(storedCities);
    citiesNew.push(cityName);
    localStorage.setItem("cities", JSON.stringify(citiesNew));
  } else {
    localStorage.setItem("cities", JSON.stringify([cityName]));
  }

  //append button
  var button = document.createElement("button");
  button.setAttribute("class", "btn btn-outline-secondary");
  button.textContent = cityName;
  button.addEventListener("click", function () {
    fetchCity(cityName);
  });

  document.getElementById("recent-searches").appendChild(button);
}

var storedCities = localStorage.getItem("cities");
if (storedCities) {
  var citiesNew = JSON.parse(storedCities);

  citiesNew.forEach((cityName) => {
    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-outline-secondary");
    button.textContent = cityName;
    button.addEventListener("click", function () {
      fetchCity(cityName);
    });

    document.getElementById("recent-searches").appendChild(button);
  });
  // create button
}

function fetchCity(cityName) {
  apiSection.style.display = "block";
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
      var iconEl = document.createElement("img");
      iconEl.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${fetchedData.weather[0].icon}.png`
      );
      cityNameEl.appendChild(iconEl);
      currentTempEL.textContent = fetchedData.main.temp;
      currentWindEl.textContent = fetchedData.wind.speed;
      currentHumidityEl.textContent = fetchedData.main.humidity;
      // currentUvEl.textContent = fetchedData.
      console.log(fetchedData);
    })
    .catch((err) => console.log(err));
}
//Get City Name
function getCityName() {
  cityName = searchInput.value;

  recentCity(cityName);
  fetchCity(cityName);
}
