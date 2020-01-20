const router = require('express').Router();

const citiesController = require('../controllers/cities_controller');

router.get('/', citiesController.index)

module.exports = {
    router,
    namespace: '/cities'
}