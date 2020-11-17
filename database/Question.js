const Sequelize = require('sequelize')
const connection = require('./database')


// CRIANDO A TABELA
const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descript: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


//para nao criar a tabela novamente.
Question.sync({ force: false }).then(() => {})

module.exports = Question