const Router = require('koa-router')
const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntergerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middleware/auth')
const router = new Router({
    prefix: '/v1/classic'
})
// 把token验证的中间件写在 async前面做拦截
router.get('/latest', new Auth().m, async (ctx, next) => {
    ctx.body = ctx.auth.id


})
module.exports = router