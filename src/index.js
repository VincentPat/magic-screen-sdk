const ajax = require('@/ajax.js');
const utils = require('@/utils.js');
const EventEmitter = require('events');
const socketIO = require('socket');

/**
 * @class MSSDK
 */
class MSSDK {
    constructor() {
        this.api = {
            socket: 'http://localhost:8888/socket'
        };
        this.socket = null;
        this.events = new EventEmitter();
        this.query = utils.parseURL(location.href).query;
    }
    /**
     * 打印信息
     * @method print
     * @memberOf MSSDK
     * @param {String} type 打印类型
     * @param {String} info 打印信息
     * @returns {MSSDK}
     * @example
     * mssdk.print('log', '请求成功');
     */
    print(type, info) {
        if (type.match(/^(log|warn|error)$/)) {
            console[type](`MSSDK => ${info}`);
        } else {
            console.error(`no match print type: ${type}`);
        }
        return this;
    }
    /**
     * 监听事件
     * @method on
     * @memberOf MSSDK
     * @param {String} event 事件名称
     * @param {Function} cb 回调函数
     * @returns {MSSDK}
     * @example
     * // 监听test事件
     * mssdk.on('test', function(data) {
     *     console.log(data);
     * });
     */
    on(event, cb) {
        this.events.on(event, cb);
    }
    /**
     * 注销事件回调
     * @method off
     * @memberOf MSSDK
     * @param {String} event 事件名称
     * @param {Function|Null} cb 回调函数，为空表示注销该事件全部回调
     * @returns {MSSDK}
     * @example
     * // 注销test事件的print回调
     * mssdk.off('test', print);
     * // 注销test事件的全部回调
     * mssdk.off('test');
     */
    off(event, cb) {
        if (typeof cb === 'function') {
            this.events.removeListener(event, cb);
        } else {
            this.events.removeAllListeners(event);
        }
    }
    /**
     * 触发事件
     * @method emit
     * @memberOf MSSDK
     * @param {String} event 事件名称
     * @param {Any} data 回调参数
     * @returns {MSSDK}
     * @example
     * // 触发test事件
     * mssdk.emit('test', { score: 100 });
     */
    emit(event, data) {
        this.events.emit(event, data);
    }
    /**
     * 单次监听事件
     * @method once
     * @memberOf MSSDK
     * @param {String} event 事件名称
     * @param {Function} cb 回调函数
     * @returns {MSSDK}
     * @example
     * // 单次监听test事件
     * mssdk.once('test', function(data) {
     *     console.log(data);
     * });
     */
    once(event, cb) {
        this.events.once(event, cb);
    }
    /**
     * 提交分数
     * @method commitScore
     * @memberOf MSSDK
     * @param {Number} score
     * @returns {Promise}
     * @example
     * mssdk.commitScore(100);
     */
    commitScore(score) {
        return ajax({
            url: '/game/score',
            method: 'post',
            data: { score }
        });
    }
    /**
     * 提交分享
     * @method commitShare
     * @memberOf MSSDK
     * @returns {Promise}
     * @example
     * mssdk.commitShare();
     */
    commitShare() {
        return ajax({
            url: '/game/share',
            method: 'post'
        });
    }
    /**
     * 启动SocketIO
     * @method initSocket
     * @memberOf MSSDK
     * @returns {MSSDK}
     * @example
     * mssdk.initSocket();
     */
    initSocket(role) {
        this.socket = socketIO(this.api.socket);
        this.socket.on('connect', () => {
            this.print('log', 'SocketIO启动成功');
            this.emit('socketReady');
        });
        this.socket.on('closeRoom', () => {
            this.print('log', '房间关闭了');
            this.socket.close();
        });
        if (role === 'admin') {
            this.socket.on('newUser', (data) => {
                this.print('log', `新用户加入: ${data.id}`);
            });
        }
        return this;
    }
    /**
     * 创建房间
     * @method createRoom
     * @memberOf MSSDK
     * @param {String} roomId 房间ID
     * @returns {MSSDK}
     * @example
     * mssdk.createRoom();
     */
    createRoom(roomId) {
        if (this.socket) {
            const params = roomId ? { roomId } : null;
            this.socket.emit('createRoom', params, (data) => {
                if (data.code === 0) {
                    this.print('log', `创建房间成功，房间号：${data.roomId}`);
                    this.emit('createRoomSuccess', { roomId: data.roomId });
                }
            });
        } else {
            this.print('warn', '请先启动SocketIO');
        }
        return this;
    }
    /**
     * 加入房间
     * @method joinRoom
     * @memberOf MSSDK
     * @param {String} roomId 房间ID
     * @returns {MSSDK}
     * @example
     * mssdk.joinRoom(3456);
     */
    joinRoom(roomId) {
        if (this.socket) {
            this.socket.emit('joinRoom', { roomId }, (data) => {
                if (data.code === 0) {
                    this.print('log', '加入房间成功');
                    this.emit('joinRoomSuccess', { roomId: data.roomId });                    
                } else if (data.code === 4000) {
                    this.print('warn', '房间不存在');
                }
            });
        } else {
            this.print('warn', '请先启动SocketIO');
        }
        return this;
    }
    /**
     * 发送消息
     * @method sendMsg
     * @memberOf MSSDK
     * @param {Any} params 参数
     * @returns {MSSDK}
     * @example
     * mssdk.sendMsg({ event: 'firework' });
     */
    sendMsg(params) {
        if (this.socket) {
            this.socket.emit('msg', params, (data) => {
                if (data.code === 0) {
                    this.print('log', '发送消息成功');
                }
            });
        } else {
            this.print('warn', '请先启动SocketIO');
        }
        return this;
    }
    /**
     * 发送广播
     * @method broadcast
     * @memberOf MSSDK
     * @param {Any} params 参数
     * @returns {MSSDK}
     * @example
     * mssdk.broadcast({ event: 'firework' });
     */
    broadcast(params) {
        if (this.socket) {
            this.socket.emit('broadcast', params, (data) => {
                if (data.code === 0) {
                    this.print('log', '广播消息成功');
                }
            });
        } else {
            this.print('warn', '请先启动SocketIO');
        }
        return this;
    }
}

module.exports = new MSSDK();