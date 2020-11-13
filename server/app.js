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

MongoClient.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
    if (err) {
        MongoClient.connect(db.url2, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
                if (err) return console.log(err);
                require('./routes/index')(app, database);
                app.listen(port, () => {
                    console.log('We are live on ' + port);
                })
                let CronJob = require('cron').CronJob;
                let job = new CronJob('* * * * *', function () {
                    let randomEnergyValues = [
                        +(Math.random() * 50).toFixed(2),
                        +(Math.random() * 50).toFixed(2),
                        +(Math.random() * 50).toFixed(2),
                        +(Math.random() * 50).toFixed(2)
                    ]
                    database.db('depression').collection('counters').updateMany({active: 1},
                        {
                            $set: {
                                date: new Date().toISOString(),
                            },
                            $inc: {
                                "value.1.energy.t1": +randomEnergyValues[0],
                                "value.1.energy.t2": +randomEnergyValues[1],
                                "value.1.energy.t3": +randomEnergyValues[2],
                                "value.1.energy.t4": +randomEnergyValues[3]
                            }
                        }
                    )
                }, null, true, 'Europe/Moscow');
                job.start();
            }
        )
    } else {
        require('./routes/index')(app, database);
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }

    /*setInterval(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://yank0vy3rdna.ru/lamps_info/', false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log(xhr.statusText);
        } else {
           console.log(JSON.parse(xhr.responseText));
        }
    }, 100000000)*/
})


