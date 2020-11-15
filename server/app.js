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

            const databaseCounters = database.db('depression').collection('counters');
            const databaseUsers = database.db('depression').collection('users');
            const databaseCertificates = database.db('depression').collection('certificates');

            let CronJob = require('cron').CronJob;
            let updateCounters = new CronJob('* * * * * *', function () {
                let randomEnergyValues = [
                    +(Math.random() * 1).toFixed(2),
                    +(Math.random() * 1).toFixed(2),
                    +(Math.random() * 1).toFixed(2),
                    +(Math.random() * 1).toFixed(2)
                ]
                databaseCounters.updateMany({active: 1},
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
            updateCounters.start();
            let updateCertificates = new CronJob('* * * * * *', async function () {
                databaseCounters.find({}).toArray()
                    .then(result => {
                        result.map(counter => {
                            databaseCounters.updateOne({_id: counter._id},
                                {
                                    $set: {
                                        totalValue: counter.value[1].energy.t1 + counter.value[1].energy.t2 + counter.value[1].energy.t3 + counter.value[1].energy.t4
                                            - counter.value[0].energy.t1 - counter.value[0].energy.t2 - counter.value[0].energy.t3 - counter.value[0].energy.t4
                                    }
                                })
                                .then()
                                .catch()
                        })
                    })
                    .catch()
                databaseUsers.find({}).toArray()
                    .then(result => {
                        result.map(user => {
                            databaseCounters.find({userID: user._id}).toArray()
                                .then(counters => {
                                    if (counters.length) {
                                        let sum = 0;
                                        for (let i = 0; i < counters.length; i++) {
                                            sum += counters[i].totalValue
                                        }
                                        databaseUsers.updateOne({_id: user._id},
                                            {
                                                $set: {
                                                    totalCounters: sum
                                                }
                                            })
                                    } else {
                                        databaseUsers.updateOne({_id: user._id},
                                            {
                                                $set: {
                                                    totalCounters: +0
                                                }
                                            })
                                    }
                                })
                        })
                    })
                databaseUsers.find({}).toArray()
                    .then(users => {
                        users.map(user => {
                            let toReceive = Math.floor(user.totalCounters / 1000) - user.receivedCertificates;
                            if (toReceive > 0) {
                                databaseCertificates.find().sort({_id: -1}).limit(1).toArray().then(result => {
                                    let date = new Date().toISOString()
                                    let newCertificate = {
                                        _id: result.length ? result[0]._id + 1 : 1,
                                        dateFrom: date,
                                        active: 1,
                                        toSell: 0,
                                        users: [{
                                            userID: user._id,
                                            date: date
                                        }]
                                    }
                                    console.log(`Create certificate ${result.length ? result[0]._id + 1 : 1} for ${user._id}`)
                                    databaseCertificates.insertOne(newCertificate)
                                        .then()
                                        .catch()
                                    databaseUsers.updateOne({_id: user._id}, {
                                        $inc: {
                                            receivedCertificates: 1
                                        }
                                    })
                                })
                            }

                        })
                    })
            })
            updateCertificates.start()
        })
    } else {
        require('./routes/index')(app, database);
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }
})



