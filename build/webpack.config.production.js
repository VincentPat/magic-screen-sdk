const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const webpackConfig = merge(baseConfig, {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, "../dist"),
        filename: 'mssdk.js',
        library: 'mssdk',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
});

module.exports = webpackConfig;