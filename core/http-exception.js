class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = '10000', code = 400) {
        super()
        this.code = code
        this.msg = msg
        this.errorCode = errorCode
    }
}
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}
// post请求成功异常处理(这里把post请求成功定义异常是为了简便,可以直接在user.js中定义 res.body)
class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}
class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}
module.exports = { HttpException, ParameterException, Success, AuthFailed, NotFound, Forbbiden }