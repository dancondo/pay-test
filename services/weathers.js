const { weatherList } = require('../data/index.js');

/**
 * 
 * @swagger
 * 
 * definitions:
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
 *        type: string
 *      description:
 *        type: string
 *  
 */

module.exports = class Weather {

    constructor(weather) {
        this.dateTime = weather.dt
        this.details = weather.weather.map(w => ({
            name: w.main,
            description: w.description
        }))
    }

    static findByCityId(cityId) {
        const weathers = weatherList.find(weather => weather.cityId === cityId)
        return weathers
            ? weathers.data.map(weather => new Weather(weather))
            : undefined
    }

}