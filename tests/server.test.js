const request = require('supertest');
const moment = require('moment');

const app = require('../server');

describe('Test de /cities api path', () => {

    const maxLat = 25.84;
    const minLat = 15;

    const maxLon = -30.9;
    const minLon = -92;

    it('It should respond to a get request', async () => {
        const response = await request(app).get('/cities')
        expect(response.statusCode).toBe(200);
    })

    it('It should respond with an array of cities', async() => {
        const response = await request(app).get('/cities')
        const data = response.body
        const cities = data.cities
        const city = cities[0]
        expect(data).toHaveProperty('cities')
        expect(cities).toBeInstanceOf(Array)
        expect(city).toHaveProperty('name')
        expect(city).toHaveProperty('country')
        expect(city).toHaveProperty('latitude')
        expect(city).toHaveProperty('longitude')
    })

    it('It should respond with and array of cities with weather if requested', async() => {
        const response = await request(app).get('/cities?only_with_weather=true')
        const data = response.body
        const cities = data.cities
        cities.forEach(city => {
            expect(city).toHaveProperty('weather')
            const weather = city.weather
            expect(weather).toBeInstanceOf(Array)
            expect(weather[0]).toHaveProperty('dateTime')
            expect(weather[0]).toHaveProperty('details')
        })
    })

    it('expects to filter the cities by latitude', async() => {
        const response = await request(app).get(`/cities?end_lat=${maxLat}&start_lat=${minLat}`)
        const cities = response.body.cities
        cities.forEach(city => {
            expect(city.latitude).toBeGreaterThanOrEqual(minLat)
            expect(city.latitude).toBeLessThanOrEqual(maxLat)
        })
    })

    it('expects to filter the cities by longitude', async() => {
        const response = await request(app).get(`/cities?end_lon=${maxLon}&start_lon=${minLon}`)
        const cities = response.body.cities
        cities.forEach(city => {
            expect(city.longitude).toBeGreaterThanOrEqual(minLon)
            expect(city.longitude).toBeLessThanOrEqual(maxLon)
        })  
    })

    it('expects to filter the cities by latitude and longitude', async() => {
        const response = await request(app).get(`/cities?end_lat=${maxLat}&start_lat=${minLat}&end_lon=${maxLon}&start_lon=${minLon}`)
        const cities = response.body.cities
        cities.forEach(city => {
            expect(city.longitude).toBeGreaterThanOrEqual(minLon)
            expect(city.longitude).toBeLessThanOrEqual(maxLon)
            expect(city.latitude).toBeGreaterThanOrEqual(minLat)
            expect(city.latitude).toBeLessThanOrEqual(maxLat)
        })
    })
})

describe('Test de /cities/:id api path', () => {

    const cityId = 3531732
    const startDate = '2017/03/10'
    const endDate = '2017/03/20'

    it('It should respond to a get request with 404 not found if no city is found', async () => {
        const response = await request(app).get('/cities/1')
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Not Found');
    })

    it('It should respond to a get request with a city if a valid id is provided', async () => {
        const response = await request(app).get(`/cities/${cityId}`)
        const city = response.body.city
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('city')
        expect(city).toHaveProperty('name')
        expect(city).toHaveProperty('country')
        expect(city).toHaveProperty('latitude')
        expect(city).toHaveProperty('longitude')
        expect(city).toHaveProperty('weather')
    })

    it('It should respond to a get request with a city filtering its weather by date', async () => {
        const response = await request(app).get(`/cities/${cityId}?start_date=${startDate}&end_date=${endDate}`)
        const city = response.body.city
        const weather = city.weather

        weather.forEach(w => {
            const weatherDt = moment(w.dateTime, 'YYYY/MM/DD').valueOf()
            const minVal = moment(startDate, 'YYYY/MM/DD').valueOf()
            const maxVal = moment(endDate, 'YYYY/MM/DD').valueOf()
    
            expect(weatherDt).toBeGreaterThanOrEqual(minVal)
            expect(weatherDt).toBeLessThanOrEqual(maxVal)
        })

    })

})