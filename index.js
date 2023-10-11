require('dotenv').config();
const express = require('express')
const middleware = require('./src/middlewares')

global._ = require('underscore');

const app = express()

const routeConfig = require('./src/config/routes');
app.use('/v1', routeConfig);

app.use(middleware.errorException)

const port = process.env.PORT || 8005;
// start server at specific port
app.listen(port, () => {
    console.log(`App is running on port ${port}!`)
})