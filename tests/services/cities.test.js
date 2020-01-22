const City = require('../../services/cities')

describe('Should be able to fetch all cities', () => {

    const result = City.findAll()
    const resultItem = result[Math.floor(Math.random() * 10)]
    const latWhere = {
        op: 'inRange',
        attribute: 'latitude',
        adapter: 'floatAdapter',
        params: {
            maxVal: 19.84,
            minVal: 20.4
        }
    }

    const lonWhere = {
        op: 'inRange',
        attribute: 'latitude',
        adapter: 'floatAdapter',
        params: {
            maxVal: -91,
            minVal: -71.9
        }
    }

    it('Expects to have an array as return value', () => {
        expect(result.constructor.name).toBe('Array');
    })

    it('Expects that the items are Cities', () => {
        expect(resultItem).toBeInstanceOf(City);
    })

    it('Expects that a city has name, country, latitude, longitude attributes', () => {
        expect(resultItem).toHaveProperty('name')
        expect(resultItem).toHaveProperty('country')
        expect(resultItem).toHaveProperty('latitude')
        expect(resultItem).toHaveProperty('longitude')
    })

    it('Expects that a city does not has a weather, if the user set it to false or does not pass any argument', () => {
        !expect(resultItem).toHaveProperty('weather')
        !expect(City.findAll(false)[0]).toHaveProperty('weather')
    })

    it('Expects that all cities has a weather, if the user pass true as an argument', () => {
        City.findAll(true).forEach(city => {
            expect(city).toHaveProperty('weather')
        })
    })

    it('Expects to filter cities by latitude', () => {
        City.findAll(false, latWhere).forEach(city => {
            expect(city.latitude).toBeGreaterThanOrEqual(latWhere.params.minVal)
            expect(city.latitude).toBeLesserThanOrEqual(latWhere.params.maxVal)
        })
    })

    it('Expects to filter cities by longitude', () => {
        City.findAll(false, lonWhere).forEach(city => {
            expect(city.longitude).toBeGreaterThanOrEqual(lonWhere.params.minVal)
            expect(city.longitude).toBeLesserThanOrEqual(lonWhere.params.maxVal)
        })
    })

    it('Expects to filter cities by latitude and longitude', () => {
        City.findAll(false, [latWhere, lonWhere]).forEach(city => {
            expect(city.latitude).toBeGreaterThanOrEqual(latWhere.params.minVal)
            expect(city.latitude).toBeLesserThanOrEqual(latWhere.params.maxVal)
            expect(city.longitude).toBeGreaterThanOrEqual(lonWhere.params.minVal)
            expect(city.longitude).toBeLesserThanOrEqual(lonWhere.params.maxVal)
        })
    })

})