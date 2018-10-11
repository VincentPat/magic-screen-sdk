const URL = require('url-parse');

module.exports = {
    parseURL(url) {
        const urlObj = new URL(url, true);
        return urlObj;
    }
};