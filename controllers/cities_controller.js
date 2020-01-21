const citiesService = require('../services/cities');

exports.index = (req, res, next) => {
    const query = req.query
    const onlyWithWeather = query.only_with_weather && JSON.parse(query.only_with_weather)
    return res.json({
        cities: citiesService.findAll(onlyWithWeather)
    })
}