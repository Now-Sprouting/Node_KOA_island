const {LinValidator,Rule} = require('../../core/lin-validator')

class PositiveIntergerValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            // Rule('类型','提示',条件(可省略))
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }
}
// 注册参数校验
class RegisterValidator extends LinValidator{
    constructor(){
        super()
        this.email = [
            new Rule('isEmail','不符合Email规范')
        ]
        this.password1 = [
            new Rule('isLength','密码至少六个字符,最多32个字符',{min:6,max:18}),
            new Rule('matches','密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength','昵称至少2个字符,最多32个字符',{min:2,max:8})
        ]
    }
    // 校验输入的两次密码是否相同
    validatePassword(vals){
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 != psw2){
            throw new Error('两个密码必须相同')
        }
    }
}

module.exports = {PositiveIntergerValidator,RegisterValidator}