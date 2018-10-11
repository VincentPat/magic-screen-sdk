<a name="MSSDK"></a>

## MSSDK
**Kind**: global class  

* [MSSDK](#MSSDK)
    * [.print(type, info)](#MSSDK.print) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.on(event, cb)](#MSSDK.on) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.off(event, cb)](#MSSDK.off) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.emit(event, data)](#MSSDK.emit) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.once(event, cb)](#MSSDK.once) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.commitScore(score)](#MSSDK.commitScore) ⇒ <code>Promise</code>
    * [.commitShare()](#MSSDK.commitShare) ⇒ <code>Promise</code>
    * [.initSocket()](#MSSDK.initSocket) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.createRoom(roomId)](#MSSDK.createRoom) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.joinRoom(roomId)](#MSSDK.joinRoom) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.sendMsg(params)](#MSSDK.sendMsg) ⇒ <code>[MSSDK](#MSSDK)</code>
    * [.broadcast(params)](#MSSDK.broadcast) ⇒ <code>[MSSDK](#MSSDK)</code>

<a name="MSSDK.print"></a>

### MSSDK.print(type, info) ⇒ <code>[MSSDK](#MSSDK)</code>
打印信息

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | 打印类型 |
| info | <code>String</code> | 打印信息 |

**Example**  
```js
mssdk.print('log', '请求成功');
```
<a name="MSSDK.on"></a>

### MSSDK.on(event, cb) ⇒ <code>[MSSDK](#MSSDK)</code>
监听事件

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | 事件名称 |
| cb | <code>function</code> | 回调函数 |

**Example**  
```js
// 监听test事件
mssdk.on('test', function(data) {
    console.log(data);
});
```
<a name="MSSDK.off"></a>

### MSSDK.off(event, cb) ⇒ <code>[MSSDK](#MSSDK)</code>
注销事件回调

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | 事件名称 |
| cb | <code>function</code> &#124; <code>Null</code> | 回调函数，为空表示注销该事件全部回调 |

**Example**  
```js
// 注销test事件的print回调
mssdk.off('test', print);
// 注销test事件的全部回调
mssdk.off('test');
```
<a name="MSSDK.emit"></a>

### MSSDK.emit(event, data) ⇒ <code>[MSSDK](#MSSDK)</code>
触发事件

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | 事件名称 |
| data | <code>Any</code> | 回调参数 |

**Example**  
```js
// 触发test事件
mssdk.emit('test', { score: 100 });
```
<a name="MSSDK.once"></a>

### MSSDK.once(event, cb) ⇒ <code>[MSSDK](#MSSDK)</code>
单次监听事件

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | 事件名称 |
| cb | <code>function</code> | 回调函数 |

**Example**  
```js
// 单次监听test事件
mssdk.once('test', function(data) {
    console.log(data);
});
```
<a name="MSSDK.commitScore"></a>

### MSSDK.commitScore(score) ⇒ <code>Promise</code>
提交分数

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type |
| --- | --- |
| score | <code>Number</code> | 

**Example**  
```js
mssdk.commitScore(100);
```
<a name="MSSDK.commitShare"></a>

### MSSDK.commitShare() ⇒ <code>Promise</code>
提交分享

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  
**Example**  
```js
mssdk.commitShare();
```
<a name="MSSDK.initSocket"></a>

### MSSDK.initSocket() ⇒ <code>[MSSDK](#MSSDK)</code>
启动SocketIO

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  
**Example**  
```js
mssdk.initSocket();
```
<a name="MSSDK.createRoom"></a>

### MSSDK.createRoom(roomId) ⇒ <code>[MSSDK](#MSSDK)</code>
创建房间

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>String</code> | 房间ID |

**Example**  
```js
mssdk.createRoom();
```
<a name="MSSDK.joinRoom"></a>

### MSSDK.joinRoom(roomId) ⇒ <code>[MSSDK](#MSSDK)</code>
加入房间

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>String</code> | 房间ID |

**Example**  
```js
mssdk.joinRoom(3456);
```
<a name="MSSDK.sendMsg"></a>

### MSSDK.sendMsg(params) ⇒ <code>[MSSDK](#MSSDK)</code>
发送消息

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Any</code> | 参数 |

**Example**  
```js
mssdk.sendMsg({ event: 'firework' });
```
<a name="MSSDK.broadcast"></a>

### MSSDK.broadcast(params) ⇒ <code>[MSSDK](#MSSDK)</code>
发送广播

**Kind**: static method of <code>[MSSDK](#MSSDK)</code>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Any</code> | 参数 |

**Example**  
```js
mssdk.broadcast({ event: 'firework' });
```
