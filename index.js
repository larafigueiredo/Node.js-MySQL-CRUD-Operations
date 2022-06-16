const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'geredb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all contatos
app.get('/contatos', (req, res) => {
    mysqlConnection.query('SELECT * FROM contatos', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/contatos/:codigo', (req, res) => {
    mysqlConnection.query('SELECT * FROM contatos WHERE codigo = ?', [req.params.codigo], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/contatos/:codigo', (req, res) => {
    mysqlConnection.query('DELETE FROM contatos WHERE codigo = ?', [req.params.codigo], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/contatos', (req, res) => {
    let emp = req.body;
    var sql = "SET @codigo = ?;SET @nome = ?;SET @email = ?;SET @password = ?; \
    CALL addOrEdit(@codigo,@nome,@email,@password);";
    mysqlConnection.query(sql, [emp.codigo, emp.nome, emp.email, emp.password], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('Inserted employee id : ' + element[0].codigo);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/contatos', (req, res) => {
    let emp = req.body;
    var sql = "SET @codigo = ?;SET @nome = ?;SET @email = ?;SET @password = ?; \
    CALL addOrEdit(@codigo,@nome,@email,@password);";
    mysqlConnection.query(sql, [emp.codigo, emp.nome, emp.email, emp.password], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});