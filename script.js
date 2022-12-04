const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById("city-input");
const citiesSearchedUl = document.getElementById('cities-searched-list');


// const apiKey = "c10eaea0e9394fba311e9c86f1534c7b";
// const latLonUrl = `http://api.openweathermap.org/geo/1.0/direct?limit=10&appid=${apiKey}`
// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${apiKey}`;

// const cityForm = document.getElementById("city-form");

// const forecastContainer = document.getElementById("forecast");


// save search to local storage
const saveCitySearch = () => {
    // event.preventDefault();
   
    const name = cityInput.value;
    if (!name) {
        return;
    }
    const savedCities = localStorage.getItem('cities')
    if (savedCities) {
        const savedNames = JSON.parse(savedCities);
        savedNames.push(name);
        localStorage.setItem('cities', JSON.stringify(savedNames));
    } else {
        const savedNames = [name];
        localStorage.setItem('cities', JSON.stringify(savedNames));    
    }
}
// update searched city list
function updateCities() {
    citiesSearchedUl.innerHTML = '';
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      const names = JSON.parse(savedCities);
      names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        li.classList.add("list-group-item") ;
        citiesSearchedUl.appendChild(li);
        citiesSearchedUl.insertBefore(li, citiesSearchedUl.children[0]);
      })
    }
  }
  updateCities();



searchButton.addEventListener("click", saveCitySearch); 



//set date and grabs the variables need for the weather values
const selectedCity = document.getElementById('selected-city');
let destinationCityName = cityInput.value;
const now =moment().format('MMM DD, YYYY');
selectedCity.innerHTML = destinationCityName + " " + now;
const temperature = document.getElementById('temperature');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const tomorrowForecastDate = document.getElementById('tomorrow-forecast-date');
const tomorrowTemperature = document.getElementById('tomorrow-temperature');
const tomorowWind = document.getElementById('tomorrow-wind');
const tomorrowHumidity = document.getElementById('tomorrow-humidity');
const day2ForecastDate = document.getElementById('day-2-forecast-date');
const day2Temperature = document.getElementById('day-2-temperature');
const day2Wind = document.getElementById('day-2-wind');
const day2Humidity = document.getElementById('day-2-humidity');
const day3ForecastDate = document.getElementById('day-3-forecast-date');
const day3Temperature = document.getElementById('day-3-temperature');
const day3Wind = document.getElementById('day-3-wind');
const day3Humidity = document.getElementById('day-3-humidity');
const day4ForecastDate = document.getElementById('day-4-forecast-date');
const day4Temperature = document.getElementById('day-4-temperature');
const day4Wind = document.getElementById('day-4-wind');
const day4Humidity = document.getElementById('day-4-humidity');
const day5ForecastDate = document.getElementById('day-5-forecast-date');
const day5Temperature = document.getElementById('day-5-temperature');
const day5Wind = document.getElementById('day-5-wind');
const day5Humidity = document.getElementById('day-5-humidity');
const cityWeatherImg = document.getElementById('city-weather-image');
const day1WeatherImage = document.getElementById('day-1-weather-image');
const day2WeatherImage = document.getElementById('day-2-weather-image');
const day3WeatherImage = document.getElementById('day-3-weather-image');
const day4WeatherImage = document.getElementById('day-4-weather-image');
const day5WeatherImage = document.getElementById('day-5-weather-image');

