const router = require('express').Router();

const citiesController = require('../controllers/cities_controller');

/**
 * @swagger
 * 
 * /cities:
 *   get:
 *     description: Get all Cities
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: only_with_weather
 *         description: Rather if should return only results with weather info
 *         required: false
 *         type: boolean
 *       - in: query
 *         name: start_lat
 *         description: The start latitude that the city should be searched. Must be used with end_lat
 *         required: false
 *         type: float
 *       - in: query
 *         name: end_lat
 *         description: The end latitude that the city should be searched. Must be used with start_lat
 *         required: false
 *         type: float
 *       - in: query
 *         name: start_lon
 *         description: The start longitude that the city should be searched. Must be used with end_lat
 *         required: false
 *         type: float
 *       - in: query
 *         name: end_lon
 *         description: The end longitude that the city should be searched. Must be used with start_lon
 *         required: false
 *         type: float
 *     responses:
 *       200:
 *         description: City list.
 *         schema:
 *           type: array
 *           items: 
 *             allOf:
 *               - $ref: '#/definitions/City'
 */
router.get('/', citiesController.index);

/**
 * @swagger
 * 
 * /cities/{id}:
 *   get:
 *     description: Get a city by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the city you are searching for
 *         required: true
 *         type: integer
 *       - in: query
 *         name: start_date
 *         description: The start date that the climate should be searched. Must be used with end_date
 *         required: false
 *         type: string
 *         format: date
 *       - in: query
 *         name: end_date
 *         description: The start date that the climate should be searched. Must be used with end_date
 *         required: false
 *         type: string
 *         format: date
 *     responses:
 *       200:
 *         description: A City and its weather
 *         schema:
 *           allOf:
 *             - $ref: '#/definitions/City'
 *       404:
 *         description: Couldn't find a city
 */

router.get('/:id', citiesController.show);

module.exports = {
    router,
    namespace: '/cities'
}