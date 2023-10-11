const route = require('express').Router();
const infoController = require('../controllers/info.controller')
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const middleware = require('../middlewares');

routeConfig = {
    resource: [
        {
            methods: 'GET',
            path: '/info',
            controller: infoController.info
        }
    ],
}


Object.keys(routeConfig).forEach((key, index) => {
    routeConfig[key].forEach((config) => {
        const { methods, path, controller } = config
        route[methods.toLowerCase()](
            `/${key}${path}`,
            catchAsyncErrors(controller),
            middleware.responseSnakeHead()
        )
    });
});

module.exports = route