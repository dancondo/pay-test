const { cityList, weatherList } = require('../data/index.js');

/**
 * 
 * @swagger
 * 
 * definitions:
 *  City:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      country:
 *        type: string
 *      weather:
 *        type: array
 *        items:
 *          allOf:
 *            - $ref: '#/definitions/Weather'
 *
 *  Weather:
 *    type: object
 *    properties:
 *      dateTime:
 *        type: string
 *      details:
 *        type: array
 *        items:
 *          allOf:
 *            - $ref: '#/definitions/WeatherDetails'
 * 
 *  WeatherDetails:
 *    type: object
 *    properties:
 *      name:
 *        type: strin
 *      description:
 *        type: string
 *  
 */
const cityDTO = (city) => {
    return {
        name: city.name,
        country: city.country,
        weather: city.weathers ? city.weathers.map(weather => weatherDTO(weather)) : undefined
    }
}

const weatherDTO = (weather) => {
    return {
        dateTime: weather.dt,
        details: weather.weather.map(w => ({
            name: w.main,
            description: w.description
        }))
    }
}

exports.findAll = (onlyWithWeather) => {
    const cities = onlyWithWeather
        ? cityList.reduce((arr, city) => {
            const weather = weatherList.find(weather => weather.cityId === city.id)
            if (weather) {
                arr.push({
                    ...city,
                    weathers: weather.data
                })
            }
            return arr
        }, [])
        : cityList
    return cities.map(city => cityDTO(city));
}