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
const weatherCardDiv = document.getElementById("weather-cards");
const presentForecast = document.getElementById("presentForecast");
const filter = document.getElementById("filter");
const dropDown = document.getElementById("dropDown");

var locationiqKey = "pk.82e9b53e4830b1bcbd15e15c112ee58a";

//remove the skeletonloading
const removeSkeleton = (data) => {

  const getDate = new Date();
  const weatherHtml = `
  <div
    class="w-[90vw] h-[30vh] lg:w-[30vw] lg:h-[40vh] lg:justify-start backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
    <div class="mt-6 font-medium mx-8">
      <h2 class="text-[1.2rem] lg:text-[1.7rem] sm:text-[1.7rem]" id="city-Name">${data.name}</h2>
      <h3 id="date">${"(" + (getDate.getFullYear()) + "-" + (getDate.getMonth() < 10 ? '0' : '') + parseInt(getDate.getMonth() + 1) + "-" + (getDate.getDate() < 10 ? '0' : '') + getDate.getDate() + ")"}</h3>
      <div class="flex justify-start items-center "><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex" id="temp">${data.main.temp}°C</h4></div>
      <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4 id="wind">${data.wind.speed}M/S</h4></div>
      <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4 id="humidity">${data.main.humidity}%</h4></div>
    </div>
    <div class="w-40 flex-col justify-end items-center lg:ml-24 "><img class="size-32 ml-5 mt-8" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" id="weather-icon">
     <div class="w-40 flex justify-center  items-center text-center"><h4 class="uppercase font-semibold absolute"  id="description">${(data.weather[0].description)}</h4></div>
    </div>
  </div>`;
  if (presentForecast) {
    presentForecast.innerHTML = weatherHtml
  }
}
const addSkeleton = () => {
  const weatherHtml = `
 <div class="flex justify-center items-center lg:justify-start text-white" id="presentForecast">
 <div
   class="w-[90vw] h-[30vh] lg:w-[30vw] lg:h-[40vh] lg:justify-start backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
   <div class="mt-6 font-medium mx-8">
     <h2 class="text-[1.7rem] animate-pulse w-32 h-5 bg-gray-400 rounded-3xl mb-3" id="city-Name"></h2>
     <h3 class="animate-pulse w-24 h-4 bg-gray-400 rounded-3xl" id="date"></h3>
     <div class="flex justify-start items-center "><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="flex animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="temp"></h4></div>
     <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="wind"></h4></div>
     <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="humidity"></h4></div>
   </div>
   <div class="w-40 flex-col justify-end items-center lg:ml-28 "><img class="size-28 ml-5 my-8 animate-pulse bg-gray-400 rounded-full" id="weather-icon">
    <div class="w-40 flex justify-center  items-center text-center"><h4 class="uppercase font-semibold absolute animate-pulse w-28 h-5 bg-gray-400 rounded-3xl my-8" id="description"></h4></div>
   </div>
 </div>
</div>`;
  if (presentForecast) {
    presentForecast.innerHTML = weatherHtml
  }
}
const addSkeletonForFourDays = () => {
  const weatherHtml = `
 <!-- 4 days forecast -->
 <div class="my-4 w-[100vw] lg:my-0 flex-wrap lg:inline-flex text-white" id="weather-cards">
   <div class="flex justify-center items-center lg:ml-2 mr-1">
     <div
       class=" w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
       <div class="card mt-6 font-medium mx-8">
           <h3 class="animate-pulse bg-gray-400 w-24 h-5 rounded-3xl"></h3>
           <div class="flex justify-start items-center "><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="flex animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="temp"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="wind"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="humidity"></h4></div>
       </div>
       <div class="w-40 "><img class="animate-pulse bg-gray-400 rounded-full size-28 my-5">
         <h4 class="uppercase font-semibold animate-pulse w-28 h-4 bg-gray-400 rounded-3xl"></h4>
       </div>
     </div>
   </div>
   <div class=" flex justify-center items-center my-3 lg:mr-1">
     <div
       class=" w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
       <div class="card mt-6 font-medium mx-8">
           <h3 class="animate-pulse bg-gray-400 w-24 h-5 rounded-3xl"></h3>
           <div class="flex justify-start items-center "><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="flex animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="temp"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="wind"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="humidity"></h4></div>
       </div>
       <div class="w-40 "><img class="animate-pulse bg-gray-400 rounded-full size-28 my-5">
         <h4 class="uppercase font-semibold animate-pulse w-28 h-4 bg-gray-400 rounded-3xl"></h4>
       </div>
     </div>
   </div>
   <div class="flex justify-center items-center my-3 lg:mr-1">
     <div
       class=" w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
       <div class="card mt-6 font-medium mx-8">
           <h3 class="animate-pulse bg-gray-400 w-24 h-5 rounded-3xl"></h3>
           <div class="flex justify-start items-center "><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="flex animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="temp"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="wind"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="humidity"></h4></div>
       </div>
       <div class="w-40 "><img class="animate-pulse bg-gray-400 rounded-full size-28 my-5">
         <h4 class="uppercase font-semibold animate-pulse w-28 h-4 bg-gray-400 rounded-3xl"></h4>
       </div>
     </div>
   </div>
   <div class="flex justify-center items-center my-3 lg:mr-1">
     <div
       class=" w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
       <div class="card mt-6 font-medium mx-8">
           <h3 class="animate-pulse bg-gray-400 w-24 h-5 rounded-3xl"></h3>
           <div class="flex justify-start items-center "><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="flex animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="temp"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="wind"></h4></div>
           <div class="flex justify-start items-center"><img class="size-10 animate-pulse bg-gray-400 rounded-full mt-1 mr-2" alt=""><h4 class="animate-pulse w-20 h-4 bg-gray-400 rounded-3xl" id="humidity"></h4></div>
       </div>
       <div class="w-40 "><img class="animate-pulse bg-gray-400 rounded-full size-28 my-5">
         <h4 class="uppercase font-semibold animate-pulse w-28 h-4 bg-gray-400 rounded-3xl"></h4>
       </div>
     </div>
   </div>
 
 </div>`;
  if (weatherCardDiv) {
    weatherCardDiv.innerHTML = weatherHtml
  }
}



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
    })

    return {
      suggestions: suggestions
    };
  },
});

