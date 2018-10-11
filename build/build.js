const webpack = require('webpack');
const productionConfig = require('./webpack.config.production');

// 打包
webpack(productionConfig, function(err, stats) {
    if (err) throw err;
    console.log('webpack finished!');
});