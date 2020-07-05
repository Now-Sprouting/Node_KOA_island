const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
// 密码加密
const bcrypt = require('bcryptjs')
const router = new Router({
    prefix:'/v1/user'
})

// 注册
router.post('/register',async(ctx)=>{
    // 接受参数 参数校验
    // email password1 passowrd2 nickname
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email:v.get('body.email'),
        password:v.get('body.password2'),
        nickname:v.get('body.nickname')
    }
    User.create(user)
  throw new global.errs.Success()
})
module.exports = router