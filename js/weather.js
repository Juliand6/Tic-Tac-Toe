let kelvin = 273
let key = 'dbf029344abd144e09ac3f9eb362f33f';

$(document).ready(function(){
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(data);
        }else{
            alert("Error: Your Browser does not support Geolocation. Weather feature not available");
        }
    }
    function data(position){
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let openWeatherApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`;
        $.get(openWeatherApi,function(res){
        let data = res.current;
        let temp = Math.floor(data.temp - kelvin);
        let condition = data.weather[0].description;
        $('.temperature').html(`${temp}°`);
        $('.weather_condition').html(condition);
        })
    
    }
    getLocation();
})