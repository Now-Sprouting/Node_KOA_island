const {LinValidator,Rule} = require('../../core/lin-validator')
const { __esModule } = require('validator/lib/isAlpha')

class PositiveIntergerValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            // Rule('类型','提示',条件(可省略))
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }
}

module.exports = {PositiveIntergerValidator}