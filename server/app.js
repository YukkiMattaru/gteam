const express = require('express');
const MongoClient = require('mongodb');
const port = 3002;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('secret key'))

MongoClient.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true},(err, database) => {
    if (err) {
        MongoClient.connect(db.url2, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
            if (err) return console.log(err);
            require('./routes/index')(app, database);
            app.listen(port, () => {
                console.log('We are live on ' + port);
            })
        })
    }
    else {
        require('./routes/index')(app, database);
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }
    setInterval(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://yank0vy3rdna.ru/lamps_info/', false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log(xhr.statusText);
        } else {
           console.log(JSON.parse(xhr.responseText));
        }
    }, 100000000)
})


