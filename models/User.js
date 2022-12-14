const database = require('../db')
const Sequelize = require('sequelize')

const User = database.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'common'
    },
})

module.exports = User