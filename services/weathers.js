const moment = require('moment')

const { weatherList } = require('../data/index.js');
const ApplicationServices = require('./application_services');

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

module.exports = class Weather extends ApplicationServices {

    constructor(weather) {
        super()
        this.dateTime = moment.unix(weather.dt).format('YYYY/MM/DD')
        this.details = weather.weather.map(w => ({
            name: w.main,
            description: w.description
        }))
    }

    static findByCityId(cityId, where) { 
        const weathers = weatherList.find(weather => weather.cityId === cityId)
        return weathers
            ? weathers.data.reduce((arr, weather) => {
                const newWeather = new Weather(weather)
                if (where && !newWeather[where.op]({
                        ...where.params,
                        adapter: where.adapter,
                        val: newWeather[where.attribute],
                    }))
                {
                    return arr
                }
                arr.push(newWeather)
                return arr
            }, [])
            : undefined
    }

}