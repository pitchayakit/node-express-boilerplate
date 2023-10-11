class InfoController {
    static async info(req, res, next) {
        const server = {
            status: 'OK'
        }

        res.response = { ...server };

        next();
    }
}

module.exports = InfoController;