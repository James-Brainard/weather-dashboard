// Need to retrieve their recent searches from LOCALSTORAGE.
// Display 5 day forecast with all ABOVE criteria and ICONS depicting the current weather 
let userInputEl = document.getElementById('user-input');
let citySearchedEl = document.getElementById('city-search');
let recentDiv = document.getElementById('recent-search');

let day1Temp = document.querySelector('.day-1-temp');
let day1Wind = document.querySelector('.day-1-wind');
let day1Humidity = document.querySelector('.day-1-humidity');
let day2Temp = document.querySelector('.day-2-temp');
let day2Wind = document.querySelector('.day-2-wind');
let day2Humidity = document.querySelector('.day-2-humidity');
let day3Temp = document.querySelector('.day-3-temp');
let day3Wind = document.querySelector('.day-3-wind');
let day3Humidity = document.querySelector('.day-3-humidity');
let day4Temp = document.querySelector('.day-4-temp');
let day4Wind = document.querySelector('.day-4-wind');
let day4Humidity = document.querySelector('.day-4-humidity');
let day5Temp = document.querySelector('.day-5-temp');
let day5Wind = document.querySelector('.day-5-wind');
let day5Humidity = document.querySelector('.day-5-humidity');
let day6Temp = document.querySelector('.day-6-temp');
let day6Wind = document.querySelector('.day-6-wind');
let day6Humidity = document.querySelector('.day-6-humidity');
let day1 = document.querySelector('.day-1');
let day2 = document.querySelector('.day-2');
let day3 = document.querySelector('.day-3');
let day4 = document.querySelector('.day-4');
let day5 = document.querySelector('.day-5');
let day6 = document.querySelector('.day-6');

const iconSource = 'https://openweathermap.org/img/wn/';
let icon1 = document.querySelector('.day-1-img');
let icon2 = document.querySelector('.day-2-img');
let icon3 = document.querySelector('.day-3-img');
let icon4 = document.querySelector('.day-4-img');
let icon5 = document.querySelector('.day-5-img');
let icon6 = document.querySelector('.day-6-img');

const date = Date();

const current = new Date();
let currentDay = current.getDate();
let currentMonth = current.getMonth() + 1;
let currentYear = current.getFullYear();
let currentDateFormat = `(${currentMonth}/${currentDay}/${currentYear})`;
let day1Forecast = currentDay;
let day2Forecast = currentDay + 1;
let day3Forecast = currentDay + 2;
let day4Forecast = currentDay + 3;
let day5Forecast = currentDay + 4;
let day6Forecast = currentDay + 5;


// create a function that defines what happens when click search
let formSubmitHandle = function (event) {
  event.preventDefault();

  let citySearch = citySearchedEl.value.trim();

  if (citySearch != null) {
    getWeather(citySearch);
    futureForecastData(citySearch);
    recentCitySearches(citySearch);
    citySearchedEl.value = '';
  } else {
    alert('Please enter a city.');
  } localStorage.setItem("name", citySearch);
};
// TRY TO WRITE THE CODE AND SCREW UP THEN ASK FOR HELP
// fetch data for weather from the search from open weather api for day 1
let getWeather = function (city) {
  const APIKey = config.myKey;
  const forecastURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + APIKey + '&units=imperial';

  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message === "city not found" || data === []) {
        alert('Please enter a city.');
        // return data.json()?
      }
      console.log(data);
      day1.textContent = `(${currentMonth}/${day1Forecast}/${currentYear})`;
      day1Temp.textContent = data.main.temp + "°F";
      day1Wind.textContent = data.wind.speed + "mph";
      day1Humidity.textContent = data.main.humidity + "%";
      icon1.setAttribute('src', iconSource + data.weather[0].icon + '@2x.png');
    })
};

// Need to tell local storage what to grab and WHERE to display it.
// Need to access LS to grab temp & humidity in DATA.
let futureForecastData = function (city) {
  const APIKey = config.myKey;
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&appid=" + APIKey + '&units=imperial';

  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      day2.textContent = `(${currentMonth}/${day2Forecast}/${currentYear})`;
      day2Temp.textContent = data.list[6].main.temp + "°F";
      day2Wind.textContent = data.list[6].wind.speed + "mph";
      day2Humidity.textContent = data.list[6].main.humidity + "%";
      icon2.setAttribute('src', iconSource + data.list[6].weather[0].icon + '@2x.png');

      day3.textContent = `(${currentMonth}/${day3Forecast}/${currentYear})`;
      day3Temp.textContent = data.list[13].main.temp + "°F";
      day3Wind.textContent = data.list[13].wind.speed + "mph";
      day3Humidity.textContent = data.list[13].main.humidity + "%";
      icon3.setAttribute('src', iconSource + data.list[13].weather[0].icon + '@2x.png');

      day4.textContent = `(${currentMonth}/${day4Forecast}/${currentYear})`;
      day4Temp.textContent = data.list[21].main.temp + "°F";
      day4Wind.textContent = data.list[21].wind.speed + "mph";
      day4Humidity.textContent = data.list[21].main.humidity + "%";
      icon4.setAttribute('src', iconSource + data.list[21].weather[0].icon + '@2x.png');

      day5.textContent = `(${currentMonth}/${day5Forecast}/${currentYear})`;
      day5Temp.textContent = data.list[29].main.temp + "°F";
      day5Wind.textContent = data.list[29].wind.speed + "mph";
      day5Humidity.textContent = data.list[29].main.humidity + "%";
      icon5.setAttribute('src', iconSource + data.list[29].weather[0].icon + '@2x.png');

      day6.textContent = `(${currentMonth}/${day6Forecast}/${currentYear})`;
      day6Temp.textContent = data.list[37].main.temp + "°F";
      day6Wind.textContent = data.list[37].wind.speed + "mph";
      day6Humidity.textContent = data.list[37].main.humidity + "%";
      icon6.setAttribute('src', iconSource + data.list[37].weather[0].icon + '@2x.png');
    })
};

function recentCitySearches (citySearch) {
  let previousSearches = JSON.parse(localStorage.getItem('recentsearches'));
    previousSearches.push({name: citySearch});
    localStorage.setItem('recentsearches');

  const searchBtn = document.createElement('button');
  searchBtn.textContent = citySearch;

  searchBtn.addEventListener('click', function () {
    getWeather(citySearch);
    futureForecastData(citySearch);
  });

  const recentDiv = document.getElementById('recent-search');
  recentDiv.appendChild(searchBtn);
};



// function to pull data from local storage
// use that data to put into the HTML cards we made

// Display list of recent searches under search form from LS
// Greyed out buttons for recent searches
// Make these clickable and show the results for weather for those specified past searches. 

userInputEl.addEventListener('submit', formSubmitHandle);

