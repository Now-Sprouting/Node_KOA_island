const request = require("koa/lib/request")
const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 不同环境下是否提示报错信息
        const isHttpExecption = error instanceof HttpException
        const isDev = global.config.enviroment === 'dev'
        if(isDev && !isHttpExecption){
            throw error
        }
        // 处理已知异常
       if(isHttpExecption){
           ctx.body = {
               msg:error.msg,
               error_code:error.errorCode,
               request:`${ctx.method} ${ctx.path}`
           }
           ctx.status = error.code
        }
        // 处理未知异常(服务器异常)
        else{
            ctx.body = {
                msg:"we made a mistake 0(n_n)0~~",
                error_code:999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}
module.exports = catchError