$("#currentLocation").click(function () {
  $('#location').val("");
});

function highlight(text, focus) {
  var r = RegExp('(' + escapeRegExp(focus) + ')', 'gi');
  return text.replace(r, '<strong>$1</strong>');
}

function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}



// Function to fetch weather details by city name
const getWeatherDetails = async () => {
  addSkeleton();
  addSkeletonForFourDays();

  //atached the filter value null if user add filter and click current location
  filter.value = "";
  //trigger function adjust the table again
  searchFun();

  const cityName = cityInput.value.trim();
  //check if cityName is empty
  if (cityName === "") {
    alert("Please enter a city name");
    //when click on the search the all divs are loading so to solve this problem 
    //the original is assigning on click on the search button
    if (presentForecast) {
      presentForecast.innerHTML = `<div class="flex justify-center items-center lg:justify-start text-white" id="presentForecast">
      <div
        class="w-[90vw] h-[30vh] lg:w-[30vw] lg:h-[40vh] lg:justify-start backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
        <div class="mt-6 font-medium mx-8">
          <h2 class="text-[1.7rem]" id="city-Name">_________</h2>
          <h3 id="date">(__-__-____)</h3>
          <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex" id="temp">___°C</h4></div>
          <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4 id="wind">__M/S</h4></div>
          <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4 id="humidity"> __%</h4></div>
        </div>
        <div class="w-40 flex-col justify-end items-center lg:ml-28"><img class="size-28 ml-5 mt-8 rounded-full" src="/assets/mainIcon-Dyc3_-kV.jpeg" id="weather-icon" alt="weather-icon">
         <div class="w-40 flex justify-center  items-center text-center"><h4 class="uppercase font-semibold absolute mt-8" id="description">Discription_______</h4></div>
        </div>
      </div>
    </div>`;
    }
    if (weatherCardDiv) {
      weatherCardDiv.innerHTML = `<!-- four days fore cast -->
      <div class="my-4 w-[100vw] lg:my-0 flex-wrap lg:inline-flex text-white" id="weather-cards">
        <div class="flex justify-center items-center lg:ml-2 mr-1">
          <div
            class=" w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
            <div class="card mt-6 font-medium mx-8">
                <h3>(__-__-____)</h3>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">_°C</h4></div>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>__M/S</h4></div>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4> __%</h4></div>
            </div>
            <div class="w-40 "><img class="size-28 ml-5 mt-8 rounded-full" src="/assets/mainIcon-Dyc3_-kV.jpeg" alt="weather-icon">
              <h4 class="uppercase font-semibold">Discription_______</h4>
            </div>
          </div>
        </div>
        <div class=" flex justify-center items-center my-3 lg:mr-1">
          <div
            class="w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
            <div class="card mt-6 font-medium mx-8">
                <h3>(__-__-____)</h3>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">_°C</h4></div>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>__M/S</h4></div>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4> __%</h4></div>
            </div>
            <div class="w-40 "><img class="size-28 ml-5 mt-8 rounded-full" src="/assets/mainIcon-Dyc3_-kV.jpeg" alt="weather-icon">
              <h4 class="uppercase font-semibold">Discription_______</h4>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center my-3 lg:mr-1">
          <div
            class="w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
            <div class="card mt-6 font-medium mx-8">
                <h3>(__-__-____)</h3>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">_°C</h4></div>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>__M/S</h4></div>
                <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4> __%</h4></div>
            </div>
            <div class="w-40 "><img class="size-28 ml-5 mt-8 rounded-full" src="/assets/mainIcon-Dyc3_-kV.jpeg" alt="weather-icon">
              <h4 class="uppercase font-semibold">Discription_______</h4>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center my-3 lg:mr-1">
          <div
            class="w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
            <div class="card mt-6 font-medium mx-8">
            <h3>(__-__-____)</h3>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">_°C</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>__M/S</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4> __%</h4></div>
        </div>
        <div class="w-40 "><img class="size-28 ml-5 mt-8 rounded-full" src="/assets/mainIcon-Dyc3_-kV.jpeg" alt="weather-icon">
          <h4 class="uppercase font-semibold">Discription_______</h4>
        </div>
          </div>
        </div>`
    }
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

    const getDate = new Date();
    removeSkeleton(data);
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
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>${weatherItem.wind.speed}M/S</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4>${weatherItem.main.humidity}%</h4></div>
         </div>
          <div class="w-40 flex-col justify-end items-center"><img class="mr-3" src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
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
          throw new Error("Failed to fetch the next four days forecast data");
        }
        const forecast4 = await res.json();
        const uniqueForecastDays = [];
        const fourDaysForecast = forecast4.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        }).slice(1, 5);

        // clearing previous weather data
        cityInput.value = "";
        weatherCardDiv.innerHTML = "";

        fourDaysForecast.forEach(weatherItem => {

          weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
        });

      } catch (error) {
        const errorMessage = encodeURIComponent(error.message);
        window.location.href = `error.html?message=${errorMessage}`;
      }
    }
    postDaysForecast();
  } catch (error) {
    const errorMessage = encodeURIComponent(error.message);
    window.location.href = `error.html?message=${errorMessage}`;

  }

}
searchButton.addEventListener("click", getWeatherDetails);

