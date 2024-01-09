// asyncHandler.js
export default function asyncHandler(fn) {
    return function (req, res, next) {
        return Promise
            .resolve(fn(req, res, next))
            .catch(err => {
                res.status(err.status).json({ 
                    data: {
                        message: err.message,
                        errors: err.errors
                    }
                });
            });
    }
}