const fs = require('fs');
const path = require('path');

const cities = fs.readFileSync(path.join(__dirname, 'city_list.json'));
const weathers = fs.readFileSync(path.join(__dirname, 'weather_list.json'))

module.exports = {
  cityList: JSON.parse(cities),
  weatherList: JSON.parse(weathers)
};