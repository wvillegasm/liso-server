const path = require('path'),
  fs = require('fs'),
  nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: `${path.resolve(process.cwd())}/src/server/app.js`,
  output: {
    filename: 'server.js',
    path: `${path.resolve(process.cwd())}/build/`,
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /(node_modules)/,
      }, {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules)/,
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()]
};