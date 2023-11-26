const express = require('express')
const port = 3000
const app = express()
const banco = require('./database/bd').conexao
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
            [req.body.nome, req.body.idade, req.body.senha],
            
            (err, resultado) => {
                cnx.release()

                if(err){res.send({erro: err})}

                const response ={
                    msg: 'Usuario cadastro com sucesso!',
                    usuario: req.body.nome
                }

                res.send(response)
            }
        )
    })
})

app.delete('/remover', (req, res) => {
    banco.getConnection((erro, cnx) => {
        if(erro){res.send.status(500)({error: erro})}

        cnx.query(
            'Delete from pessoa where = ?',
            [req.body.name],

            (err, resultado) => {
                cnx.release()

                if(err){res.send({msg: 'Não deletou', error: err})}

                const response = {
                    msg: "Usuario deletado com sucesso!",
                    usuario: req.body.name
                }

                res.send(response)
            }
        )
    })
})

app.listen(port, console.log('Server rodando'))