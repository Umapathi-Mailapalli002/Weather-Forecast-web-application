const API_KEY = "3828aefe787cb9d8f54af75808bbd29e"; // Replace "YOUR_API_KEY" with your actual API key
const cityInput = document.querySelector("#location");
const searchButton = document.querySelector("#search-btn");
const nameOfcity = document.getElementById("city-Name");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const date = document.getElementById("date");
const weatherIcon = document.getElementById("weather-icon");
const currentLocation = document.getElementById("currentLocation");
const citiesData = document.getElementById("citiesData");
const weatherCardDiv = document.getElementById("weather-cards")

var locationiqKey = "pk.82e9b53e4830b1bcbd15e15c112ee58a";

$('#location').autocomplete({
  minChars: 3,
  deferRequestBy: 250,
  serviceUrl: 'https://api.locationiq.com/v1/autocomplete',
  paramName: 'q',
  params: {
    key: locationiqKey,
    format: "json",
    limit: 5
  },
  ajaxSettings: {
    dataType: 'json'
  },
  formatResult: function (suggestion, currentValue) {
    var format = "<div class='autocomplete-suggestion-name bg-white hover:bg-gray-400'>" + highlight(suggestion.data.display_place, currentValue) + "<br>" + highlight(suggestion.data.display_address, currentValue) + "</div>" + "<hr>";
    return format;

  },
  transformResult: function (response) {
    var suggestions = $.map(response, function (dataItem) {
      return {
        value: dataItem.address.name,
        data: dataItem
      };
      console.log(data);
    })

    return {
      suggestions: suggestions
    };
  },
  // onSelect: function (suggestion) {
  //     displayLatLon(suggestion.data.display_name);
  // }
});

$("#currentLocation").click(function () {
  $('#location').val("");
});

// function displayLatLon(display_name) {
//     var resultString = "You have selected " + display_name;
//     document.getElementById("result").innerHTML = resultString;
// }

function highlight(text, focus) {
  var r = RegExp('(' + escapeRegExp(focus) + ')', 'gi');
  return text.replace(r, '<strong>$1</strong>');
}

function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}



// Function to fetch weather details by city name
const getWeatherDetails = async () => {
  const cityName = cityInput.value.trim();
  //check if cityName is empty
  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(WEATHER_API_URL);
    // check for the response
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    //check for invalid city name
    if (data.cod === "404") {
      throw new Error("City not found");
    }
    //invalid data format check
    if (!data.main || !data.main.temp) {
      throw new Error("Invalid data format received");
    }
    console.log(data);
    const getDate = new Date();
    nameOfcity.innerHTML = `${data.name}`;
    description.innerHTML = `${(data.weather[0].description)}`;
    temp.innerHTML = `${"  " + data.main.temp + " °C"}`;
    wind.innerHTML = `${" " + data.wind.speed + " M/S"}`;
    humidity.innerHTML = `${" " + data.main.humidity + "%"}`
    date.innerHTML = `${"(" + (getDate.getFullYear()) + "-" +(getDate.getMonth() < 10 ? '0' : '') + parseInt(getDate.getMonth()+1) + "-" + (getDate.getDate() < 10 ? '0' : '') + getDate.getDate() +")"}`

    switch (data.weather[0].main) {
      case 'Clear':
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        break;
      case 'Clouds':
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        break;
      case 'Rain':
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        break;
      case 'Snow':
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        break;
      case 'Mist':
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        break;
      case 'Thunderstorm':
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        break;

    }

    const createWeatherCard = (weatherItem) => {
      return `<div class="flex justify-center items-center my-3 lg:mr-1">
      <div
        class="w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
          <div class="card mt-6 font-medium ml-8 mr-4">
           <h3 class="text-[1.3rem] lg:text-[1.7rem]">(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">${(weatherItem.main.temp- 273.15).toFixed(2)}°C</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>${weatherItem.wind.speed}M/S</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4>${weatherItem.main.humidity}%</h4></div>
         </div>
          <div class="w-40 flex-col justify-end items-center lg:ml-28"><img class="mr-3" src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
          <div class="w-40 flex justify-center  items-center text-center"> <h4 class="uppercase font-semibold absolute">${weatherItem.weather[0].description}</h4></div>
          </div>
        </div>
     </div>`;
    }

    //4days forecast 
    // Function to fetch 4-day forecast
    const postDaysForecast = async () => {
      try {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (!res.ok) {
          throw new Error("Failed to fetch weather forecast data");
        }
        const forecast4 = await res.json();
        console.log(forecast4);
        const uniqueForecastDays = [];
       const fourDaysForecast = forecast4.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if(!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        }).slice(1,5);
        
        // clearing previous weather data

        cityInput.value = "";
        weatherCardDiv.innerHTML = "";
      
        fourDaysForecast.forEach(weatherItem => {
          weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
        });
      } catch (error) {
        alert(error.message);
      }
    }
    postDaysForecast();
  } catch (error) {
    alert(error.message);

  }

}
searchButton.addEventListener("click", getWeatherDetails);

