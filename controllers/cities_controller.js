const City = require('../services/cities');

exports.index = (req, res, next) => {
    const query = req.query
    const onlyWithWeather = query.only_with_weather && JSON.parse(query.only_with_weather)
    return res.status(200).json({
        cities: City.findAll(onlyWithWeather)
    })
}

exports.show = (req, res, next) => {
    const id = JSON.parse(req.params.id)
    return res.status(200).json({
        city: City.findById(id)
    })
}