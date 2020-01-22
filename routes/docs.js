const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Pay Test API',
            version: '1.0.0',
        },
    },
    apis: ['routes/*.js', 'services/*.js'],
};
 
const swaggerSpec = swaggerJSDoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

module.exports = {
    router,
    namespace: '/docs'
};