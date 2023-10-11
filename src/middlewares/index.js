const humps = require('humps');

class Middlewares {
    static errorException(err, req, res, next) {
        if (err.status) {
            res.status(err.status).send({
                code: err.code,
                message: err.message,
                success: err.success || undefined,
                error: err || undefined
            });
        } else {
            res.status(500).send({
                code: 500,
                message: 'somthing went wrong'
            });
        }
        console.error('error-exception', err);
    }

    static responseSnakeHead() {
        return (req, res, next) => {
            res.response = humps.decamelizeKeys(res.response, function (key, convert, options) {
                return /^[A-Z0-9_]+$/.test(key) ? key : convert(key, options);
            });
            res.send(res.response);
        }
    }
}

module.exports = Middlewares