//for your current location 
//for success call back 
function gotPosition(position) {
  addSkeleton();
  addSkeletonForFourDays();

  //atached the filter value null if user add filter and click current location
  filter.value = "";
  //trigger function adjust the table again
  searchFun();

  //api call for find the city name
  const currentPosition = async () => {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error("facing some issue fecthing the current position");
    }
    const data = await response.json();
    const currentCityName = data[0].name;
    // fetching weather of current location
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&appid=${API_KEY}&units=metric`);
    if (!res.ok) {
      throw new Error("facing some issue fecthing the current position");
    }

    const currPosition = await res.json();
    removeSkeleton(currPosition);
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

    const createWeatherCard = (weatherItem) => {

      return `<div class="flex justify-center items-center my-3 lg:mr-1">
      <div
        class="w-[90vw] lg:w-[24.5vw] lg:h-[30vh] h-[30vh] backdrop-brightness-0 backdrop-opacity-10 rounded-3xl flex justify-between">
          <div class="card mt-6 font-medium ml-8 mr-4">
           <h3 class="text-[1.3rem] lg:text-[1.7rem]">(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/temp-ISyJuTyo.gif" alt=""><h4 class="flex">${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/wind-BryCWBRu.gif" alt=""><h4>${weatherItem.wind.speed}M/S</h4></div>
            <div class="flex justify-start items-center"><img class="size-10" src="/assets/humidity-Xwrmwjmh.gif" alt=""><h4>${weatherItem.main.humidity}%</h4></div>
         </div>
          <div class="w-40 flex-col justify-end items-center"><img class="mr-3" src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
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
          throw new Error("Failed to fetch the next four days forecast data");
        }
        const forecast4 = await res.json();
        const uniqueForecastDays = [];
        const fourDaysForecast = forecast4.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        }).slice(1, 5);
        // clearing previous weather data

        cityInput.value = "";
        weatherCardDiv.innerHTML = "";

        fourDaysForecast.forEach(weatherItem => {
          weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
        });
      } catch (error) {
        const errorMessage = encodeURIComponent(error.message);
        window.location.href = `error.html?message=${errorMessage}`;
      }
    }
    postDaysForecast();
  }
  currentPosition();
}

