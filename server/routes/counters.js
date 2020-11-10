let toISOString = require('mongodb').ObjectID.toISOString;

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
                }
                else {
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
        const myDB = db.db('depression');
        myDB.collection('counters').findOne({_id: req.body.serialNumber})
            .then(result => {
                if (result) {
                    res.send('Такой счетчик уже есть')
                } else {

                    if (req.body.serialNumber && req.body.userID) {
                        const counter = {
                            _id: req.body.serialNumber,
                            userID: Number(req.body.userID),
                            active: 1
                        };
                        myDB.collection('counters').insertOne(counter)
                            .then(result => {
                                res.send(result.ops[0])
                            })
                            .catch(error => {
                                res.send({
                                    'resultCode': -1,
                                    'message': error
                                })
                            })
                    } else {
                        res.send({
                            'resultCode': '-1',
                            'message': 'Переданы пустые значения'
                        })
                    }

                }
            })
            .catch(error => res.send(error))
    })
    app.delete('/counters', (req, res) => {
        db.db('depression').collection('counters').updateOne({_id: req.body.serialNumber, userID: req.body.userID},
            {
                $set: {active: 0}
            })
            .then(result => {
                res.send('all done')
            })
            .catch(error => {
                res.send('all not done');
            })
    })
    app.put('/counters', (req, res) => {
            const myDB = db.db('depression');
            myDB.collection('counters').findOne({_id: req.body.serialNumber})
                .then(result => {
                    console.log(result)
                    if (result) {
                        if (req.body.serialNumber && req.body.userID) {
                            console.log(req.body)
                            db.db('depression').collection('counters').updateOne({
                                    _id: req.body.serialNumber,
                                    userID: +req.body.userID
                                },
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
                        }
                    } else {
                        res.send({
                            'resultCode': '-1',
                            'message': 'Нет счетчика'
                        })
                    }
                })
                .catch(error => res.send(error))
        }
    )
}
;