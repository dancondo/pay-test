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
router.get('/', citiesController.index)

module.exports = {
    router,
    namespace: '/cities'
}