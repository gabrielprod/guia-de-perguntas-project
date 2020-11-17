const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const questionModel = require('./database/Question')
const answerModel = require('./database/Answer')

//Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita com sucesso !")
    })
    .catch(e => {
        console.log(e)
    })




//EJS -> linguagem de modelagem que gera/desenha HTML com JavaScript
// setando o ejs como view engine

app.set('view engine', 'ejs')

// Para exibir arquivos estaticos como arquivos html/css/imgs e afins
app.use(express.static('public'))
    // utilzando o bodyparser no express pra que ele converta os dados em estruturas de js
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Rotas
app.get('/', (req, res) => {
    //raw : true significa que as buscas pelos dados seja feita de forma crua ou seja somente os dados e nao informações adicionais.
    questionModel.findAll({
        raw: true,
        order: [
            ['id', 'DESC'] //ASC = CRESCENTE / DESC = DECRESCENTE
        ]
    }).then(quest => {
        res.render('index', {
            question: quest
        })
    })

    //o metodo render ira rendenizar todo arquivo html/EJS contido pasta views
})

app.get('/ask', (req, res) => {
    res.render('ask')
})

app.post('/safequestion', (req, res) => {
    // o nome do parametro utilizado pra pegar os dados do formulario é o mesmo nome da no name dos inputs dos formularios
    let t = req.body.title
    let d = req.body.txarea
        // O modulo create adiciona valores a tabela do banco
    questionModel.create({
        title: t,
        descript: d
    }).then(() => {
        //Depois de adicionar valores a tabela, redirecione o user pra pagina inicial.
        res.redirect("/")
    })
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    questionModel.findOne({
        where: { id: id },

    }).then(qst => {
        if (qst != undefined) { //Pergunta encontrada
            answerModel.findAll({
                where: { questid: qst.id },
                order: [
                    ['id', 'DESC'] //ASC = CRESCENTE / DESC = DECRESCENTE
                ]
            }).then(ans => {
                res.render('question', {
                    perg: qst,
                    resp: ans
                })
            })

        } else {
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo
    let idperg = req.body.pergunta

    answerModel.create({
        corpo: corpo,
        questid: idperg
    }).then(() => {
        res.redirect('/pergunta/' + idperg)
    })

})



app.listen(8080, () => {
    console.log('Servidor ligado.')
})