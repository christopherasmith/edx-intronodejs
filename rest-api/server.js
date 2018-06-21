const express = require('express');
const bodyparser = require('body-parser');
const errorhandler = require('errorhandler');
const logger = require('morgan');

const app = express();
app.use(bodyparser.json());
app.use(errorhandler());
app.use(logger('dev'));

let store = {};
store.accounts = [];

app.get('/accounts', (request, response) => 
{
    response.status(200).send(store.accounts);   
});

app.post('/accounts', (request, response) => 
{
    let newAccount = request.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);
    response.status(201).send({id: id});
});

app.put('/accounts/:id', (request, response) => 
{
    store.accounts[request.params.id] = request.body;
    response.status(200).send(store.accounts[request.params.id]);
});

app.delete('/accounts/:id', (request, response) => 
{
    store.accounts.splice(request.params.id, 1);
    response.status(204).send();
});

app.listen(3000);





