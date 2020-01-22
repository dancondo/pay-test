const Weather = require('../../services/weathers')
const moment = require('moment')

describe('Should be able to fetch the weather of a city', () => {

    const cityId = 3531732
    const result = Weather.findByCityId(cityId)
    const weather = result[0]
    const where = {
        op: 'inRange',
        attribute: 'dateTime',
        adapter: 'dataTimeAdapter',
        params: {
            maxVal: '2017/03/20',
            minVal: '2017/03/10'
        }
    }

    it('Expects to have an array as return value', () => {
        expect(result).toBeInstanceOf(Array)
    })

    it('Expects that the items are Weathers', () => {
        expect(weather).toBeInstanceOf(Weather);
    })

    it('Expects that a weather has dateTime, and details', () => {
        expect(weather).toHaveProperty('dateTime')
        expect(weather).toHaveProperty('details')
    })

    it('Expects that weather details be an array', () => {
        expect(weather.details).toBeInstanceOf(Array)
    })

    it('Expects that a weather details has a name and description', () => {
        weather.details.forEach(w => {
            expect(w).toHaveProperty('name')
            expect(w).toHaveProperty('description')
        })
    })

    it('Should be able to filter the weather by time range', () => {
        Weather.findByCityId(cityId, where).forEach(weather => {
            const weatherDt = moment(weather.dateTime, 'YYYY/MM/DD').valueOf()
            const minVal = moment(where.params.minVal, 'YYYY/MM/DD').valueOf()
            const maxVal = moment(where.params.maxVal, 'YYYY/MM/DD').valueOf()
            
            expect(weatherDt).toBeGreaterThanOrEqual(minVal)
            expect(weatherDt).toBeLessThanOrEqual(maxVal)
        })
    })

})