const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'db4free.net',
    database: 'db_tpw',
    user: 'tpw_turma',
    password: '12345678',
    connectionLimit: 10,
    multipleStatements: true
})

exports.conexao = conexao