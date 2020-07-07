const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const {LoginType} = require('../lib/enum')

// classic 测试校验
class PositiveIntergerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            // Rule('类型','提示',条件(可省略))
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}
// 注册参数校验
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少六个字符,最多32个字符', { min: 6, max: 18 }),
            new Rule('matches', '密码(长度在6~18之间，必须包含字母)', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称至少2个字符,最多32个字符', { min: 2, max: 8 })
        ]
    }
    // 校验输入的两次密码是否相同
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 != psw2) {
            throw new Error('两个密码必须相同')
        }
    }
    // 校验注册邮箱是否重复
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }


}
// 登录 获取 token 校验
class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则',{min:6})
        ],
        this.secret = [
            // 有时候密码不是必须要传入的(微信小程序)
            // isOptional 不属于 validate.js
            new Rule('isOptional'),
            new Rule('isLength', '密码至少六个字符,最多32个字符', { min: 6, max: 18 })
        ]
    }
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}
// 微信小程序 token 校验
class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}
module.exports = { PositiveIntergerValidator, RegisterValidator, TokenValidator ,NotEmptyValidator}