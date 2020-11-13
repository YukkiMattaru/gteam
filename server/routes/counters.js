let toISOString = require('mongodb').ObjectID.toISOString;
global.fetch = require("node-fetch");

module.exports = function (app, db) {
    const databaseCounters = db.db('depression').collection('counters');
    const databaseUsers = db.db('depression').collection('users');

    app.get('/counters', (req, res) => {
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(user => {
                if (user) {
                    databaseCounters.find({userID: user._id}).toArray()
                        .then(counters => {
                            if (counters.length) {
                                res.send({
                                    "resultCode": 0,
                                    "body": {
                                        counters
                                    }
                                })
                            } else {
                                res.send({
                                    "resultCode": -1,
                                    "body": {
                                        "message": "У пользователя нет счетчиков"
                                    }
                                })
                            }
                        })
                        .catch(error => {
                            res.send({
                                "resultCode": -2,
                                "body": {
                                    "message": error || "Unexpected error"
                                }
                            })
                        })
                } else {
                    res.send({
                        "resultCode": -4,
                        "body": {
                            "message": "Такого пользователя не существует или сессия недействительна"
                        }
                    })
                }
            })
            .catch(error => {
                res.send({
                    "resultCode": -3,
                    "body": {
                        "message": error || "Unexpected error"
                    }
                })
            })
    })
    app.get('/allcounters', (req, res) => {
        databaseCounters.find({}).toArray().then(rest => res.send(rest))
    })
    /*app.get('/counters', (req, res) => {
        debugger;
        db.db('depression').collection('counters').findOne({_id: req.query.serialNumber.toString()})
            .then(result => {
                if (!result)
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "такого счетчика нет"
                        }
                    })
                else {
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "item": result
                        }
                    })
                }
            })
            .catch(error => {
                res.send({
                    "resultCode": -2,
                    "body": {
                        "message": error ? error : "unexpected error"
                    }
                })
            })

    })*/
    app.post('/counters', (req, res) => {
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(async user => {
                let randomEnergyInitValues = [
                    +(Math.random() * 300).toFixed(2),
                    +(Math.random() * 300).toFixed(2),
                    +(Math.random() * 300).toFixed(2),
                    +(Math.random() * 300).toFixed(2)
                ]
                const counter = {
                    _id: req.body.serialNumber,
                    userID: user._id,
                    active: 1,
                    date: new Date().toISOString(),
                    value: [{
                        energy: {
                            t1: randomEnergyInitValues[0],
                            t2: randomEnergyInitValues[1],
                            t3: randomEnergyInitValues[2],
                            t4: randomEnergyInitValues[3]
                        }
                    },
                        {
                            energy: {
                                t1: randomEnergyInitValues[0],
                                t2: randomEnergyInitValues[1],
                                t3: randomEnergyInitValues[2],
                                t4: randomEnergyInitValues[3]
                            }
                        }
                    ]
                };
                let isCounter = await databaseCounters.findOne({_id: req.body.serialNumber});
                if (isCounter) {
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Такой счетчик уже зарегистрирован"
                        }
                    })
                } else {
                    databaseCounters.insertOne(counter)
                        .then(() => {
                            res.send({
                                "resultCode": 0,
                            })
                        })
                        .catch(error => {
                            res.send({
                                "resultCode": -2,
                                "body": {
                                    "message": error || "Unexpected error from database"
                                }
                            })
                        })
                }
            })
            .catch(error => {
                res.send({
                    "resultCode": -3,
                    "body": {
                        "message": error || "Unexpected error from database"
                    }
                })
            })
    })

    app.delete('/counters/', (req, res) => {
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(user => {
                    if (user) {
                        databaseCounters.updateOne({userID: user._id, _id: req.query.serialNumber},
                            {$set: {active: Number(req.query.code)}})
                            .then(() => {
                                res.send({
                                    "resultCode": 0
                                })
                            })
                            .catch(error => {
                                res.send({
                                    "resultCode": -2,
                                    "body": {
                                        "message": error || "Unexpected error"
                                    }
                                })
                            })
                    } else {
                        res.send({
                            "resultCode": -1,
                            "body": {
                                "message": "Пользователь не найден"
                            }
                        })
                    }
                }
            )
    })

    /*
    * 1. Если у счетчика нет 0 элемента, то обновляем его
    * 2. Если у счетчика есть 0 элемент, то обновляем новый
    */

    /*app.put('/counters', (req, res) => {
        databaseCounters.updateMany({},
            {
                $push: {
                    value: {
                        date: req.body.date,
                        energy: {
                            t1: req.body.t1, t2: req.body.t2, t3: req.body.t3, t4: req.body.t4
                        }
                    }
                }
            })
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.send(error)
            })
    })*/

}
;