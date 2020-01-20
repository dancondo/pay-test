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
 *       - name: Latitude
 *         description: Latitude of a city
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: City list, or single city.
 */
router.get('/', citiesController.index)

module.exports = {
    router,
    namespace: '/cities'
}