const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
    resolve: {
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            'socket$': 'socket.io-client/dist/socket.io.js',
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ]
};

module.exports = webpackConfig;