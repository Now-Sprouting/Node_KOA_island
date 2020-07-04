const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')
const router = new Router({
    prefix:'/v1/user'
})

// 注册
router.post('/register',async(ctx)=>{
    // 接受参数 参数校验
    // email password1 passowrd2 nickname
    const v = new RegisterValidator().validate(ctx)
})
module.exports = router