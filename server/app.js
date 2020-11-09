const express = require('express');
const MongoClient = require('mongodb');
const port = 3002;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const cookieParser = require('cookie-parser');

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
})


