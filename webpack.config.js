const webpackServer = require('./webpack/webpack.server.config');
const webpackClient = require('./webpack/webpack.client.config');

module.exports = [
    webpackServer,
    //webpackClient,
];