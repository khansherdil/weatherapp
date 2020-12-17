$(document).ready(function () {
  $("#search__btn").click(() => {
    let searchLocation = $("#text__input").val();
    let days = 3;
    const APIKEY = "cf287455e0764d59926123201201712";
    const urlCurrentWeather = `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${searchLocation}`;
    const urlForecastWeather = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${searchLocation}&days=${days}`;

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
                
                    </div>
                    <div class="weather__details"> 
                    <p>${data.current.temp_c}°c</p>
                    </div>
                </div>
                `);
        },
      }),
      $.ajax({
        url: urlForecastWeather,
        success: function (forecastData) {
          console.log(forecastData);
          $(".forecast__weather").html(`
            <h4>
            3-daagse voorspelling voor ${forecastData.location.name}
            </h4>
          `);
        },
      })
    );
  });
});
