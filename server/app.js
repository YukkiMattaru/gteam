const express = require('express');
const MongoClient = require('mongodb');
const port = 3002;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})