//sorting, filtering and searching for data
const searchFun = () => {
  var filterInput = filter.value.toUpperCase();
  let myTable = document.getElementById("myTable");
  let tr = myTable.getElementsByTagName("tr");

  //to access the dropdown 
  let selectBy = dropDown.value;

  for (var i = 0; i < tr.length; i++) {
    if (selectBy === "City Name") {
      let td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        let textValue = td.textContent || td.innerHTML;
        if (textValue.toLocaleUpperCase().indexOf(filterInput) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    } else if (selectBy === "Country") {
      let td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        let textValue = td.textContent || td.innerHTML;
        if (textValue.toLocaleUpperCase().indexOf(filterInput) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    } else {
      let td = tr[i].getElementsByTagName('td')[2];
      if (td) {
        let textValue = td.textContent || td.innerHTML;
        if (textValue.toLocaleUpperCase().indexOf(filterInput) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }

  }

}


// tabular data generated dynamically throuhg the api
const cityTable = async () => {
  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbymf94jOAnLGk__DR5JM0q1sWn0LwKD2XnkYrtIWoq5Ge2nFClFDJ7vq3v2VsBbjn58/exec`);
    if (!response.ok) {
      throw new Error("Error on fetching the table data")
    }
    const data = await response.json();
    const result = data.data;

    // Define the redirectToOpenWeather function in the global scope
    window.redirectToOpenWeather = function (geoname) {
      const openWeatherURL = `https://openweathermap.org/city/${geoname}`;
      window.open(openWeatherURL, '_blank');
    };

    // Loop to generate table rows
    citiesData.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
      // Insert HTML for each row in the table
      citiesData.insertAdjacentHTML("afterend",
        `<tr class="border-b-[1px] border-b-gray-400 text-center hover:bg-black text-white" onclick="redirectToOpenWeather(${result[i].geocode})">
         <td>${result[i].city}</td>
         <td>${result[i].country_name}</td>
         <td>${result[i].timezone}</td>
      </tr>`
      );

    }

    // Attach event listener to filter input
    const filter = document.getElementById("filter"); // Assuming you have an input field with id "filter"
    filter.addEventListener("input", searchFun);

    // Attach event listener to dropdown
    dropDown.addEventListener("change", () => {
      filter.value = ""; // Clear the input field when dropdown changes
      searchFun(); // Trigger searchFun to update table based on empty input
    });

  } catch (error) {
    const errorMessage = encodeURIComponent(error.message);
    window.location.href = `error.html?message=${errorMessage}`;
  }

};
document.addEventListener("DOMContentLoaded", cityTable);
document.addEventListener("load", addSkeleton);
document.addEventListener("load", addSkeletonForFourDays);



//for faild call back
function faildToGet() {
  const errorMessage = encodeURIComponent(error.message);
  window.location.href = `error.html?message=${errorMessage}`;
}
const current_Location = async () => {
  await navigator.geolocation.getCurrentPosition(gotPosition, faildToGet);

}
currentLocation.addEventListener("click", current_Location);

