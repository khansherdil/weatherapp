$(document).ready(function () {
  $("#extra__info").click(function () {
    $(".hidden").show();
  });
  $("#extra__info--hide").click(function () {
    $(".hidden").hide();
  });
  $("#search__btn").click(() => {
    let searchLocation = $("#text__input").val();
    let days = 3;
    const APIKEY = "cf287455e0764d59926123201201712";
    const urlCurrentWeather = `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${searchLocation}`;
    const urlForecastWeather = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${searchLocation}&days=${days}`;
    fetchData();
    setInterval(fetchData, 60000);
    //tot hier
    function fetchData() {
      $.when(
        $.ajax({
          url: urlCurrentWeather,
          success: function (data) {
            console.log(data);

            $("#weather__display").html(`
                  <h3>${data.location.country}</h3>
                  <p>${data.location.localtime}</p>
                  <div class="weather__display--main"> 
                      <div class="weather__assets"> 
                      <img src=${data.current.condition.icon} alt="Icon met het weer">  
                      <p>${data.current.condition.text} in ${data.location.name}. </p>
                      <p>Windsnelheid: ${data.current.wind_kph} km/u</p>
                  
                      </div>
                      <div class="weather__details"> 
                      <p class="current__temp">${data.current.temp_c}°c</p>
                      <p>Voelt aan als ${data.current.feelslike_c}°c</p>
                      </div>
                  </div>
                  `);
          },
        }),
        $.ajax({
          url: urlForecastWeather,
          success: function (forecastData) {
            let days = forecastData.forecast.forecastday;
            console.log(days);
            console.log(forecastData);
            $(".forecast__weather").html(`
              <h4>
              3-daagse voorspelling voor ${forecastData.location.name}
              </h4>
              <div class="forecast__main" id="fc__main">
                  <div class="forecast__main--left">
                  
                  <img src="${forecastData.forecast.forecastday[0].day.condition.icon}" alt="${forecastData.forecast.forecastday[0].day.condition.text}" />
                      <h4>Vandaag: </h4>
                      <p>${forecastData.forecast.forecastday[0].day.condition.text}</p>
                      
                  </div>
                  <div class="forecast__main--right">
                  <p>Min: <span>${forecastData.forecast.forecastday[0].day.mintemp_c}°c</span></p>
                  <p>Max: <span>${forecastData.forecast.forecastday[0].day.maxtemp_c}°c</span></p>
                  </div> 
                  <div class="hidden">
                  <h4>Extra info:</h4>
                  <p>Zicht: ${forecastData.current.vis_km} km.</p>
                  <p>Maanopkomst: ${forecastData.forecast.forecastday[0].astro.moonrise}</p>
                  <p>Maansondergang: ${forecastData.forecast.forecastday[0].astro.moonset}</p>
                  <p> </p>
                  </div>
  
              </div>
              <div class="forecast__main">
                  <div class="forecast__main--left"> 
                      <img src="${forecastData.forecast.forecastday[1].day.condition.icon}" alt="${forecastData.forecast.forecastday[1].day.condition.icon}" />
                      <h4>Morgen:</h4>
                      <p>${forecastData.forecast.forecastday[1].day.condition.text}</p>
                  </div>
  
                  <div class="forecast__main--right"> 
                      <p>Min: <span>${forecastData.forecast.forecastday[1].day.mintemp_c}°c </span></p>
                      <p>Max: <span>${forecastData.forecast.forecastday[1].day.maxtemp_c}°c </span></p>
                  </div>
                  <div class="hidden">
                  <h4>Extra info:</h4>
                  <p>Zicht: ${forecastData.current.vis_km} km.</p>
                  <p>Maanopkomst: ${forecastData.forecast.forecastday[1].astro.moonrise}</p>
                  <p>Maansondergang: ${forecastData.forecast.forecastday[1].astro.moonset}</p>
                  <p> </p>
                  </div>
  
              </div>
  
              <div class="forecast__main">
              <div class="forecast__main--left"> 
                  <img src="${forecastData.forecast.forecastday[2].day.condition.icon}" alt="${forecastData.forecast.forecastday[1].day.condition.icon}" />
                  <h4>Overmorgen:</h4>
                  <p>${forecastData.forecast.forecastday[2].day.condition.text}</p>
              </div>
  
              <div class="forecast__main--right"> 
                  <p>Min: <span>${forecastData.forecast.forecastday[2].day.mintemp_c}°c </span></p>
                  <p>Max: <span>${forecastData.forecast.forecastday[2].day.maxtemp_c}°c </span></p>
              </div>
              <div class="hidden">
              <h4>Extra info:</h4>
              <p>Zicht: ${forecastData.current.vis_km} km.</p>
              <p>Maanopkomst: ${forecastData.forecast.forecastday[2].astro.moonrise}</p>
              <p>Maansondergang: ${forecastData.forecast.forecastday[2].astro.moonset}</p>
              <p> </p>
              </div>
          </div>
            `);
          },
        })
      );
    }
  });
});
