
var webpack = require('webpack');
var path = require('path');
var library_name = 'nary-tree-mab';
var outputFile = library_name + '.js';

var config = {
  entry: __dirname + '/lib/' + library_name + '.js',
  target: "node",
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: library_name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['babel-preset-es2015']
                }
            }
        }
    ],
  },
  resolve: {
    modules: [
        path.resolve('./lib'),
        "node_modules"
    ],
    extensions: ['.js']
  }
};

module.exports = config;
