const marvelRoutes = require("./marvels");

const constructorMethod = (app) => {
    app.use('/', marvelRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;