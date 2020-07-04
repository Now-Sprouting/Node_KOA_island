const Router = require('koa-router')
const router = new Router()
const {HttpException,ParameterException} = require('../../../core/http-exception')
const {PositiveIntergerValidator} = require('../../validators/validator')

router.post('/v1/:id/classic',(ctx,next)=>{  
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body

    const v = new PositiveIntergerValidator().validate(ctx)
    ctx.body = 'success'
    
    
})
module.exports = router