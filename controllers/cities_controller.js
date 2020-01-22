const moment = require('moment');

const City = require('../services/cities');

exports.index = (req, res, next) => {
    const query = req.query
    const onlyWithWeather = query.only_with_weather && JSON.parse(query.only_with_weather)
    return res.status(200).json({
        cities: City.findAll(onlyWithWeather)
    })
}

exports.show = (req, res, next) => {
    const id = parseInt(req.params.id)
    const endDate = req.query.end_date
    const startDate = req.query.start_date
    const where = startDate && endDate && {
        op: 'inRange',
        attribute: 'dateTime',
        adapter: 'dataTimeAdapter',
        params: {
            maxVal: endDate,
            minVal: startDate
        }
    }
    return res.status(200).json({
        city: City.findById(id, where)
    })
}