//perform api search to get lat and lon and then weather + 5 day forecast
function performSearch(search){
    const baseUrl = "https://api.openweathermap.org/geo/1.0/direct?"
    let parameters = "limit=1&appid=e2012a2fb3072bdca3b7b087af198107&q=" + encodeURIComponent(destinationCityName);
    const fullURL = baseUrl + parameters;
    let lat;
    let lon;
    let weatherParameters;
    fetch (fullURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
            const baseWeatherURL = "https://api.openweathermap.org/data/2.5/weather?&appid=e2012a2fb3072bdca3b7b087af198107&units=imperial&lang=en"
            weatherParameters = "&lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon);
            console.log(lat);
            console.log(lon);
            const fullWeatherURL = baseWeatherURL + weatherParameters;
            return fetch(fullWeatherURL);
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            cityWeatherImg.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + '.png';
            cityWeatherImg.alt = data.weather[0].description;
            temperature.innerHTML = 'Temperature: ' + data.main.temp + " F";
            wind.innerHTML = 'Wind: ' + data.wind.speed + " MPH";
            humidity.innerHTML = 'Humidity: ' + data.main.humidity + " %";
            const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=e2012a2fb3072bdca3b7b087af198107&lang=en";
            const forecastFullURL = forecastBaseURL + weatherParameters;
            return fetch(forecastFullURL);
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            tomorrowForecastDate.innerHTML = luxon.DateTime.now().plus({ days: 1 }).setZone('America/Los_Angeles').toLocaleString();
            day1WeatherImage.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + '.png';
            day1WeatherImage.alt = data.list[0].weather[0].description;
            tomorrowTemperature.innerHTML = 'Temperature: ' + data.list[0].main.temp + " F";
            tomorowWind.innerHTML = 'Wind: ' + data.list[0].wind.speed + " MPH";
            tomorrowHumidity.innerHTML = 'Humidity: ' + data.list[0].main.humidity + " %";
            day2ForecastDate.innerHTML = luxon.DateTime.now().plus({ days: 2 }).setZone('America/Los_Angeles').toLocaleString();
            day2WeatherImage.src = "https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + '.png';
            day2WeatherImage.alt = data.list[0].weather[0].description;
            day2Temperature.innerHTML = 'Temperature: ' + data.list[1].main.temp + " F";
            day2Wind.innerHTML = 'Wind: ' + data.list[1].wind.speed + " MPH";
            day2Humidity.innerHTML = 'Humidity: ' + data.list[1].main.humidity + " %";
            day3ForecastDate.innerHTML = luxon.DateTime.now().plus({ days: 3 }).setZone('America/Los_Angeles').toLocaleString();
            day3WeatherImage.src = "https://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + '.png';
            day3WeatherImage.alt = data.list[0].weather[0].description;
            day3Temperature.innerHTML = 'Temperature: ' + data.list[2].main.temp + " F";
            day3Wind.innerHTML = 'Wind: ' + data.list[2].wind.speed + " MPH";
            day3Humidity.innerHTML = 'Humidity: ' + data.list[2].main.humidity + " %";
            day4ForecastDate.innerHTML = luxon.DateTime.now().plus({ days: 4 }).setZone('America/Los_Angeles').toLocaleString();
            day4WeatherImage.src = "https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + '.png';
            day4WeatherImage.alt = data.list[0].weather[0].description;
            day4Temperature.innerHTML = 'Temperature: ' + data.list[3].main.temp + " F";
            day4Wind.innerHTML = 'Wind: ' + data.list[3].wind.speed + " MPH";
            day4Humidity.innerHTML = 'Humidity: ' + data.list[3].main.humidity + " %";
            day5ForecastDate.innerHTML = luxon.DateTime.now().plus({ days: 5 }).setZone('America/Los_Angeles').toLocaleString();
            day5WeatherImage.src = "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + '.png';
            day5WeatherImage.alt = data.list[0].weather[0].description;
            day5Temperature.innerHTML = 'Temperature: ' + data.list[4].main.temp + " F";
            day5Wind.innerHTML = 'Wind: ' + data.list[4].wind.speed + " MPH";
            day5Humidity.innerHTML = 'Humidity: ' + data.list[4].main.humidity + " %";
          })
      }
      performSearch();
      searchButton.addEventListener("click", performSearch); 



//     event.preventDefault();

//     const city = cityInput.value;
//     console.log(cityInput.value)

//     if (!city) {
//         return;
//     }

//     const url = `${forecastUrl}&q=${city}`;
//     const geocodingUrl = `${latLonUrl}&q=${city}`



//     try {
//         const geocodingReq = await fetch(geocodingUrl);
//         const geoData = await gecodingReq.json();
//         console.log("geoData",geoData);
//         const response = await fetch(url);
//         const data = await response.json();

//         forecastContainer.innerHTML = "";

//         for (let i = 0; i < data.list.length; i += 8) {
//             const dayData = data.list[i];

//             const date = new Date(dayData.dt * 1000);
//             const day = date.toLocaleDateString("en-US", { weekday: "long" });
//             const iconUrl = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
//         }
//     } catch{}
// })

