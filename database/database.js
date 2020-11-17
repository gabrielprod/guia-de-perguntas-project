const Sequelize = require('sequelize')
const connection = new Sequelize('guiaPerguntas', 'root', 'pererinha.12', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection