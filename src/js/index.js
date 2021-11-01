/**
 * File: script.js
 * 
 * Author: Critina Hueso Corpas
 * 
 * Date: 11/01/2021
 * 
 * Description: script that retrieves the API information and displays it in the html index
 */

// Function when loading the document
$(document).ready(function(){
    // call to the function that loads the information of the current day
    daysOfWeek();

    // called to the function that looks for the information of the city by default
    searchCity();
});

// definition of the function that loads the information of the current day
function daysOfWeek() {
    // I define arrays with days of the week and months
    var week=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month=["January", "Febreruary", "March", "April", "May", "June", "July", "August", "September", "October", "Novembrer", "December"];
    
    // variable where I save the current default
    var dateNow = new Date();

    // pass the information to the front
    document.getElementById('todayName').innerHTML = week[dateNow.getUTCDay()];
    document.getElementById('todayDay').innerHTML = dateNow.getMonth() + " / " +
        month[dateNow.getDay()] + " / " + dateNow.getFullYear();
}

// function that seeks the information of the city by default
async function searchCity() {
    // variable where I save the city entered by the user
    const cityValInput =  document.getElementById('cityValInput').value;

    // variable where I save the API call
    const weatherApi = new WeatherApi();

    // I call the function that obtains the city data
    weatherApi.getLocationData(cityValInput).then((resultAPI) => {
        // console.log(resultAPI);
        // check if the result of the api has values
        if (resultAPI) {
            // variable where I store the display values on the front
            let result = {
                country: '<i class="material-icons">location_on</i> ' + cityValInput + " | " + resultAPI.sys.country,
                weatherDescription: resultAPI.weather[0].description,
                weatherShortDescription: resultAPI.weather[0].main,
                wind: "Wind: " +  resultAPI.wind.speed,
                humidity: "Humidity: " + resultAPI.main.humidity,
                pressure: "Pressure: " +  resultAPI.main.pressure,
                temp: resultAPI.main.temp + "F",
                highTemp: "Highs: " + resultAPI.main.temp_max + "F",
                minTemp: "Lows: " + resultAPI.main.temp_min + "F"
            };
            // variable where I store the color icon
            let colorShortDescription = '';
            // Looking at the value of the short description I show one color or another
            if(result.weatherShortDescription.includes('Cloud')) {
                colorShortDescription = 'text-blue';
                result.weatherShortDescription = '<i class="material-icons icon ' + colorShortDescription + '">cloud</i> '
                    + result.weatherShortDescription;
            } else if(result.weatherShortDescription.includes('Sunny')) {
                colorShortDescription = 'text-yellow';
                result.weatherShortDescription = '<i class="material-icons icon ' + colorShortDescription + '">wbsunny</i> '+ result.weatherShortDescription;
            } else {
                result.weatherShortDescription = result.weatherShortDescription;
            }
            
            // pass the information to the front
            document.getElementById('location').innerHTML = result.country;
            document.getElementById('temp').innerHTML = result.temp;
            document.getElementById('highTemp').innerHTML = result.highTemp;
            document.getElementById('minTemp').innerHTML = result.minTemp;
            document.getElementById('humidity').innerHTML = result.humidity;
            document.getElementById('wind').innerHTML = result.wind;
            document.getElementById('weatherShortDescription').innerHTML = result.weatherShortDescription;
            document.getElementById('weatherDescription').innerHTML = result.weatherDescription;
            document.getElementById('pressure').innerHTML = result.pressure;
        } else {
            alert('Error trying to conect with the API');
        }
    });
}