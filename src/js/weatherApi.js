/**
 * File: weather-Api.js
 * 
 * Author: Critina Hueso Corpas
 * 
 * Date: 11/01/2021
 * 
 * Description: script where I define the class that contains the function with which we call the api that we pass the city and the key api
 */

class WeatherApi {
    // function with which we call the api that we pass the city and the key api
    async getLocationData(input) {
      const API_KEY = "39a9a737b07b4b703e3d1cd1e231eedc";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
        );
        const resultAPI = await response.json();
        console.log(resultAPI);
      return resultAPI;
    }
  }