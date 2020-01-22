const City = require('../services/cities');

exports.index = (req, res, next) => {
    const query = req.query
    const onlyWithWeather = query.only_with_weather && JSON.parse(query.only_with_weather)
    const startLat = req.query.start_lat
    const endLat = req.query.end_lat
    const startLon = req.query.start_lon
    const endLon = req.query.end_lon

    const where = []

    if (startLat && endLat) {
        where.push({
            op: 'inRange',
            attribute: 'latitude',
            adapter: 'floatAdapter',
            params: {
                maxVal: endLat,
                minVal: startLat
            }
        })
    }

    if (startLon && endLon) {
        where.push({
            op: 'inRange',
            attribute: 'longitude',
            adapter: 'floatAdapter',
            params: {
                maxVal: endLon,
                minVal: startLon
            }
        })
    }

    return res.status(200).json({
        cities: City.findAll(onlyWithWeather, where.length > 0 ? where : null)
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