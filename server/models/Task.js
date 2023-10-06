const database = require('../db')
const Sequelize = require('sequelize')
const User = require('./User')

const Task = database.define('tasks', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING,
    },
})

User.hasMany(Task)
Task.belongsTo(User, {
    foreignKey: 'authorId'
})

module.exports = Task