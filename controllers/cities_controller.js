const citiesService = require('../services/cities');

exports.index = (req, res, next) => {
    const query = req.query
    const onlyWithWeather = query.only_with_weather && JSON.parse(query.only_with_weather)
    return res.status(200).json({
        cities: citiesService.findAll(onlyWithWeather)
    })
}

exports.show = (req, res, next) => {
    const id = JSON.parse(req.params.id)
    return res.status(200).json({
        city: citiesService.findById(id)
    })
}