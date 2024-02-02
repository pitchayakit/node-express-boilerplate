export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => {
        res.status(err.status || 500).json({
            data: {
                message: err.message,
                errors: err.errors,
            },
        });
    });

export const applyAsyncHandlerToRouter = (router) => {
    for (let layer of router.stack) {
        if (layer.route) {
            layer.route.stack[0].handle = asyncHandler(
                layer.route.stack[0].handle,
            );
        }
    }
    return router;
};
