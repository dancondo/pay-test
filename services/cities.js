const { cityList, weatherList } = require('../data/index.js');
const { throwError, errors } = require('../utils/errors');
const Weather = require('./weathers');

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
 */


module.exports = class City {

    constructor(city) {
        this.name = city.name
        this.country = city.country
        this.weather = city.weather
    }
    
    static findAll(onlyWithWeather) {
        const cities = onlyWithWeather
            ? cityList.reduce((arr, city) => {
                const weather = Weather.findByCityId(city.id)
                if (weather) {
                    arr.push({
                        ...city,
                        weather: weather
                    })
                }
                return arr
            }, [])
            : cityList
        return cities.map(city => new City(city));
    }

    static findById(id, weatherWhere) {
        const city = cityList.find(city => city.id === id)
        if (city) {
            city.weather = Weather.findByCityId(city.id, weatherWhere)
            return new City(city);
        }
        return throwError(errors.NOT_FOUND) 
    }
}