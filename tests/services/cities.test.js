const City = require('../../services/cities')

describe('Should be able to fetch all cities', () => {

    const result = City.findAll()
    const city = result[Math.floor(Math.random() * 10)]
    const latWhere = {
        op: 'inRange',
        attribute: 'latitude',
        adapter: 'floatAdapter',
        params: {
            maxVal: 25,
            minVal: 15
        }
    }

    const lonWhere = {
        op: 'inRange',
        attribute: 'latitude',
        adapter: 'floatAdapter',
        params: {
            maxVal: -30.9,
            minVal: -92
        }
    }

    it('Expects to have an array as return value', () => {
        expect(result).toBeInstanceOf(Array);
    })

    it('Expects that the items are Cities', () => {
        expect(city).toBeInstanceOf(City);
    })

    it('Expects that a city has name, country, latitude, longitude attributes', () => {
        expect(city).toHaveProperty('name')
        expect(city).toHaveProperty('country')
        expect(city).toHaveProperty('latitude')
        expect(city).toHaveProperty('longitude')
    })

    it('Expects that a city does not has a weather, if the user set it to false or does not pass any argument', () => {
        !expect(city).toHaveProperty('weather')
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
            expect(city.latitude).toBeLessThanOrEqual(latWhere.params.maxVal)
        })
    })

    it('Expects to filter cities by longitude', () => {
        City.findAll(false, lonWhere).forEach(city => {
            expect(city.longitude).toBeGreaterThanOrEqual(lonWhere.params.minVal)
            expect(city.longitude).toBeLessThanOrEqual(lonWhere.params.maxVal)
        })
    })

    it('Expects to filter cities by latitude and longitude', () => {
        City.findAll(false, [latWhere, lonWhere]).forEach(city => {
            expect(city.latitude).toBeGreaterThanOrEqual(latWhere.params.minVal)
            expect(city.latitude).toBeLessThanOrEqual(latWhere.params.maxVal)
            expect(city.longitude).toBeGreaterThanOrEqual(lonWhere.params.minVal)
            expect(city.longitude).toBeLessThanOrEqual(lonWhere.params.maxVal)
        })
    })

})

describe('It shoud be able to fetch one city', () => {

    const city = City.findById(3531732)

    it('Expects to throw an 404 Not found error if no city is found', () => {
        expect(() => City.findById(1)).toThrow()
        expect(() => City.findById(1)).toThrow({ statusCode: 404, message: 'Not Found' })
    })

    it('Expects to return a city if  it is found', () => {
        expect(city).toBeInstanceOf(City)
    })

    it('Expects that a city has name, country, latitude, longitude, and weather attributes', () => {
        expect(city).toHaveProperty('name')
        expect(city).toHaveProperty('country')
        expect(city).toHaveProperty('latitude')
        expect(city).toHaveProperty('longitude')
        expect(city).toHaveProperty('weather')
    })

})