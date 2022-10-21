const weather = document.querySelector(".js-weather");
const weatherTitle = document.querySelector(".weather-box__title"),
    weatherImg = document.querySelector(".weather-box__img"),
    weatherPlace = document.querySelector(".weather-box__place"),
    weatherTemp = document.querySelector(".weather-box__temp"),
    weatherWind = document.querySelector(".weather-box__wind");

const API_KEY = "ff270edd5ae1c1bfa6485fcb30c00733";
const COORDS = 'coords';


function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json();
        })
        .then(function (json) {
            const country = json.sys.country;
            const place = json.name;
            const weatherName = json.weather[0].main;
            const weatherDesc = json.weather[0].description;
            const temperature = Math.floor(json.main.temp);
            const windSpeed = Math.floor(json.wind.speed);
            const icon = json.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            
            weatherTitle.innerText = weatherDesc;
            weatherImg.src = iconUrl;
            weatherTemp.innerText = `${temperature}℃`;
            weatherPlace.innerText = `${country}, ${place}`;
            weatherWind.innerText = `Wind : ${windSpeed}m/s`;        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError() {
    console.log("cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();