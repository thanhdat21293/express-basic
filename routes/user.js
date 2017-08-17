
module.exports = (express) => {
    router = express.Router();

    router.get('/', (req, res) => {
        res.send('User page')
    });
    return router
};