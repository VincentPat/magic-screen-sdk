const axios = require('axios');
const request = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 10000
});

/**
 * 错误代码及提示
 */
const errorCodes = {
    4000: '参数不合法'
};

/**
 * 错误处理
 * @method errorHandler
 * @param {Error} error 
 */
function errorHandler(error) {
    console.log(`MSSDK => 请求失败：${error.msg}`);
}

module.exports = function ajax(options) {
    return request(options).then((response) => {
        const result = response.data;
        if (typeof result === 'object' && result.code === 0) {
            console.log('MSSDK => 请求成功');
        } else if (result.code in errorCodes) {
            console.warn(`MSSDK => 请求失败：${erorrCodes[result.code]}`);
        } else {
            errorHandler(new Error('未知服务器错误'));
        }
        return result;
    }).catch((error) => {
        errorHandler(error);
    });
};