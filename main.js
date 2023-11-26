const express = require('express')
const port = 3000
const app = express()
const banco = require('./database/bd').conexao
const cors = require('cors')

app.use(cors())

app.get('', (req, res) => {
    banco.getConnection((erro, cnx) => {
        if(erro){res.send({erro: erro})}

        cnx.query(
            'Select * from pessoa',
            
            (err, resultado) => {
                cnx.release()

                if(err){res.send({erro: err})}

                let response ={
                    usuarios: resultado
                }

                res.send(response)
            }
        )
    })
})

app.post('/cadastro', (req, res) => {
    banco.getConnection((erro, cnx) => {
        if(erro){res.send({erro: erro})}

        cnx.query(
            'Insert into pessoa(nome, idade, senha) values(?,?,?)',
            [req.query.nome, req.query.idade, req.query.senha],
            
            (err, resultado) => {
                cnx.release()

                if(err){res.send({erro: err})}

                let response ={
                    msg: 'Usuario cadastro com sucesso!',
                    usuario: req.query.nome
                }

                res.send(response)
            }
        )
    })
})

app.listen(port, console.log('Server rodando'))