//for your current location 
//for success call back 
function gotPosition(position) {
  console.log(position);

  //api call for find the city name
  const currentPosition = async () => {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    if (!response.ok) {
      alert("facing some issue fecthing the current position");
    }
    const data = await response.json();
    console.log(data)
    const currentCityName = data[0].name;
    console.log(currentCityName);
    // fetching weather of current location
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&appid=${API_KEY}&units=metric`);
    if (!res.ok) {
      alert("facing some issue fecthing the current position");
    }

    const currPosition = await res.json();

    const getDate = new Date();
    nameOfcity.innerHTML = `${currPosition.name}`;
    description.innerHTML = `${(currPosition.weather[0].description)}`;
    temp.innerHTML = `${"  " + currPosition.main.temp + " °C"}`;
    wind.innerHTML = `${" " + currPosition.wind.speed + " M/S"}`;
    humidity.innerHTML = `${" " + currPosition.main.humidity + "%"}`
    date.innerHTML = `${"(" + (getDate.getFullYear()) + "-" +(getDate.getMonth() < 10 ? '0' : '') + parseInt(getDate.getMonth()+1) + "-" + (getDate.getDate() < 10 ? '0' : '') + getDate.getDate() +")"}`

    switch (currPosition.weather[0].main) {
      case 'Clear':
        weatherIcon.src = `https://openweathermap.org/img/wn/${currPosition.weather[0].icon}@4x.png`;
        break;
      case 'Clouds':
        weatherIcon.src = `https://openweathermap.org/img/wn/${currPosition.weather[0].icon}@4x.png`;
        break;
      case 'Rain':
        weatherIcon.src = `https://openweathermap.org/img/wn/${currPosition.weather[0].icon}@4x.png`;
        break;
      case 'Snow':
        weatherIcon.src = `https://openweathermap.org/img/wn/${currPosition.weather[0].icon}@4x.png`;
        break;
      case 'Mist':
        weatherIcon.src = `https://openweathermap.org/img/wn/${currPosition.weather[0].icon}@4x.png`;
        break;
      case 'Thunderstorm':
        weatherIcon.src = `https://openweathermap.org/img/wn/${currPosition.weather[0].icon}.png`;
        break;

    }

    console.log(currPosition);
    const createWeatherCard = (weatherItem) => {
      return `<div class="flex justify-center items-center my-3 lg:mr-1">
      <div
        class="w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
        <div class="card mt-6 font-medium ml-8 mr-4">
        <h3 class="text-[1.3rem] lg:text-[1.7rem]">(${weatherItem.dt_txt.split(" ")[0]})</h3>
         <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">${(weatherItem.main.temp- 273.15).toFixed(2)}°C</h4></div>
         <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>${weatherItem.wind.speed}M/S</h4></div>
         <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4>${weatherItem.main.humidity}%</h4></div>
      </div>
          <div class="w-40 flex-col justify-end items-center lg:ml-28"><img class="mr-3" src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
          <div class="w-40 flex justify-center  items-center text-center"> <h4 class="uppercase font-semibold absolute">${weatherItem.weather[0].description}</h4></div>
          </div>
        </div>
     </div>`;
    }

    //4days forecast 
    // Function to fetch 4-day forecast
    const postDaysForecast = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (!res.ok) {
          throw new Error("Failed to fetch weather forecast data");
        }
        const forecast4 = await res.json();
        const uniqueForecastDays = [];
       const fourDaysForecast = forecast4.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if(!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        }).slice(1,5);
        console.log(uniqueForecastDays);
        // clearing previous weather data

        cityInput.value = "";
        weatherCardDiv.innerHTML = "";
      
        fourDaysForecast.forEach(weatherItem => {
          weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
        });
      } catch (error) {
        alert(error.message);
      }
    }
    postDaysForecast();
  }
  currentPosition();
}

const cityTable = async () => {
  const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`);
  if (!response.ok) {
    alert("error on fetching the api");
  }
  const data = await response.json();
 const result = data.results;

 // Define the redirectToOpenWeather function in the global scope
window.redirectToOpenWeather = function(geoname) {
  const openWeatherURL = `https://openweathermap.org/city/${geoname}`;
  window.open(openWeatherURL, '_blank');
};

// Loop to generate table rows
for (let i = 0; i < result.length; i++) {
  // Insert HTML for each row in the table
  citiesData.insertAdjacentHTML("afterend",
      `<tr class="border-b-[1px] border-b-gray-400 text-center hover:bg-black text-white" onclick="redirectToOpenWeather(${result[i].geoname_id})">
         <td>${result[i].name}</td>
         <td>${result[i].cou_name_en}</td>
         <td>${result[i].timezone}</td>
      </tr>`
  );
}


}

cityTable();
document.addEventListener("DOMContentLoaded", cityTable);

//for faild call back
function faildToGet() {
  alert("faild to get the current position");
}
const current_Location = async () => {
  await navigator.geolocation.getCurrentPosition(gotPosition, faildToGet);

}
currentLocation.addEventListener("click", current_Location);