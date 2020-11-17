const Sequelize = require('sequelize')
const connection = require('./database')

const answer = connection.define('answers', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

answer.sync({ force: false })

module.exports = answer