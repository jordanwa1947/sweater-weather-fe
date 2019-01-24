const axios = require('axios');
var $ = require('jQuery');

function forecastRequest (location) {
  return axios
    .get(`https://sweater-weather-micro.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(res => res.data)
    .catch(error => console.log(error));
}

function loadDetails (current, daily) {
  $('current').append('Time: ' + current['time']);
  $('current').append('Current Temp: ' + current['current_temp']);
  $('current').append('Summary: ' + current['summary']);
  $('current').append('High Temp: ' + daily[0]['high_temp']);
  $('current').append('Low Temp: ' + daily[0]['low_temp']);
}

function loadCurrent (current) {
  $('details').append('Feels Like: ' + current['feels_like']);
  $('details').append('Humidity: ' + current['humidity']);
  $('details').append('Visibility: ' + current['visibility']);
  $('details').append('Uv Index: ' + current['uv_index']);
}

function loadDays (daily) {
  for(i = 0; i < 6; i++) {
    $('day-' + i).append('Date: ' + daily[i]['date']);
    $('day-' + i).append('Icon: ' + daily[i]['icon']);
    $('day-' + i).append('High Temp: ' + daily[i]['high_temp']);
    $('day-' + i).append('Low Temp: ' + daily[i]['low_temp']);
  };
}

function loadHours (hourly) {
  for(i = 0; i < 8; i++) {
    $('hour-' + i).append('Time: ' + hourly['time']);
    $('hour-' + i).append('Icon: ' + hourly['icon']);
    $('hour-' + i).append('High Temp: ' + hourly['temperature']);
  };
}

function printToPage (current, daily, hourly) {
  loadCurrent(current);
  loadDetails(current, daily);
  loadHours(hourly);
  loadDaily(daily);
}

function parseResponse (json) {
  var forecast = json.data.attributes;
  var current = forecast.current;
  var daily = forecast.days;
  var hourly = forecast.hours;
  printToPage(current, daily, hourly);
}

$(document).ready(function() {
  $('#weather-button').click(function() {
    var location = $('#get-weather').val();
    var forecastJson = forecastRequest(location);
    parseResponse(forecastJson);
  });
});
