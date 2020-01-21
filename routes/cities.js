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
 *     responses:
 *       200:
 *         description: City list.
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
 *     responses:
 *       200:
 *         description: A City and its weather
 *       404:
 *         description: Couldn't find a city
 */

router.get('/:id', citiesController.show);

module.exports = {
    router,
    namespace: '/cities'
}