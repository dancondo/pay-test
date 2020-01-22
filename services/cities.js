const { cityList, weatherList } = require('../data/index.js');
const { throwError, errors } = require('../utils/errors');
const Weather = require('./weathers');
const ApplicationServices = require('./application_services');

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
 *      latitude:
 *        type: integer
 *      longitude:
 *        type: integer
 *      weather:
 *        type: array
 *        items:
 *          allOf:
 *            - $ref: '#/definitions/Weather'
 */


module.exports = class City extends ApplicationServices {

    constructor(city) {
        super()
        this.name = city.name
        this.country = city.country
        this.latitude = city.coord.lat
        this.longitude = city.coord.lon
        this.weather = city.weather
    }
    
    static findAll(onlyWithWeather, where) {
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
        return this.filter(cities, where);
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