const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    static initCore(app){
        // 入口方法
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadConfig()
    }
    static loadConfig(path = ''){
        const configPath = path || `${process.cwd()}/config/config.js`
        const config = require(configPath)
        global.config = config
    }
    // require-directory模块解决频繁导入(require)和注册(use)的问题
    static initLoadRouters(){
        // 绝对路径 process.cwd()为文件加存放的主机路径
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module,apiDirectory,{
            visit:whenLoadModule
        })
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
    }
}
module.exports = InitManager