require('./db/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', routes);


const server = app.listen(9000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('vaultdragon app listening at http://%s:%s', host, port);

});

module.exports = app;
