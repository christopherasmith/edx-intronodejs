const express = require('express');
const app = express();

app.get('/', (request, response) => {response.send({msg: "Hello, Express"})})
app.listen(3000);
