const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').datebase

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        // createdAt和updatedAt字段显示与否
        timestamps:true,
        // createdAt updatedAt deletedAt字段显示与否
        paranoid:true,
        // 日期字段重命名
        createdAt:'create_at',
        updatedAt:'update_at',
        deletedAt:'delete_',
        underscored:true
    }
})

sequelize.sync({
    force: false
})

module.exports = {
    sequelize
}