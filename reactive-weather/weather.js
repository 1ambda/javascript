"use strict";

var Rx = require('rx');
var axios = require('axios');

var city = 'suwon';
var api = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&q=' + city;

var p = axios.get(api); /* promise */
var o = Rx.Observable
  .interval(1000 /* ms */)
  .selectMany(function() {
      return Rx.Observable.fromPromise(p);
  });

o.subscribe(function(res) {
  var weather = res.data.weather;
  var temp = res.data.main.temp;

  console.log("temp: " + temp);
  console.log("weather: " + weather[0].description);
});

